import { MongoClient } from 'mongodb';

export async function getAllDocuments(db, collection, sort, filter = {}) {
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
}

export async function connectDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://akshay:5YSpktUBga1dMRyM@cluster0.tba6k.mongodb.net/events?retryWrites=true&w=majority'
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);

  return result;
}
