import { client, query } from "../config/db";

const createAnimal = (data) =>
  client
    .query(
      query.Create(query.Collection("animals"), {
        data: data,
      })
    )
    .then((ret) => ret)
    .catch((err) => console.warn(err));

export default createAnimal;
