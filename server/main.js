import "../imports/api/animals";
import "../imports/api/fosters";
import "../imports/api/spaces";
import "../imports/api/tags";
import { Meteor } from "meteor/meteor";

ServiceConfiguration.configurations.upsert(
  { service: "facebook" },
  {
    $set: {
      loginStyle: "popup",
      appId: Meteor.settings.private.facebook.appId,
      secret: Meteor.settings.private.facebook.secret
    }
  }
);
