import { Link } from "react-router-dom";

import styles from "./ErrorPage.module.scss";

export function ErrorPage() {
    return (
        <>
        <div className={styles.errorContainer}>
            <h1>שגיאה</h1>
            <p>משהו השתבש בעת טעינת העמוד.</p>
            <p>נסו לרענו את הדף או לחזור מאוחר יותר.</p>
            <Link to="/">חזרה לדף הבית</Link>
        </div>
        </>
    );
}