import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Spaces = new Mongo.Collection("spaces");

Meteor.methods({
  "spaces.insert"(args) {
    return Spaces.insert({
      createdAt: Date.now(),
      ownerId: Meteor.userId(),
      ...args
    });
  },

  "spaces.update"(id, args) {
    return Spaces.update(id, { $set: { ...args, updatedAt: Date.now() } });
  }
});
