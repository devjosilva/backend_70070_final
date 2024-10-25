// controllers/authController.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.redirect('/users/login?error=Login failed!');
  }

  const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  // Generar JWT
  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, config.jwtSecret, { expiresIn: config.jwtExpiration });

  // Configurar cookie con el token
  res.cookie('currentUser', token, { 
    httpOnly: true, 
    signed: true,
    secure: config.environment === 'production' // En producción, se envía solo en HTTPS 
    });
  res.redirect('/users/current');
};

export const logoutUser = (req, res) => {
  res.clearCookie('currentUser');
  res.redirect('/users/login');
};
