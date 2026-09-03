// Applies a short public cache window to read-only, publicly-accessible
// endpoints (profile, skills, projects, ...). Content only changes when an
// admin edits it through the dashboard, so a short cache meaningfully cuts
// down repeat requests (browser back/forward, quick re-visits, multiple
// components on the same page) without risking stale content for long.
const cacheControl = (seconds) => (req, res, next) => {
  res.set('Cache-Control', `public, max-age=${seconds}`);
  next();
};

module.exports = cacheControl;