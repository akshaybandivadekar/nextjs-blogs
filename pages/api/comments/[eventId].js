import { MongoClient } from 'mongodb';

async function handler(req, res) {
  const eventId = req.query.eventId;

  const client = await MongoClient.connect(
    'mongodb+srv://akshay:5YSpktUBga1dMRyM@cluster0.tba6k.mongodb.net/events?retryWrites=true&w=majority'
  );

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid Input.' });
      return;
    }

    console.log(email, name, text);
    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    const db = client.db();
    const result = await db.collection('comments').insertOne(newComment);
    newComment.id = result.insertedId.toString();

    res.status(201).json({ message: 'Added comment.', comment: newComment });
  } else if (req.method === 'GET') {
    const dummyList = [
      {
        id: 'c1',
        name: 'Akshay',
        text: 'A First comment',
      },
      {
        id: 'c2',
        name: 'Manual',
        text: 'A Second comment',
      },
    ];

    res.status(200).json({ comments: dummyList });
  }
  client.close();
}

export default handler;
