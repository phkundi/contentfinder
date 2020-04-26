import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuthState from "../../hooks/useAuthState";
import Layout from "../layout/Layout";

function PrivateRoute({ component: Component, ...rest }) {
  const { auth } = useAuthState();
  return (
    <Route
      render={(props) => {
        if (auth.isLoading) {
          return <h2>Loading ...</h2>;
        } else if (!auth.isAuthenticated) {
          return <Redirect to="/login" />;
        } else {
          return (
            <Layout {...rest} {...props}>
              <Component auth={auth} />
            </Layout>
          );
        }
      }}
    />
  );
}

export default PrivateRoute;
