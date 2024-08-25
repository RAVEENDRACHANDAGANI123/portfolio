const { google } = require('googleapis');
const readline = require('readline');

// Set up OAuth2 client with client credentials
const oAuth2Client = new google.auth.OAuth2(
  '914159560192-oe8ofrq4tqpjc9epdsrjvv03rrg31vvq.apps.googleusercontent.com',
  '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',
  'https://portfolio-ckpr9pbzy-raveendra-chandaganis-projects.vercel.app'
);

// Generate the auth URL
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/spreadsheets'],
});

console.log('Authorize this app by visiting this URL:', authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter the code from the page here: ', (code) => {
  rl.close();
  oAuth2Client.getToken(code, (err, token) => {
    if (err) return console.error('Error retrieving access token', err);
    console.log('Your refresh token:', token.refresh_token);
  });
});
