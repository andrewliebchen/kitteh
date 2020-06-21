import { Meteor } from "meteor/meteor";
import "../imports/api/animals";
import "../imports/api/spaces";
import "../imports/api/fosters";

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
