export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    
    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    
    // Process the data (e.g., send an email, store in database)
    
    res.status(200).json({ message: 'Message received!' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
