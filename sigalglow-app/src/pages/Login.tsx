import { useNavigate } from "react-router-dom";
import { apiClient, setToken } from "../models/apiClient";
import { isAxiosError } from "axios";
import { Link } from "react-router-dom";
import { Main } from "../components/Main";
import { Input } from "../components/Input";
import { PasswordInput } from "../components/PasswordInput";
import { PrimaryButton } from "../components/PrimaryButton";
import { useState } from "react";
import { useAuth } from "../context/useAuth";

import styles from "./Login.module.scss";


export function Login() {
    const { setLoggedIn } = useAuth();
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();

    async function login(formData: FormData) {
        try {
            const credentials = Object.fromEntries(formData);
            const res = await apiClient.post("/login", credentials);
            const { token } = res.data;
            setToken(token);
            setLoggedIn(true);
            navigate("/");
        } catch (error) {
            if(!isAxiosError(error) || error.response?.status !==401) {
                throw error;
            }
            
            setLoginError("Email or password is incorrect");
        }
    }

    return (
        <>
            <nav className={styles.nav}>
                <Link to="/register">Register</Link>
            </nav>
            <Main>
                <h1>Login</h1>
                <form className={styles.form} action={login}>
                    <Input type="email" name="email" id="email" label="Email" required />
                    <PasswordInput name="password" id="password" label="Password" required />
                    <PrimaryButton>Login</PrimaryButton>
                    {loginError && <p className={styles.errorMessage}>{loginError}</p>}
                </form>
            </Main>
        </>
    );
}