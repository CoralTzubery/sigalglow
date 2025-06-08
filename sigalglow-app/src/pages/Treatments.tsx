import { Main } from "../components/Main";
import { TreatmentCard } from "../components/TreatmentCard";
import { treatments } from "../models/treatments";

import styles from "./Treatments.module.scss";
export function Treatments() {
    return(
        <>
            <Main>
                <h1>טיפולים</h1>
                <section className={styles.grid}>
                    {treatments.map((treatment) => (
                        <TreatmentCard key={treatment.id} {...treatment}/>
                    ))}
                </section>
            </Main>
        </>
    );
}