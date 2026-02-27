const ADMIN_ROLES = new Set(['administrador', 'admin']);

const requireAdmin = (req, res, next) => {
  const role = (req.headers['x-user-role'] || '').toString().trim().toLowerCase();

  if (!ADMIN_ROLES.has(role)) {
    return res.status(403).json({ error: 'Solo un administrador puede gestionar productos.' });
  }

  return next();
};
module.exports = { requireAdmin };