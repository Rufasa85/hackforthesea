const coasstRoutes = require('./coasst_routes');

module.exports = function(app, db) {
    coasstRoutes(app, db);
};
