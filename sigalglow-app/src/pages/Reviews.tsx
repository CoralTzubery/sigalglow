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
    const [ratingFilter, setRatingFilter] = useState<number | null>(null);
    const filterReviews = ratingFilter ? reviews.filter((r) => r.rating === ratingFilter): reviews;

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
        
        if (!token) {
            console.log("No token was found");
            return;
        } 

        try {
            const payload = jwtDecode<TokenPayload>(token);
            setIsAdmin(payload.role === "admin");
        } catch (error) {
            console.log("Error decoding token:", error)
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
            <label className={styles.filterLabel} htmlFor="filter">סינון לפי דירוג:</label>
            <select className={styles.ratingFilter}
                name="filer" 
                id="filter" 
                value={ratingFilter ?? ""}
                onChange={(e) => setRatingFilter(e.target.value ? parseInt(e.target.value): null)}
            >
                <option value="">הצג את הכל</option>
                {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>{n}/5</option>
                ))}
            </select>
            <ul className={styles.reviewList}>
                {filterReviews.map((r) => (
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