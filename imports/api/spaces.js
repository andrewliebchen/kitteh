import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Spaces = new Mongo.Collection("spaces");

Meteor.methods({
  "spaces.insert"() {
    Spaces.insert({
      createdAt: Date.now(),
      ownerId: Meteor.userId()
    });
  },

  "spaces.update"(id, args) {
    Spaces.update(id, { $set: { ...args, updatedAt: Date.now() } });
  }
});
