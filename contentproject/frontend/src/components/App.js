import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import ContentDetail from "./usercontent/ContentDetail";
import ContentList from "./usercontent/ContentList";
import ShareContentForm from "./usercontent/contentForm/ShareContentForm";
import PrivateRoute from "./common/PrivateRoute";
import PageNotFound from "./common/PageNotFound.js";
import UserProfile from "./accounts/ownerProfile/UserProfile";
import EditPost from "./accounts/ownerProfile/EditPost";
import LikedPosts from "./accounts/ownerProfile/LikedPosts";

function App() {
  // Listen for window close and remove login token if specified otherwise by user
  window.onbeforeunload = () => {
    if (
      window.localStorage.getItem("token") &&
      !window.localStorage.getItem("save-login")
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("isAuthenticated");
    }
  };

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Layout>
            <ContentList query="all" type={null} heading="All Contents" />
          </Layout>
        )}
      />
      {/* Content Routes */}
      <Route
        exact
        path="/blogs"
        render={() => (
          <Layout>
            <ContentList type="Blog" heading="Blogs" />
          </Layout>
        )}
      />
      <Route
        exact
        path="/blogs/:id"
        render={(routeProps) => (
          <Layout goBack="blogs" noMarginTop={true}>
            <ContentDetail id={routeProps.match.params.id} />
          </Layout>
        )}
      />
      <Route
        exact
        path="/podcasts"
        render={() => (
          <Layout>
            <ContentList type="Podcast" heading="Podcasts" />
          </Layout>
        )}
      />
      <Route
        exact
        path="/podcasts/:id"
        render={(routeProps) => (
          <Layout goBack="podcasts" noMarginTop={true}>
            <ContentDetail id={routeProps.match.params.id} />
          </Layout>
        )}
      />
      <Route
        exact
        path="/youtube"
        render={() => (
          <Layout>
            <ContentList type="Youtube" heading="Youtube Channels" />
          </Layout>
        )}
      />
      <Route
        exact
        path="/youtube/:id"
        render={(routeProps) => (
          <Layout goBack="youtube" noMarginTop={true}>
            <ContentDetail id={routeProps.match.params.id} />
          </Layout>
        )}
      />
      {/* Auth Routes */}
      <Route
        exact
        path="/login"
        render={() => (
          <Layout hideHeader={true} noMarginTop={true}>
            <Login />
          </Layout>
        )}
      />
      <Route
        exact
        path="/register"
        render={() => (
          <Layout hideHeader={true} noMarginTop={true}>
            <Register />
          </Layout>
        )}
      />
      {/* Private Routes */}
      <PrivateRoute
        exact
        path="/share"
        component={ShareContentForm}
        hideSearch={true}
        noMarginTop={true}
      />
      <PrivateRoute
        exact
        path="/profile"
        component={UserProfile}
        noMarginTop={true}
      />
      {/* <PrivateRoute
        exact
        path="/edit/:id"
        component={ContentDetail}
        editing={true}
        noMarginTop={true}
      /> */}
      <PrivateRoute exact path="/profile/liked" component={LikedPosts} />
      {/* Catch All Route */}
      <Route
        path="/"
        render={() => (
          <Layout>
            <PageNotFound />
          </Layout>
        )}
      />
    </Switch>
  );
}

export default App;
