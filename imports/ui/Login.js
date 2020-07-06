import { Button, Flex } from "theme-ui";
import { Meteor } from "meteor/meteor";
import React from "react";

const Login = props => (
  <Flex
    sx={{
      width: "100vw",
      height: "100vh",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <Button
      onClick={() =>
        Meteor.loginWithFacebook(
          {
            loginStyle: "popup"
          },
          () => {
            window.location.replace("/");
          }
        )
      }
    >
      Log in with Facebook
    </Button>
  </Flex>
);

export default Login;
