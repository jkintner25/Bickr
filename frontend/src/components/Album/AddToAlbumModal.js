import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { getUserAlbums } from "../../store/albums";
import { editPhoto } from "../../store/photos";

const Backdrop = styled.div`
position: absolute;
inset: 0;
z-index: 20;
background-color: rgba(0, 0, 0, .5);
`;

const Modal = styled.div`
display: flex;
flex-direction: column;
align-items: center;
position: relative;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
z-index: 30;
width: 300px;
background-color: white;
border-radius: 8px;
padding: 1rem;
box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

const AlbumRow = styled.div`
font-weight: bold;
border: 1px solid black;
padding: 5px;
margin: 5px 0px;
cursor: pointer;
&:hover{
    border: 2px dotted black;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
};
`;

function AddToAlbumModal({closeModal, photoId}) {
    const {title, setTitle} = useState('')

    const dispatch = useDispatch()

    const userId = useSelector((state)=>state.session.user.id)

    const albums = useSelector((state)=>{
        return Object.values(state.albums).filter((album)=>{
            return album.userId === userId
        })
    })

    const photo = useSelector(state=>state.photos[photoId])

    useEffect( () => {
        dispatch(getUserAlbums(userId))
    },[userId])

    const addToAlbum = (albumId) => {
        const newPhoto = {
            id: photoId,
            albumId,
            userId,
            description: photo.description,
            picSrc: photo.picSrc
        }
        dispatch(editPhoto(newPhoto))
        closeModal();
    }

    return (
        <Backdrop onClick={closeModal}>
            <Modal onClick={(e) => e.stopPropagation()}>
                {albums.map(album=>{
                    return <AlbumRow onClick={()=>addToAlbum(album.id)} key={album.id}>{album.title}</AlbumRow>
                })}
            </Modal>
        </Backdrop>
    )
}

export default AddToAlbumModal;
