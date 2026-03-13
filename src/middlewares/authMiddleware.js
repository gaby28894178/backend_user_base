import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'mi_secreto_super_pro';

// Middleware de protección interno
const verifyJwt = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: "Token faltante" });
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido" });
  }
};

export default verifyJwt;