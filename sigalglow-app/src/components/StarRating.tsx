import styles from "./StarRating.module.scss";

export function StarRating({ rating }: {rating: number }) {
    const stars = Array.from({ length: 5 }, (_, i) => i < rating);

    return (
        <div className={styles.stars}>
            {stars.map((isFilled, index) => (
                <span key={index} className={isFilled ? styles.filled : styles.empty}>*</span>
            ))}
        </div>
    );
}