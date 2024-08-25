import { google } from 'googleapis';

const sheets = google.sheets({
  version: 'v4',
  auth: 'lucky-display-365819', 
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const request = {
      spreadsheetId: '164VbM_FV1LBa6fysopTjx7iofd1PqLgBGsg2vkbUgyw', 
      range: 'Sheet1!A1:C1',
      valueInputOption: 'RAW',
      resource: {
        values: [[name, email, message]],
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

