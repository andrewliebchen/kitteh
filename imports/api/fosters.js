import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Fosters = new Mongo.Collection("fosters");

Meteor.methods({
  "fosters.insert"(args) {
    return Fosters.insert({
      createdAt: Date.now(),
      ...args
    });
  },

  "fosters.update"(id, args) {
    return Fosters.update(id, { $set: { ...args, updatedAt: Date.now() } });
  },

  "fosters.remove"(id) {
    return Fosters.remove(id);
  }
});
