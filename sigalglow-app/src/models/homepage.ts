export type HeroData = {
    title: string;
    subtitle: string;
};

export function getHero(): HeroData {
    return {
        title: "Sigal Glow",
        subtitle: "פשוט להרגיש יופי",
    };
}