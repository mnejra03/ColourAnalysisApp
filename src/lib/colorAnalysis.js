export const getPalette = (season) => {
    /*const palettes = {
        Spring: ["#FFB7A5", "#FFD166", "#A8E6CF", "#FFE5B4", "#FF7F50"],
        Summer: ["#A7C7E7", "#D8BFD8", "#E6E6FA", "#B0C4DE", "#C9ADA7"],
        Autumn: ["#8B4513", "#D2691E", "#556B2F", "#A0522D", "#CD853F"],
        Winter: ["#000000", "#FFFFFF", "#FF0000", "#1E90FF", "#8A2BE2"],
    };*/
    const palettes = {
        Spring: [
            { name: "Peach", hex: "#FFB7A5" },
            { name: "Coral", hex: "#FF7F50" },
            { name: "Warm Yellow", hex: "#FFD166" },
            { name: "Light Green", hex: "#A8E6CF" },
            { name: "Cream", hex: "#FFF1C1" },
        ],

        Summer: [
            { name: "Powder Blue", hex: "#A7C7E7" },
            { name: "Dusty Lavender", hex: "#D8BFD8" },
            { name: "Soft Lilac", hex: "#E6E6FA" },
            { name: "Light Blue Grey", hex: "#B0C4DE" },
            { name: "Muted Rose", hex: "#C9ADA7" },
        ],

        Autumn: [
            { name: "Dark Brown", hex: "#8B4513" },
            { name: "Burnt Orange", hex: "#D2691E" },
            { name: "Olive Green", hex: "#556B2F" },
            { name: "Rust", hex: "#A0522D" },
            { name: "Caramel", hex: "#CD853F" },
        ],

        Winter: [
            { name: "Black", hex: "#000000" },
            { name: "Pure White", hex: "#FFFFFF" },
            { name: "Bright Red", hex: "#FF0000" },
            { name: "Electric Blue", hex: "#1E90FF" },
            { name: "Violet", hex: "#8A2BE2" },
        ],

    }

    return palettes[season] || [];
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

    const palette = getPalette(season) || [];

    const seasonContent = {
        Spring: {
            characteristics: "You have a warm, fresh, and radiant colouring with a light and lively appearance.",
            bestColors: "Bright, warm, and clear colours like peach, coral, warm yellow, and light greens will make you glow.",
            avoidColors: "Avoid cool, muted, or very dark colours as they can dull your natural warmth.",
            makeupTips: "Go for warm, glowing makeup — peach blush, coral lips, and golden highlights work beautifully.",
        },
        Summer: {
            characteristics: "Your colouring is soft, cool, and elegant with low contrast and a gentle, delicate appearance.",
            bestColors: "Soft, cool, and muted tones like powder blue, dusty rose, and lavender enhance your natural elegance.",
            avoidColors: "Avoid warm, bright, or harsh colours as they can overpower your soft features.",
            makeupTips: "Choose cool-toned, soft makeup such as rose blush, mauve lips, and subtle highlights.",
        },
        Autumn: {
            characteristics: "You have rich, warm, and earthy colouring with depth and a naturally grounded look.",
            bestColors: "Warm, deep, and earthy tones like olive green, rust, burnt orange, and caramel suit you best.",
            avoidColors: "Avoid cool or icy colours as they can clash with your natural warmth.",
            makeupTips: "Opt for warm makeup shades like bronze, terracotta, and deep berry tones.",
        },
        Winter: {
            characteristics: "Your colouring is bold, cool, and high contrast, with striking and defined features.",
            bestColors: "Crisp, cool, and high-contrast colours like black, white, red, and electric blue highlight your features.",
            avoidColors: "Avoid warm, muted, or dull colours as they reduce your natural contrast.",
            makeupTips: "Go for bold and cool makeup — red lips, sharp eyeliner, and strong contrast looks.",
        },
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
        characteristics: seasonContent[season].characteristics,
        bestColors: seasonContent[season].bestColors,
        avoidColors: seasonContent[season].avoidColors,
        makeupTips: seasonContent[season].makeupTips,
        palette: getPalette(season),
        celebrities: ["Zendaya", "Taylor Swift", "Emma Watson"],
    };
};