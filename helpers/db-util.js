export async function getAllDocuments(db, collection, sort, filter = {}) {
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();
  return documents;
}
