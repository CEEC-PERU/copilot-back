const supabaseService = require('../services/supabaseService');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'unasecretamuysupersecreta';
// Registro
exports.register = async (req, res) => {
  const { email, password, role_id } = req.body;
  try {
    const { data, error } = await supabaseService.registerUser(
      email,
      password,
      role_id
    );
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(201).json({ user: data[0] });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Login

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, error } = await supabaseService.loginUser(email, password);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    // Crea el token con la info que quieras
    const token = jwt.sign(
      { id: user.id, email: user.email, role_id: user.role_id },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
