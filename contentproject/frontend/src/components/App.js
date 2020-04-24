import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./HomePage";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import ContentDetail from "./usercontent/ContentDetail";
import ContentList from "./usercontent/ContentList";

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Layout>
            <HomePage />
          </Layout>
        )}
      />
      <Route
        exact
        path="/blogs"
        render={() => (
          <Layout>
            <ContentList query="blogs" type="Blog" heading="Blogs" />
          </Layout>
        )}
      />
      <Route
        exact
        path="/blogs/:id"
        render={(routeProps) => (
          <Layout>
            <ContentDetail
              id={routeProps.match.params.id}
              query="blogs"
              type="Blog"
            />
          </Layout>
        )}
      />
      <Route
        exact
        path="/podcasts"
        render={() => (
          <Layout>
            <ContentList query="podcasts" type="Podcast" heading="Podcasts" />
          </Layout>
        )}
      />
      <Route
        exact
        path="/podcasts/:id"
        render={(routeProps) => (
          <Layout>
            <ContentDetail
              id={routeProps.match.params.id}
              query="podcasts"
              type="Podcast"
            />
          </Layout>
        )}
      />
      <Route
        exact
        path="/youtube"
        render={() => (
          <Layout>
            <ContentList
              query="youtube"
              type="Youtube"
              heading="Youtube Channels"
            />
          </Layout>
        )}
      />
      <Route
        exact
        path="/youtube/:id"
        render={(routeProps) => (
          <Layout>
            <ContentDetail
              id={routeProps.match.params.id}
              query="youtube"
              type="Youtube"
            />
          </Layout>
        )}
      />
      <Route
        exact
        path="/login"
        render={() => (
          <Layout centerContentX={true} hideHeader={true}>
            <Login />
          </Layout>
        )}
      />
      <Route
        exact
        path="/register"
        render={() => (
          <Layout centerContentX={true} hideHeader={true}>
            <Register />
          </Layout>
        )}
      />
    </Switch>
  );
}

export default App;
