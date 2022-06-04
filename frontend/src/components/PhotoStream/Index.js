import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPhotos } from "../../store/photos";
import "./index.css";
import { Link } from "react-router-dom";

export default function PhotoStream() {
    const dispatch = useDispatch();
    const allPhotos = useSelector(state => {
        return state.photos
    })
    const userId = useSelector((state) => state.session.user.id)

    useEffect(() => {
        dispatch(loadPhotos())
    }, [])

    return (
        <div className="photostream-container">
            <h2>PhotoStream</h2>
            <div className="img-container">
                {Object.values(allPhotos).map(photo => {
                    return (
                        <Link key={photo.id} to={`/photos/${photo.id}`}>
                            <img className="photostream-img" src={photo.picSrc}></img>
                            {/* {photo.userId === userId && <button>Delete</button>} */}
                        </Link>
                    )
                })}
            </div>
        </div>
    )
};
