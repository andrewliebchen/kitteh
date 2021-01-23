import faunadb from "faunadb";

const client = new faunadb.Client({
  secret: process.env.REACT_APP_FAUNADB_KEY,
});
const query = faunadb.query;

export { client, query };
