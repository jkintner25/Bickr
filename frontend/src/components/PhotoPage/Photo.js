import { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import "./photo.css";
import { findPhoto } from '../../store/photos';
import { IoIosArrowRoundBack } from "react-icons/io"
import { addUser } from '../../store/users';
import AddToAlbumButton from '../Album/AddToAlbumButton';
import { getAlbum } from '../../store/albums';

export default function PhotoPage() {
    const { id } = useParams();
    const photo = useSelector(state => state.photos[id])
    const dispatch = useDispatch();
    const user = useSelector(state => photo && state.users[photo.userId])
    const album = useSelector(state => photo && state.albums[photo.albumId])

    useEffect(() => {
        if (photo) return;
        dispatch(findPhoto(id))
    }, [id, photo, dispatch])

    useEffect(() => {
        if (user || !photo) return;
        dispatch(addUser(photo.userId))
    }, [photo])

    useEffect(() => {
        if (!photo?.albumId || album) return;
        dispatch(getAlbum(photo.albumId))

    }, [photo, album])

    if (!photo || !user) return null;

    return (
        <div>
            <div className='big-black-bg'>
                <Link className='link-to-stream' to="/photostream">
                    <IoIosArrowRoundBack size={"2rem"} />
                    Back to Photostream
                </Link>
                <div className='image-container'>
                    <img src={photo.picSrc}></img>
                </div>
            </div>
            <div className='photo-details'>
                <div className='profile-img'></div>
                <div className='flex-col justify-center'>
                    <div className='details full-name'>
                        <p>{user.fullName}</p>
                    </div>
                    <div className='details'>
                        <p>{photo.description}</p>
                    </div>
                    {album && <p>{album.title}</p>}
                    <AddToAlbumButton photoId={id} />
                </div>
            </div>
        </div>
    )
}
