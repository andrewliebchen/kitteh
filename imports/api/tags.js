import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Tags = new Mongo.Collection("tags");

Meteor.methods({
  "tags.insert"(args) {
    return Tags.insert({
      createdAt: Date.now(),
      ...args
    });
  },

  "tags.update"(id, args) {
    return Tags.update(id, { $set: { ...args, updatedAt: Date.now() } });
  }
});
