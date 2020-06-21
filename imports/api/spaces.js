import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Spaces = new Mongo.Collection("spaces");

Meteor.methods({
  "spaces.insert"() {
    return Spaces.insert({
      createdAt: Date.now(),
      ownerId: Meteor.userId()
    });
  },

  "spaces.update"(id, args) {
    return Spaces.update(id, { $set: { ...args, updatedAt: Date.now() } });
  }
});
