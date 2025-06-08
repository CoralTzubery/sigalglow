import { useLoaderData } from "react-router-dom";
import { Appointment } from "../models/appointment";
import { Main } from "../components/Main";

export function Appointments() {
    const appointments = useLoaderData() as Appointment[];

    return (
        <Main>
            <h1>תורים</h1>
            {appointments.length === 0 ? (<p>לא נקבעו עדיין תורים</p>) : (
                <ul>
                    {appointments.map((appointments) => (
                        <li key={appointments._id}>
                            <strong>{appointments.clientName}</strong> | {appointments.date} | {appointments.time}
                        </li>
                    ))}
                </ul>
            )}
        </Main>
    );
}