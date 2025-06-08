import { Appointment } from "../models/appointment";
import { Main } from "../components/Main";
import { useEffect, useState } from "react";
import { apiClient } from "../models/apiClient";
import { AppointmentForm } from "../components/AppointmentForm";

export function Appointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    async function loadAppointments() {
        const res = await apiClient.get("/api/appointments");
        setAppointments(res.data);
    }

    useEffect(() => {
        loadAppointments();
    }, []);

    return (
        <Main>
            <h1>תורים</h1>
            <AppointmentForm onSuccess={loadAppointments} />
            <ul>
                {appointments.map((a) => (
                    <li key={a._id}>
                       {a.clientName} | {a.date} | {a.time} 
                    </li>
                ))}
            </ul>
        </Main>
    )
}