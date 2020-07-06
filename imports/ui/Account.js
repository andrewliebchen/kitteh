import { Avatar, Box } from "theme-ui";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import React from "react";

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
