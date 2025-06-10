import { useEffect, useState } from "react";
import { Review } from "../models/reviews";
import { apiClient } from "../models/apiClient";
import { ReviewForm } from "../components/ReviewForm";

import styles from "./Reviews.module.scss";

export function Reviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        loadReviews();
    }, []);

    async function loadReviews() {
        try {
            const res = await apiClient.get("/api/reviews");
            setReviews(res.data);
        } catch(error) {
            console.error("Error loading reviews:", error);
            setError("שגיאה בטעינת הביקורות");
        }
    }

    return (
        <div className={styles.container}>
            <h1>ביקורות</h1>
            <ReviewForm onSuccess={loadReviews} />
            {error && <p className={styles.error}>{error}</p>}
            <ul className={styles.reviewList}>
                {reviews.map((r) => (
                    <li key={r._id} className={styles.reviewCard}>
                        <p><strong>{r.clientName}</strong></p>
                        <p>{r.content}</p>
                        <p>{r.rating}/5</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}