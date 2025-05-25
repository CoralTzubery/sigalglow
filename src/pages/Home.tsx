import { useLoaderData } from "react-router-dom";
import type { HeroData } from "../models/homepage";
import { AboutMeSection } from "../components/AboutMeSection";
import type { AboutSection } from "../models/about";
import { Main } from "../components/Main";

import styles from "./Home.module.scss";


type LoaderData = {
    hero: HeroData;
    about: AboutSection[];
};

export function Home() {
    const { hero, about } = useLoaderData() as LoaderData;

    return (
        <>
            <Main>
                <section className={styles.hero}>
                    <img src={hero.imageUrl} className={styles.cover} alt="" />
                    <div className="{style.overlay">
                        <h1>{hero.title}</h1>
                        <p>{hero.subtitle}</p>
                    </div>
                </section>
                
                <AboutMeSection sections={about}/>
            </Main>
        </>
    );
}