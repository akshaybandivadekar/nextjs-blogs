import { MongoClient } from 'mongodb';
import { getAllDocuments } from '../../../helpers/db-util';

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
    const db = client.db();
    const documents = await getAllDocuments(
      db,
      'comments',
      { _id: -1 },
      { eventId: eventId }
    );

    res.status(200).json({ comments: documents });
  }
  client.close();
}

export default handler;
