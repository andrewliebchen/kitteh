import faunadb from "faunadb";

const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_KEY,
});
const query = faunadb.query;

console.log(process.env.REACT_APP_FAUNADB_KEY);

export { client, query };
