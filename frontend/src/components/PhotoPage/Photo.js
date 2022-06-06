import { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import "./photo.css";
import { editPhoto, findPhoto } from '../../store/photos';
import { IoIosArrowRoundBack } from "react-icons/io"
import { addUser } from '../../store/users';
import AddToAlbumButton from '../Album/AddToAlbumButton';
import { getAlbum } from '../../store/albums';
import styled from 'styled-components';
import { removePhoto } from '../../store/photos'

const DeleteImgBtn = styled.button`
    position: absolute;
    right: 2rem;
    top: 7rem;
    margin-left: 15px;
    border: none;
    padding: 8px;
    border-radius: 5px;
    background-color: #128fdc;
    color: white;
    font-weight: bold;
    cursor: pointer;
    height: 2rem;
`;

const EditImgBtn = styled.button`
    position: absolute;
    right: 2.5rem;
    top: 4rem;
    margin-left: 15px;
    border: none;
    padding: 8px;
    border-radius: 5px;
    background-color: #128fdc;
    color: white;
    font-weight: bold;
    cursor: pointer;
    height: 2rem;
`;

const SaveButton = styled.button`
    border-radius: 5px;
    background-color: #128fdc;
    color: white;
    font-weight: bold;
    cursor: pointer;
`;

export default function PhotoPage() {
    const { id } = useParams();
    const photo = useSelector(state => state.photos[id])
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const user = useSelector(state => photo && state.users[photo.userId])
    const albums = useSelector(state => photo && state.albums[photo.albumId])
    const history = useHistory();
    const [description, setDescription] = useState(photo?.description || '')
    const [edit, setEdit] = useState(false)

    const onSave = (e) => {
        e.preventDefault();
        dispatch(editPhoto({id, description}));
        setEdit(!edit)
    }

    const onDelete = () => {
        dispatch(removePhoto(id))
        history.push('/photostream')
    }

    useEffect(() => {
        if (photo) return;
        dispatch(findPhoto(id))
    }, [id, photo, dispatch])

    useEffect(() => {
        if (user || !photo) return;
        dispatch(addUser(photo.userId))
    }, [photo])

    useEffect(() => {
        if (!photo?.albumId || albums) return;
        dispatch(getAlbum(photo.albumId))
    }, [photo, albums])

    return (
        <div>
            <div className='big-black-bg'>
                <Link className='link-to-stream' to="/photostream">
                    <IoIosArrowRoundBack size={"2rem"} />
                    Back to Photostream
                </Link>
                <div className='image-container'>
                    <img src={photo?.picSrc}></img>
                    {sessionUser?.id === photo?.userId && (
                        <>
                            <DeleteImgBtn onClick={onDelete}>Delete</DeleteImgBtn>
                            <EditImgBtn onClick={() => setEdit(!edit)}>Edit</EditImgBtn>
                        </>
                    )}
                </div>
            </div>
            <div className='photo-details'>
                <div className='profile-img'></div>
                <div className='flex-col justify-center'>
                    <div className='details full-name'>
                        <p>{user?.fullName}</p>
                    </div>
                    <div className='details'>
                        {edit ? (<form onSubmit={onSave}>
                            <label>Description</label>
                            <input value={description} onChange={(e) => setDescription(e.target.value)}></input>
                            <SaveButton type='submit'>Save</SaveButton>
                        </form>) :
                            <p>{photo?.description}</p>}
                    </div>
                    {albums && <p>{albums?.title}</p>}
                    <AddToAlbumButton photoId={id} />
                </div>
            </div>
        </div>
    )
}
