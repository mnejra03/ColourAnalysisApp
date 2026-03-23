export const getPalette = (season) => {
    const palettes = {
        Spring: ["#FFB7A5", "#FFD166", "#A8E6CF", "#FFE5B4", "#FF7F50"],
        Summer: ["#A7C7E7", "#D8BFD8", "#E6E6FA", "#B0C4DE", "#C9ADA7"],
        Autumn: ["#8B4513", "#D2691E", "#556B2F", "#A0522D", "#CD853F"],
        Winter: ["#000000", "#FFFFFF", "#FF0000", "#1E90FF", "#8A2BE2"],
    };

    return palettes[season];
};

export const analyzeLocally = (answers) => {
    const score = {
        Spring: 0,
        Summer: 0,
        Autumn: 0,
        Winter: 0,
    };

    // SKIN
    if (answers.skin === "warm") {
        score.Spring += 2;
        score.Autumn += 2;
    }
    if (answers.skin === "cool") {
        score.Summer += 2;
        score.Winter += 2;
    }
    if (answers.skin === "neutral") {
        score.Spring += 1;
        score.Summer += 1;
        score.Autumn += 1;
        score.Winter += 1;
    }

    // HAIR
    if (answers.hair.includes("blonde")) score.Spring += 1;
    if (answers.hair.includes("brown")) score.Autumn += 1;
    if (answers.hair === "black") score.Winter += 2;
    if (answers.hair === "red") score.Autumn += 2;

    // EYES
    if (answers.eyes === "blue" || answers.eyes === "grey") score.Summer += 1;
    if (answers.eyes === "green") score.Spring += 1;
    if (answers.eyes === "brown" || answers.eyes === "dark_brown") score.Autumn += 1;

    // CONTRAST
    if (answers.contrast === "high") score.Winter += 2;
    if (answers.contrast === "low") score.Summer += 2;

    const season = Object.keys(score).reduce((a, b) =>
        score[a] > score[b] ? a : b
    );
    const descriptions = {
        Spring: "You have a warm, radiant glow with fresh and lively features.",
        Summer: "Your colouring is soft, cool, and elegant with gentle contrast.",
        Autumn: "You have rich, earthy tones with warmth and depth.",
        Winter: "Your features are bold, cool, and high contrast.",
    }
    const getSubtype = (season, answers) => {
        if (season === "Spring") {
            if (answers.contrast === "low") return "Light Spring";
            if (answers.skin === "warm") return "Warm Spring";
            return "Bright Spring";
        }

        if (season === "Winter") {
            if (answers.contrast === "high") return "Deep Winter";
            return "True Winter";
        }

        if (season === "Summer") return "Soft Summer";
        if (season === "Autumn") return "Deep Autumn";

        return season;
    };
    return {
        season,
        subtype: getSubtype(season, answers),
        undertone:
            answers.skin === "warm"
                ? "Warm"
                : answers.skin === "cool"
                    ? "Cool"
                    : "Neutral",
        /*characteristics: "You have a naturally balanced and harmonious colouring.",*/
        characteristics: descriptions[season],
        palette: getPalette(season),
        colourNames: ["Soft Pink", "Sky Blue", "Olive", "Cream", "Coral"],
        bestColors: "These colours enhance your natural beauty and glow.",
        avoidColors: "Avoid colours with opposite undertones.",
        makeupTips: "Choose makeup that matches your undertone.",
        celebrities: ["Zendaya", "Taylor Swift", "Emma Watson"],
    };
};