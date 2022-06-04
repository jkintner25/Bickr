import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import NewPhotoFormPage from "./components/UploadNewPhotoPage/upload-photo-form"
import PhotoStream from "./components/PhotoStream/Index";
import PhotoPage from "./components/PhotoPage/Photo";

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
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/photostream">
            <PhotoStream />
          </Route>
          <Route path="/uploadPhoto">
            <NewPhotoFormPage />
          </Route>
          <Route path="/photos/:id">
            <PhotoPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
