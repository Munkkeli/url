const url = require('url');
const MatomoTracker = require('matomo-tracker');

const matomo = new MatomoTracker(
  process.env.MATOMO_SITE_ID,
  process.env.MATOMO_SITE_URL
);

matomo.on('error', (error) => {
  console.log('Matomo error', err);
});

const combineRequestURL = (req) =>
  url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl,
  });

const trackUrlCreate = (req, url) => {
  matomo.track({
    url: combineRequestURL(req),
    link: url,
    action_name: 'Minify URL',
    // TODO: uid:
  });
};

const trackUrlVisit = (req, url, hash) => {
  matomo.track({
    url: combineRequestURL(req),
    link: url,
    action_name: 'Visit minified URL',
    // TODO: uid:
    cvar: JSON.stringify({
      '1': ['hash', hash],
    }),
  });
};

module.exports = {
  trackUrlCreate,
  trackUrlVisit,
};
