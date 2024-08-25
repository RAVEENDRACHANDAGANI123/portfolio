import { google } from 'googleapis';

// Initialize the Google Sheets API with your API key
const sheets = google.sheets({
  version: 'v4',
  auth: 'AIzaSyAsOYE6zKPE7qaRGwQcZdbFHQQQogY1aK0', // Your API Key
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Extract the name, email, and message from the request body
    const { name, email, message } = req.body;

    // Check for missing fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    // Set up the request to append data to Google Sheets
    const request = {
      spreadsheetId: '164VbM_FV1LBa6fysopTjx7iofd1PqLgBGsg2vkbUgyw', // Your Google Sheet ID
      range: 'Sheet1!A1:C1', // Specify the range to append the data
      valueInputOption: 'RAW',
      resource: {
        values: [[name, email, message]], // The data to append
      },
    };

    try {
      // Append data to the Google Sheets
      await sheets.spreadsheets.values.append(request);
      return res.status(200).json({ message: 'Message stored!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to store message' });
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({ error: 'Method not allowed' });
  }
}
