import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import NewPhotoFormPage from "./components/UploadNewPhotoPage/upload-photo-form"
import PhotoStream from "./components/PhotoStream/Index";
import PhotoPage from "./components/PhotoPage/Photo";
import SplashPage from "./components/SplashPage/SplashPage";
import AlbumCatalogue from "./components/Album/AlbumsViewer";
import AlbumForm from "./components/Album/AlbumForm";
import SingleAlbum from "./components/Album/SingleAlbum";
import { getUserAlbums } from "./store/albums";
import { loadPhotos } from "./store/photos";
import DemoLogin from "./components/LoginFormPage/DemoLogin";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const user = useSelector(state=>state.session.user)

  useEffect(() => {
    if (user) dispatch(getUserAlbums(user.id))
  }, [dispatch, user])

  useEffect(() => {
    if (user) dispatch(loadPhotos())
  }, [dispatch, user])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
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
          <Route exact path="/albums">
            <AlbumCatalogue />
          </Route>
          <Route path="/newAlbum">
            <AlbumForm />
          </Route>
          <Route path="/albums/:id">
            <SingleAlbum />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
