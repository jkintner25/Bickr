import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
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

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [fullName, setFullName] = useState("")

    if (sessionUser) return <Redirect to="/photostream" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password, fullName }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <Container>
            <Title>Sign Up!</Title>
            <Form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <Label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Label>
                <Label>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Label>
                <Label>
                    Full Name
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
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
                <Label>
                    Confirm Password
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </Label>
                <LoginBtn type="submit">Sign Up</LoginBtn>
            </Form>
        </Container>
    );
}

export default SignupFormPage;
