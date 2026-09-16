const fs = require('fs');
const { parse } = require('csv-parse/sync');

/**
 * Reads a CSV file and returns an array of row objects (keyed by header).
 * @param {string} filePath absolute path to the .csv file
 * @returns {Record<string, string>[]}
 */
function readCsv(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
}

module.exports = { readCsv };
