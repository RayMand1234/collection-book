// airtable.js
require('dotenv').config(); // Load environment variables

const Airtable = require('airtable');

// Initialize Airtable client
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

module.exports = base;