import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from './components/Home'
import EachEvent from "./components/Events/EachEvent";
import CreateForm from "./components/CreateEventForm/CreateForm";
import MyRequests from "./components/MyRequests/MyRequests";
import MyEvents from "./components/Events/MyEvents";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path="/events/new">
            <CreateForm />
          </Route>

          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/events/:eventId">
            <EachEvent />
          </Route>
          <Route path='/myrequests'>
            <MyRequests />
          </Route>
          <Route path='/myevents'>
            <MyEvents />
          </Route>



        </Switch>
      )}
    </>
  );
}

export default App;
