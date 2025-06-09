import { useState } from "react";
import { apiClient } from "../models/apiClient";
import { Input } from "./Input";
import { PrimaryButton } from "./PrimaryButton";

import styles from "./AppointmentForm.module.scss"
import { treatments } from "../models/treatments";

export function AppointmentForm({ onSuccess }: { onSuccess: () => void }) {
    const [formError, setFormError] = useState("");

    async function handleSubmit(formData: FormData) {
        try {
            const data = Object.fromEntries(formData);
            const res = await apiClient.post("/api/appointments", data);

            if (res.status === 201) {
                setFormError("");
                onSuccess();
            }
        } catch (error) {
            console.error("Error creating appointment:", error);
            setFormError("שגיאה ביצירת תור, נסי שוב");
        }
    }

    return (
        <form className={styles.form} action={handleSubmit}>
            <Input name="clientName" id="clientName" label="שם מלא" required />
            <Input name="phoneNumber" id="phoneNumber" label="טלפון" required />
            <Input name="date" id="date" label="תאריך" type="date" required />
            <Input name="time" id="time" label="שעה" type="time" required />

            <label htmlFor="treatmentId" className={styles.label}>טיפול</label>
            <select name="treatmentId" id="treatmentId" className={styles.select} required>
                <option value="">בחרי טיפול</option>
                {treatments.map((treatment) => (
                    <option key={treatment.id} value={treatment.id}>
                        {treatment.title}
                    </option>
                ))}
            </select>

            <PrimaryButton>קבעי תור</PrimaryButton>
            {formError && <p className={styles.error}>{formError}</p>}
        </form>
    );
}