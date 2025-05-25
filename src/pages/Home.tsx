import { useLoaderData } from "react-router-dom";
import type { HeroData } from "../models/homepage";
import { Main } from "../components/Main";

import styles from "./Home.module.scss";
import { AboutMeSection } from "../components/AboutMeSection";

export function Home() {
    const hero = useLoaderData() as HeroData;

    return (
        <>
            <Main>
                <section className={styles.hero}>
                    <img src={hero.imageUrl} className={styles.cover} alt="" />
                    <AboutMeSection />
                </section>
            </Main>
        </>
    );
}