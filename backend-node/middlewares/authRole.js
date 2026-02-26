const requireAdmin = (req, res, next) => {
  const role = (req.headers['x-user-role'] || '').toString().toLowerCase();
  if (role !== 'administrador') {
    return res.status(403).json({ error: 'Solo un administrador puede gestionar productos.' });
  }
  return next();
};

module.exports = { requireAdmin };