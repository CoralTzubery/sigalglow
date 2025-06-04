import styles from "./TreatmentCard.module.scss";

type Props = {
    title: string;
    description: string;
};

export function TreatmentCard({ title, description }: Props) {
    return (
        <>
            <article className={styles.card}>
                <h2>{title}</h2>
                <p>{description}</p>
            </article>
        </>
    );
}