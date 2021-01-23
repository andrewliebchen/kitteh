import { client, query } from "../config/db";

const updateAnimal = (animalId, data) =>
  client
    .query(
      query.Update(query.Ref(query.Collection("notes"), animalId), {
        data: data,
      })
    )
    .then((ret) => console.log(ret))
    .catch((err) => console.warn(err));

export default updateAnimal;
