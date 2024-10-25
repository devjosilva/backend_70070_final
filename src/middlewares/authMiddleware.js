// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

export const authMiddleware  = (req, res, next) => {
  const token = req.signedCookies.currentUser;
  if (!token) {
    return res.status(401).redirect('/users/login');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send('Forbidden');
    }
    req.user = user;
    next();
  });
};
