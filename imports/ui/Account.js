import React from "react";
import { Avatar, Image, Flex, Button, Box } from "theme-ui";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";

const Account = props => (
  <Box>
    {props.user ? (
      <Avatar
        src={props.user.services.facebook.picture.data.url}
        sx={{ height: 36, width: 36 }}
        onClick={() =>
          Meteor.logout(error => error || window.location.replace("/login"))
        }
      />
    ) : (
      <Link to="/login">Login</Link>
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
