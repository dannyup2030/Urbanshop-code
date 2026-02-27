const requireAdmin = (req, res, next) => {

 minRoles = new Set(['administrador', 'admin']);

  if (!adminRoles.has(role)) {
    return res.status(403).json({ error: 'Solo un administrador puede gestionar productos.' });
  }

  return next();
};
module.exports = { requireAdmin };