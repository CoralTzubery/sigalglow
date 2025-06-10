
import { useState } from "react";
import { apiClient } from "../models/apiClient";
import { Input } from "./Input";
import { PrimaryButton } from "./PrimaryButton";

import styles from "./ReviewForm.module.scss";

export function ReviewForm({ onSuccess }: { onSuccess: () => void }) {
    const [formError, setFormError] = useState("");

    async function handleSubmit(formData: FormData) {
        try {
            const data = Object.fromEntries(formData);
            const rating = parseInt(data.rating as string, 10);
            const payload = { ...data, rating };
            const res = await apiClient.post("/api/reviews", payload);

            if (res.status === 201) {
                setFormError("");
                onSuccess();
            }
        } catch (error) {
            console.error("Error creating review:", error);
            setFormError("שגיאה בשליחת ביקורת");
        }
    }

    return (
        <form className={styles.form} action={handleSubmit}>
            <Input name="clientName" id="clientName" label="שם מלא" required />
            <Input name="content" id="content" label="תוכן הביקורת" required />
            <label htmlFor="rating">(1-5) דירוג</label>
            <select name="rating" id="rating" required>
                <option value="">בחרי דירוג</option>
                {[1, 2, 3, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n}</option>
                ))}
            </select>
            <PrimaryButton>שלחי ביקורת</PrimaryButton>
            {formError && <p className={styles.error}>{formError}</p>}
        </form>
    );
}