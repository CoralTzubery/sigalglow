import { useEffect, useState } from "react";
import { Review } from "../models/reviews";
import { apiClient, getToken } from "../models/apiClient";
import { ReviewForm } from "../components/ReviewForm";

import styles from "./Reviews.module.scss";
import { jwtDecode } from "jwt-decode";

type TokenPayload = {
    sub: string;
    userName: string;
    role: "admin" | "client";
    exp: number;
};

export function Reviews() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [error, setError] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        loadReviews();
        checkUserRole();
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

    function checkUserRole() {
        const token = getToken();
        
        if (!token) return;

        try {
            const payload = jwtDecode<TokenPayload>(token);
            setIsAdmin(payload.role === "admin");
        } catch {
            setIsAdmin(false); 
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("האם את בטוחה שברצונך למחוק את הביקורת?")) return;

        try {
            await apiClient.delete(`/api/reviews/${id}`);
            loadReviews();
        } catch (error) {
            console.error("Error deleting review:", error);
            alert("שגיאה במחיקת ביקורת");
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
                        {isAdmin && (
                            <button className={styles.deleteButton} onClick={()=> handleDelete(r._id)}>
                                מחקי
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}