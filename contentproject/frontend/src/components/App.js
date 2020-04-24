import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import ListPage from "./usercontent/ListPage";
import BlogList from "./usercontent/blogs/BlogList";
import BlogDetail from "./usercontent/blogs/BlogDetail";
import PodcastList from "./usercontent/podcasts/PodcastList";
import PodcastDetail from "./usercontent/podcasts/PodcastDetail";
import HomePage from "./HomePage";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import YoutubeList from "./usercontent/youtube/YoutubeList";
import YoutubeDetail from "./usercontent/youtube/YoutubeDetail";

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
            <ListPage>
              <BlogList />
            </ListPage>
          </Layout>
        )}
      />
      <Route
        exact
        path="/blogs/:id"
        render={(routeProps) => (
          <Layout>
            <BlogDetail id={routeProps.match.params.id} />
          </Layout>
        )}
      />
      <Route
        exact
        path="/podcasts"
        render={() => (
          <Layout>
            <ListPage>
              <PodcastList />
            </ListPage>
          </Layout>
        )}
      />
      <Route
        exact
        path="/podcasts/:id"
        render={(routeProps) => (
          <Layout>
            <PodcastDetail id={routeProps.match.params.id} />
          </Layout>
        )}
      />
      <Route
        exact
        path="/youtube"
        render={() => (
          <Layout>
            <ListPage>
              <YoutubeList />
            </ListPage>
          </Layout>
        )}
      />
      <Route
        exact
        path="/youtube/:id"
        render={(routeProps) => (
          <Layout>
            <YoutubeDetail id={routeProps.match.params.id} />
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
