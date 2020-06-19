import React from "react";
import { Avatar, Image, Flex, Button, Box } from "theme-ui";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

const Account = props => (
  <Box>
    {props.user && (
      <Flex sx={{ alignItems: "center" }}>
        <Avatar
          src={props.user.services.facebook.picture.data.url}
          sx={{ height: 24, width: 24 }}
        />
      </Flex>
    )}
  </Box>
);

Account.propTypes = {
  user: PropTypes.object
};

export default withTracker(props => {
  return {
    user: Meteor.users.findOne({ _id: Meteor.userId() })
  };
})(Account);
