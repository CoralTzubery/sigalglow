export type HeroData = {
    title: string;
    subtitle: string;
    imageUrl: string;
};

export function getHero(): HeroData {
    return {
        title: "Welcome to Sigal Glow",
        subtitle: "Makeup, beauty and elegance",
        imageUrl: "/image/hero.jpg",
    };
}