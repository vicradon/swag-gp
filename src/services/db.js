/* eslint-disable no-console */
const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({ secret: process.env.REACT_APP_FAUNA_SECRET });

// Querying a doc by email
exports.getDoc = async (email) => {
  const docRef = await client.query(q.Paginate(q.Match(q.Index('gpa'), email)));
  let docId;
  if (docRef.data[0]) {
    docId = docRef.data[0].value.id;
  } else {
    return {};
  }
  const doc = await client.query(q.Get(q.Ref(q.Collection('gpa'), docId)));
  return doc.data;
};

exports.createDoc = async (userObj) => {
  const doc = await client.query(q.Create(q.Collection('gpa'), {data: userObj}));
  return doc;
};

exports.createCollection = async (email) => {
  const collection = await client.query(q.CreateCollection({ name: email }));
  return collection;
};

exports.getCollection = async (email) => {
  const collection = await client.query(q.Get(q.Collection(email)));
  return collection;
};

// 269115452603499008
// // Creating a doc with Specific index
// client
//   .query(q.Create(q.Ref(q.Collection('posts'), '1'), { data: { title: 'The first post' } }))
//   .then((ret) => console.log('success'))
//   .catch(console.error);

// Creating a doc
// client
//   .query(q.Create(q.Collection('posts'), { data: { title: 'What I had for breakfast ..' } }))
//   .then((ret) => console.log('success'))
//   .catch(console.error);

// // Creating a collection
// client
//   .query(q.CreateCollection({ name: 'posts' }))
//   .then((ret) => console.log('success'))
//   .catch(console.error);

// // updating a particular doc
// client.query(q.Update(q.Ref(q.Collection('posts'), '269115556078027264'), { data: { tags: ['pet', 'cute'] } }));

// // replace a document
// client
//   .query(q.Replace(q.Ref(q.Collection('posts'), '269115556078027264'), { data: { title: 'My dog and other marvels' } }))
//   .then((ret) => console.log('success'))
//   .catch(console.error);

// // delete a document from collection
// client
//   .query(q.Delete(q.Ref(q.Collection('posts'), '269115556078027264')))
//   .then((ret) => console.log('success'))
//   .catch(console.error);
