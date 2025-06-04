export type Treatment = {
    id: string;
    title: string;
    description: string;
};

export const treatments: Treatment[] = [
    {
        id: "mediacl-pedicure",
        title: "פדיקור רפואי",
        description: "טיפול מקצועי וממוקד בכף הרגל – טיפול בפטרת, עור קשה, יבלות ובעיות עור.",
    },
    {
        id: "manicure",
        title:"טיפול בכסיסת ציפורניים",
        description: "עיצוב, ניקוי וטיפוח של הציפורניים עם לק ג'ל איכותי מבית BIO Sculpture.",

    },
    {
        id: "nail-repair",
        title: "שיקום ציפרורניים",
        description: "טיפול ייחודי לציפורניים כוססות או פגועות, כולל חיטוי, בנייה וטיפוח.",
    },
    {
        id: "makeup",
        title: "איפור מקצועי",
        description: "איפור מותאם אישית לאירועים, כלות, בוגרות ולכל סגנון שתבחרי.",
    },
    {
        id: "hair-style",
        title: "עיצוב שיער",
        description: "עיצוב שיער ערב, תסרוקות לאירועים ותיאום מלא עם האיפור שלך.",
    }
];