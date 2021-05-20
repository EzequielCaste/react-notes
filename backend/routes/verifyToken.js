const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  //const token = req.session.authToken;
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(400).json({
      ok: false,
      msg: 'Acceso Denegado',
    });
  }

  try {
    // console.log(token);
    const verified = jwt.verify(token, process.env.REACT_APP_SECRET);
    if (verified) {
      // res.json({ok: true, verified});
      next();
    } else {
      res.status(400).json({ok: false, msg: 'Token NO valido'});
    }
    /*
,
      (error, decoded) => {
        if (error) {
          res.json({ok: false, msg: error});
        } else {
          req.userId = decoded.id;
          next();
        }
      }
    */
    // req.user = verified;
    // next();
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: error,
    });
  }
};
