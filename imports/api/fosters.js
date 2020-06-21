import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Fosters = new Mongo.Collection("fosters");

Meteor.methods({
  "fosters.insert"(args) {
    Fosters.insert({
      createdAt: Date.now(),
      ...args
    });
  },

  "fosters.update"(id, args) {
    Fosters.update(id, { $set: { ...args, updatedAt: Date.now() } });
  },

  "fosters.remove"(id) {
    Fosters.remove(id);
  }
});
