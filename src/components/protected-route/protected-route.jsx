import { Route, Redirect } from 'react-router-dom';

export function ProtectedRoute({ children, ...rest }) {

    let accessToken = localStorage.getItem('access');

    return (
        <Route
          {...rest}
          render={({ location }) => accessToken ? (
              children
            ) : (
                <Redirect
                to={{
                  pathname: '/login',
                  state: { from: location }
                }}
              />
            )
          }
        />
      );
}

