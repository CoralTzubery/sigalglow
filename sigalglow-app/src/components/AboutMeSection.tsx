import { type AboutSection } from "../models/about";
import styles from "./AboutMeSection.module.scss";

type Props = {
    sections: AboutSection[];
};

export function AboutMeSection({ sections }: Props) {
    return (
        <section className={styles.about}>
            {sections.map(({ id, title, content }) => (
                <article key={id} className={styles.block}>
                    <h2>{title}</h2>
                    <p>{content}</p>
                </article>
            ))}
        </section>
    );
}