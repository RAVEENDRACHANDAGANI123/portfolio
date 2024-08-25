import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  '914159560192-oe8ofrq4tqpjc9epdsrjvv03rrg31vvq.apps.googleusercontent.com', // Your client ID
  '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', // Your client secret
  'https://portfolio-ckpr9pbzy-raveendra-chandaganis-projects.vercel.app' // Your redirect URI
);

// Set the tokens
oauth2Client.setCredentials({
  access_token: '4/0AQlEd8xu_l_dITNbojodUuz5fb4oQRJtY35KjqEy6ly0JvrHuzhGTQiEucnafjRgK-looA', // Your access token
  refresh_token: '1//0gHQYIYXDHfYhCgYIARAAGBASNwF-L9Ir6Xm4gOxSeh7_h5qKUFpCOB20gzuCWWXuhT7bz0mJhAxP-aEoLFJBBb-aJ2K-8a5stOQ' // Your refresh token
});

const sheets = google.sheets({
  version: 'v4',
  auth: oauth2Client
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    // Capture the current date and time
    const timestamp = new Date().toLocaleString(); 

    const request = {
      spreadsheetId: '164VbM_FV1LBa6fysopTjx7iofd1PqLgBGsg2vkbUgyw', // Your spreadsheet ID
      range: 'Sheet1!A1:D1',
      valueInputOption: 'RAW',
      resource: {
        values: [[name, email, message, timestamp]],
      },
    };

    try {
      await sheets.spreadsheets.values.append(request);
      return res.status(200).json({ message: 'Message stored!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to store message' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
