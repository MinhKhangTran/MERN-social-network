import * as React from "react";
import { Route, Switch, Redirect, RouteProps } from "react-router-dom";

// Layout
import Layout from "./components/Layout";

// pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProfileEdit from "./pages/ProfileEdit";
import Profiles from "./pages/Profiles";
import SingleProfile from "./pages/SingleProfile";
import CreateEdu from "./pages/CreateEdu";
import CreateExp from "./pages/CreateExp";
import Dashboard from "./pages/Dashboard";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "./store";

// interface for route
interface IRoute {
  path: string;
  exact: boolean;
  component: any;
  private: boolean;
}

const routes: IRoute[] = [
  {
    path: "/",
    exact: true,
    component: Login,
    private: false
  },
  {
    path: "/register",
    exact: false,
    component: Register,
    private: false
  },
  {
    path: "/home",
    exact: false,
    component: Home,
    private: true
  },
  {
    path: "/profileedit",
    exact: false,
    component: ProfileEdit,
    private: true
  },
  {
    path: "/profiles",
    exact: true,
    component: Profiles,
    private: true
  },
  {
    path: "/profiles/:id",
    exact: false,
    component: SingleProfile,
    private: true
  },
  {
    path: "/createEdu",
    exact: false,
    component: CreateEdu,
    private: true
  },
  {
    path: "/createExp",
    exact: false,
    component: CreateExp,
    private: true
  },
  {
    path: "/dashboard",
    exact: false,
    component: Dashboard,
    private: true
  }
];

const PrivateRoute = (props: RouteProps) => {
  const {
    userInfo: { _id }
  } = useSelector((state: RootState) => state.login);
  const { children, ...rest } = props;
  return (
    <Route
      {...rest}
      render={() => {
        return _id.length !== 0 ? children : <Redirect to="/"></Redirect>;
      }}
    ></Route>
  );
};

const App = () => {
  return (
    <Layout>
      <Switch>
        {routes.map((route, index) => {
          const RouteType = route.private ? PrivateRoute : Route;
          return (
            <RouteType exact={route.exact} path={route.path} key={index}>
              <route.component />
            </RouteType>
          );
        })}
      </Switch>
    </Layout>
  );
};
export default App;
