const ngrok = require('ngrok');
const { exec } = require('child_process');
require('dotenv').config(); // Load variables from .env

(async function () {
  // Start the Next.js server using exec
  const nextProcess = exec('npx next dev');

  // Listen and print the logs from the Next.js server
  nextProcess.stdout.on('data', (data) => {
    console.log(`Next.js: ${data}`);
  });

  // Listen and print the errors from the Next.js server
  nextProcess.stderr.on('data', (data) => {
    console.error(`Next.js Error: ${data}`);
  });

  // Listen and print the exit code from the Next.js server
  nextProcess.on('close', (code) => {
    console.log(`Next.js process exited with code ${code}`);
  });

  // Get the custom domain and port from the environment variables
  const domain = process.env.NGROK_CUSTOM_DOMAIN;
  const port = process.env.NGROK_PORT || 3000;

  // Start Ngrok with the custom domain, if it exists
  const url = domain
    ? await ngrok.connect({ addr: port, hostname: domain })
    : await ngrok.connect(port);

  console.info(`Ngrok URL: ${url}`);
})();
