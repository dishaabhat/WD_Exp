const fs = require('fs');
const async = require('async');
const path = require('path');

// Define the file paths for input and error logs in the current directory
const inputFile = path.join(__dirname, 'file_paths.txt');
const errorLogFile = path.join(__dirname, 'error_log.txt');

// Function to read a file asynchronously
function readFileAsync(filePath, callback) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { filePath, content: data });
    }
  });
}

// Function to log errors to the error log file
function logError(error, filePath) {
  const errorMessage = `[${new Date().toISOString()}] Error reading ${filePath}: ${error.message}\n`;

  fs.appendFile(errorLogFile, errorMessage, (err) => {
    if (err) {
      console.error(`Error logging error to ${errorLogFile}: ${err.message}`);
    }
  });
}

// Read the list of file paths from the input file
fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading ${inputFile}: ${err.message}`);
    return;
  }

  const filePaths = data.split('\n').map((line) => line.trim());

  // Use async.parallel to read files concurrently
  async.parallel(
    filePaths.map((filePath) => (callback) => {
      readFileAsync(filePath, (err, fileData) => {
        if (err) {
          logError(err, filePath);
          callback(null, null);
        } else {
          console.log(`Content of ${fileData.filePath}:\n${fileData.content}\n`);
          callback(null, fileData);
        }
      });
    }),
    (err, results) => {
      if (err) {
        console.error('Error reading files concurrently:', err.message);
      } else {
        console.log('All files have been read successfully.');
      }
    }
  );
});
