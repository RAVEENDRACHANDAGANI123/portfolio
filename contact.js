// api/contact.js
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Example logic: Simply log the data
    console.log(`Received message from ${name} (${email}): ${message}`);

    // Respond to the client
    return res.status(200).json({ message: 'Form submitted successfully!' });
  }

  // Handle only POST requests
  return res.status(405).json({ message: 'Method not allowed' });
}
