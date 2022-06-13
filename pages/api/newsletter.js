import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid Email Address.' });
      return;
    }

    const client = await MongoClient.connect(
      'mongodb+srv://akshay:5YSpktUBga1dMRyM@cluster0.tba6k.mongodb.net/newsletter?retryWrites=true&w=majority'
    );

    const db = client.db();

    await db.collection('emails').insertOne({ email: userEmail });

    client.close();

    res.status(201).json({ message: 'Signed up!' });
  }
}

export default handler;
