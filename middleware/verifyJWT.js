const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const cookies = req.cookies;
  const authHeader = req.headers.authorization || req.headers.Authorization;

  let token 

  if(authHeader?.startsWith('Bearer ')){
    token = authHeader.split(' ')[1];
  }
  else if( cookies?.token ) {
    token = cookies.token
  }
  else {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });
      req.user = decoded.UserInfo.username;
      req.roles = decoded.UserInfo.roles;
      next();
    }
  )
}

module.exports = verifyJWT;
