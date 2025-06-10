import { useEffect, useState } from "react";
import styles from "./Contact.module.scss";
import { apiClient, getToken } from "../models/apiClient";
import { jwtDecode } from "jwt-decode";
import { Input } from "../components/Input";
import { PrimaryButton } from "../components/PrimaryButton";

type TokenPayload = {
    sub: string;
    userName: string;
    email: string;
    phoneNumber: string;
    role: "admin" | "client";
    exp: number;
};

const SubjectOptions = [
    "שאלה על טיפול",
    "בקשה לקביעת תור",
    "בקשה לשיתוף פעולה",
    "אחר"
];

export function Contact() {
    const [formError, setFormError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState<Partial<TokenPayload>>({});

    useEffect(() => {
        const token = getToken();

        if (token) {
            try {
                const payload = jwtDecode<TokenPayload>(token);
                setIsLoggedIn(true);
                setUserInfo({
                    userName: payload.userName,
                    email: payload.email,
                    phoneNumber: payload.phoneNumber,
                });
            } catch {
                setIsLoggedIn(false);
            }
        }
    }, []);

    async function handleSubmit(formData: FormData) {
        try {
            const data = Object.fromEntries(formData);
            await apiClient.post("/api/contact", data);
            alert("ההודעה נשלחה בהצלחה");
            setFormError("");
        } catch (error) {
            console.error("Error sending contact:", error);
            setFormError("שגיאה בשליחת הטופס");
        }
    }

    return (
        <form className={styles.form} action={handleSubmit}>
            <label htmlFor="subject">נושא</label>
            <select name="subject" id="subject" required>
                <option value="">בחרי נושא</option>
                {SubjectOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
            <Input name="userName" id="userName" label="שם מלא" required defaultValue={userInfo.userName} readOnly={isLoggedIn} />
            <Input name="email" id="email" label="אימייל" required defaultValue={userInfo.email} readOnly={isLoggedIn} /> 
            <Input name="phoneNumber" id="phoneNumber" label="טלפון" required defaultValue={userInfo.phoneNumber} readOnly={isLoggedIn} />

            <label htmlFor="message">הודעה</label>
            <textarea name="message" id="message" rows={5} required></textarea>

            <PrimaryButton>שלחי</PrimaryButton>
            {formError && <p className={styles.error}>{formError}</p>}
        </form>
    );
}