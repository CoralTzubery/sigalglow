import { aboutSections } from "../models/about";
import styles from "./AboutMeSection.module.scss";

export function AboutMeSection() {
    return (
        <section className={styles.about}>
            {aboutSections.map(({ id, title, content }) => (
                <article key={id} className={styles.block}>
                    <h2>{title}</h2>
                    <p>{content}</p>
                </article>
            ))};
        </section>
    );
}