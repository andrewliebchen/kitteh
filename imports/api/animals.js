import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Animals = new Mongo.Collection("animals");

// type: "cat",
// lifestage: "adult",
// name: "Petunia"

Meteor.methods({
  "animals.insert"(args) {
    Animals.insert({
      createdAt: Date.now(),
      ...args
    });
  },

  "animals.update"(id, args) {
    Animals.update(id, { $set: { ...args, updatedAt: Date.now() } });
  }
});
