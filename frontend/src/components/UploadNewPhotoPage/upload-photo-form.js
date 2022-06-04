import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addPhoto } from "../../store/photos";
import styled from "styled-components"

const Container = styled.div`
    background-color: #212124;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 50px);
`;

const Form = styled.form`
    display: flex;
    flex-flow: column;
    border: 2px solid white;
    border-radius: 5px;
    padding: 20px;
    width: 400px;
    label{
        color: white;
    }
`;

const Label = styled.div`
    display: flex;

`;

const Title = styled.div`
    font-size: 30px;
    color: white;
    margin-bottom: 5rem;
`;

function NewPhotoFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [picSrc, setPicSrc] = useState('');
    const [description, setDescription] = useState('');
    // const [image, setImage] = useState(null);
    // const [toggle, setToggle] = useState(true)

    const userId = useSelector((state) => state.session.user.id)

    const updatePicSrc = (e) => setPicSrc(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            picSrc,
            description,
            userId
        };

        let newPhoto = await dispatch(addPhoto(payload))
        history.push(`/photostream`)
    }

    // const updateFile = (e) => {
    //     const file = e.target.files[0];
    //     if (file) setImage(file);
    // };

    return (
        <Container>
            <Title>Upload a photo of Mick Jagger!</Title>
            <Form onSubmit={handleSubmit}>
                <Label>
                    <label>Image URL</label>
                    <input
                        name="imgUrl"
                        type="text"
                        placeholder="img url"
                        value={picSrc}
                        onChange={updatePicSrc}>
                    </input>
                </Label>
                <Label>
                    <label>Photo Description</label>
                    <input
                        type="textarea"
                        placeholder="description"
                        value={description}
                        onChange={updateDescription}>
                    </input>
                </Label>
                <button type="submit">Upload</button>
            </Form>
        </Container>
    )
}

export default NewPhotoFormPage;
