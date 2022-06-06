import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addPhoto } from "../../store/photos";
import styled from "styled-components"
import { addAlbum } from "../../store/albums";

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

const CreateAlbumBtn = styled.button`
    /* position: absolute; */
    margin: 10px;
    margin-bottom: 0;
    border: none;
    padding: 8px;
    border-radius: 5px;
    background-color: #128fdc;
    color: white;
    font-weight: bold;
    cursor: pointer;
`;

const Label = styled.label`
    display: flex;
    color: white;
`;

const Title = styled.div`
    font-size: 30px;
    color: white;
    margin-bottom: 5rem;
`;

function AlbumForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState('');

    const userId = useSelector((state) => state.session.user.id)

    const updateTitle = (e) => setTitle(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            userId
        };

        dispatch(addAlbum(payload))
        history.push(`/albums`)
    }

    return (
        <Container>
            <Title>Create a new Album!</Title>
            <Form onSubmit={handleSubmit}>
                <Label>Title
                    <input
                        name="title"
                        type="text"
                        placeholder="title"
                        value={title}
                        onChange={updateTitle}>
                    </input>
                </Label>
                <CreateAlbumBtn type="submit">Create</CreateAlbumBtn>
            </Form>
        </Container>
    )
}

export default AlbumForm;
