import React from "react";
import { Route, useNavigate } from "react-router-dom";

export default function AuthRoute({
  authenticated,
  component: Component,
  render,
  ...rest
}) {
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          render ? (
            render(props)
          ) : (
            <Component {...props} />
          )
        ) : (
          navigate("/Login", { state: { from: props.location.pathname } })
        )
      }
    />
  );
}
