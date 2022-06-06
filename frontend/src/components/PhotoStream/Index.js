import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPhotos } from "../../store/photos";
import "./index.css";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BlackBg = styled.div`
    position: absolute;
    background-color: #212124;
    height: 100%;
`;

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
        <BlackBg>
            <div className="photostream-container">
                <h2>PhotoStream</h2>
                <div className="img-container">
                    {Object.values(allPhotos).map(photo => {
                        return (
                            <Link key={photo.id} to={`/photos/${photo.id}`}>
                                <img className="photostream-img" src={photo.picSrc}></img>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </BlackBg>
    )
};
