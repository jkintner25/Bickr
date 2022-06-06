import React, { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';

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
    align-items: center;
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
    color: white;
    margin: 10px 0;
`;

const Title = styled.div`
    font-size: 30px;
    color: white;
    margin-bottom: 5rem;
`;

const LoginBtn = styled.button`
    margin: 10px;
    border: none;
    padding: 8px;
    border-radius: 5px;
    background-color: #128fdc;
    color: white;
    font-weight: bold;
    cursor: pointer;
`;

function DemoLogin() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(()=>{
        handleSubmit()
    }, [])

    if (sessionUser) return (
        <Redirect to="/photostream" />
    );

    const handleSubmit = (e) => {
        e.preventDefault();

        const credential = 'demo@user.io'
        const password = 'password'

        return dispatch(sessionActions.login({ credential, password }))
            .then(() => history.push('/photostream'))
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            );
    }

    return (
        <Container>
            <Title>Log in!</Title>
            <Form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <Label>
                    Username or Email
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </Label>
                <Label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Label>
                <LoginBtn type="submit">Log In</LoginBtn>
            </Form>
        </Container>
    );
}

export default DemoLogin;
