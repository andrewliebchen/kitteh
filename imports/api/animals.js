import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Animals = new Mongo.Collection("animals");

// type: "cat",
// lifestage: "adult",
// name: "Petunia"

Meteor.methods({
  "animals.insert"(args) {
    return Animals.insert({
      createdAt: Date.now(),
      ...args
    });
  },

  "animals.update"(id, args) {
    return Animals.update(id, { $set: { ...args, updatedAt: Date.now() } });
  },

  "animals.remove"(id) {
    return Animals.remove(id);
  },

  "animals.addWeight"(id, weight) {
    return Animals.update(id, {
      $push: { weight: { value: weight, createdAt: Date.now() } }
    });
  }
});
