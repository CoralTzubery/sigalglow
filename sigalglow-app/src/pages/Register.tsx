import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient, setToken } from "../models/apiClient";
import { isAxiosError } from "axios";

import styles from "./Register.module.scss";
import { Link } from "react-router-dom";
import { Main } from "../components/Main";
import { Input } from "../components/Input";
import { PrimaryButton } from "../components/PrimaryButton";
import { PasswordInput } from "../components/PasswordInput";

export function Register() {
    const [registerError, setRegisterError] = useState("");
    const navigate = useNavigate();

    async function register(formData: FormData) {
        try {
            const newUser = Object.fromEntries(formData);
            const res = await apiClient.post("/register", newUser);
            const { token } = res.data;
            setToken(token);
            navigate("/");
        } catch (error) {
            if (!isAxiosError(error) || error.response?.status !== 409) {
                throw error;
            }

            setRegisterError("Email already exits");
        }
    }

    return (
        <>
            <nav className={styles.nav}>
                <Link to="/login">Login</Link>
            </nav>
            <Main>
                <h1>Register</h1>
                <form className={styles.form} action={register}>
                    <Input type="email" name="email" id="email" label="Email" required />
                    <Input  name="fullName" id="fullName" label="Full Name" required />
                    <Input  name="phoneNumber" id="phoneNumber" label="Phone Number" />
                    <SetPasswordField />
                    <PrimaryButton>Register</PrimaryButton>
                    {registerError && <p className={styles.errorMessage}>{registerError}</p>}
                </form>
            </Main>
        </>
    );
}

function SetPasswordField() {
    const [password, setPassword] = useState("");

    return (
        <>
            <PasswordInput
                id="password" 
                name="password" 
                label="Password" 
                value={password}
                onInput={(e) => setPassword(e.currentTarget.value)}
                minLength={8}
                required
            />
            <PasswordRules password={password} />
        </>
    );
}

type PasswordRulesProps = {password: string };

function PasswordRules({ password }: PasswordRulesProps) {
    return (
        <ul className={styles.passwordRules}>
            <li className={password.length > 8 ? styles.satisfied : undefined}> 8 characters long</li>
            <li className={password.match(/[a-z]/) ? styles.satisfied : undefined}>1 lowercase letter</li>
            <li className={password.match(/[A-Z]/) ? styles.satisfied : undefined}> 1 uppercase letter</li>
            <li className={password.match(/[0-9]/) ? styles.satisfied : undefined}> 1 digit</li>
        </ul>
    );
}