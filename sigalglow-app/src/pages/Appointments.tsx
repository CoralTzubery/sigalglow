import { useEffect, useState } from "react";
import { apiClient } from "../models/apiClient";
import { treatments } from "../models/treatments";
import { AppointmentForm } from "../components/AppointmentForm";
import { Appointment } from "../models/appointments";

import styles from "./Appointment.module.scss";

export function Appointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadAppointments();
    }, []);

    async function loadAppointments() {
        try {
            const res = await apiClient.get("/api/appointments");
            setAppointments(res.data);
        } catch (error) {
            console.error("Failed to load appointments:", error);
            setError("שגיאה בטעינת התורים");
        }
    }

    function getTreatmentTitle(id: string): string {
        const treatment = treatments.find(t => t.id === id);
        return treatment?.title || "טיפול לא ידוע";
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>יומן תורים</h1>
                <p className={styles.subtitle}>צפי, צרי ומחקי תורים בצורה נוחה</p>
                <button className={styles.addButton} onClick={() => setShowForm(!showForm)}>
                    {showForm ? "בטלי הוספת תור" : "הוספת תור"}
                </button>
            </header>

            {showForm && <AppointmentForm onSuccess={loadAppointments} />}

            <h2>תורים קיימים</h2>
            {error && <p className={styles.error}>{error}</p>}
            {appointments.length === 0 ? (
                <p>אין תורים כרגע</p>
            ) : (
                <ul className={styles.appointmentList}>
                    {appointments.map((a) => (
                        <li key={a._id} className={styles.appointmentCard}>
                            <p><strong>שם:</strong> {a.clientName}</p>
                            <p><strong>תאריך:</strong> {a.date}</p>
                            <p><strong>שעה:</strong> {a.time}</p>
                            <p><strong>טלפון:</strong> {a.phoneNumber}</p>
                            <p><strong>טיפול:</strong> {getTreatmentTitle(a.treatmentId)}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
