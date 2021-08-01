import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "./components/auth/UserContext";
import "./css/App.css";

import LandingPage from "./pages/LandingPage";
import Dropdown from "./components/pages/Dropdown";
import Payment from "./pages/Payment";
import EditProfile from "./pages/EditProfile";
import ListTransact from "./pages/ListTransact";
import AddMusic from "./pages/AddMusic";
import AddArtist from "./pages/AddArtist";
import NotFound from "./pages/NotFound";
import { API, setAuthToken } from "./Config/API";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(UserContext);
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.data.status === "failed") {
        return dispatch({
          type: "LOGOUT",
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [remaining, setRemaining] = useState();

  useEffect(() => {
    console.log("switch");
    if (state.isLogin == true) {
      if (state.user.role != "admin") {
        const data = state.user.transaction[0];
        if (data) {
          var days = 0;
          var difference = 0;

          const start = new Date(data.startDate);

          const due = new Date(data.dueDate);

          difference = due - start;

          days = Math.round(difference / (1000 * 60 * 60 * 24));

          setRemaining(days);
        }
      }
    }
  }, [state.isLogin]);

  useEffect(() => {
    checkUser();
  }, [state.isLogin]);

  return (
    <>
      <Router>
        <Switch>
          {state.isLogin ? (
            <>
              {state.user.role == "admin" ? (
                <>
                  <Route exact path="/">
                    <ListTransact />
                  </Route>

                  <Route exact path="/add-music">
                    <AddMusic />
                  </Route>

                  <Route exact path="/add-artist">
                    <AddArtist />
                  </Route>
                  <Route exact path="/:url">
                    <NotFound role="admin" isLogin={state.isLogin} />
                  </Route>
                </>
              ) : (
                <>
                  <Route exact path="/">
                    <LandingPage
                      remaining={remaining}
                      isLogin={state.isLogin}
                    />
                  </Route>
                  <Route exact path="/payment">
                    <Payment />
                  </Route>
                  <Route exact path="/edit-profile">
                    <EditProfile />
                  </Route>
                  <Route exact path="/:url">
                    <NotFound role="user" isLogin={state.isLogin} />
                  </Route>
                </>
              )}
            </>
          ) : (
            <>
              <Route exact path="/">
                <LandingPage isLogin={state.isLogin} />
              </Route>

              <Route exact path="/:url">
                <NotFound isLogin={state.isLogin} />
              </Route>
            </>
          )}
        </Switch>
      </Router>
    </>
  );
}

export default App;
