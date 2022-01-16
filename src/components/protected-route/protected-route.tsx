import { Route, Redirect } from "react-router-dom";
import { FunctionComponent } from 'react';

export const ProtectedRoute: FunctionComponent  = ({ children, ...rest }) => {
  let accessToken: string | null = localStorage.getItem("access");

  return (
    <Route
      {...rest}
      render={({ location }) =>
        accessToken ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
