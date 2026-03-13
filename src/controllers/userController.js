import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const SECRET_KEY = process.env.JWT_SECRET || 'mi_secreto_super_pro';

export const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ nombre, email, password: hashedPassword });
    res.status(201).json({ id: user.id, nombre: user.nombre, email: user.email });
  } catch (err) {
    res.status(500).json({ error: "Error al registrar" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Credenciales inválidas" });

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1d' });
    res.json({ token, user: { nombre: user.nombre, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const getAll = async (req, res) => {
  const users = await User.findAll({ attributes: ['id', 'nombre', 'email', 'rol'] });
  res.json(users);
};