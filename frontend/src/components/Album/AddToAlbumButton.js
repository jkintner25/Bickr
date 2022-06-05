import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../../Styles/Button";
import AddToAlbumModal from "./AddToAlbumModal";

const CreateAlbum = styled.button`

`;

function AddToAlbumButton({photoId}) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        if (showModal) return;
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if (!showModal) return;


    }, [showModal]);

    return (
        <div>
            <Button onClick={openModal}>Add to Album</Button>
            {showModal && (
                <AddToAlbumModal photoId={photoId} closeModal={closeModal} />
            )}
        </div>
    )
}

export default AddToAlbumButton;
