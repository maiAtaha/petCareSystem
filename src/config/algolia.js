const algoliasearch = require("algoliasearch");
require("dotenv").config();

const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

module.exports = index;
