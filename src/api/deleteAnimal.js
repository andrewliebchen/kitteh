import { client, query } from "../config/db";

const deleteAnimal = (animalRef) =>
  client
    .query(query.Delete(query.Ref(query.Collection("animals"), animalRef)))
    .then((res) => res)
    .catch((err) => console.warn(err.message));

export default deleteAnimal;
