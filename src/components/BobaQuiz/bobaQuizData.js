// "What boba are you?" Every answer counts toward one of the four results below (A, B, C or D);
// the result with the most answers wins. `drink` is the name of a drink on the menu (the Order Now
// search finds it by these words, and its photo and price come from the menu).
// Written from public/QUIZ.md.
export const RESULTS = {
    "A": {
        "drink": "Taro Milk Tea",
        "blurb": "You're the warm hug of the boba world. Comforting, dependable, and a little bit magical with that purple charm, you're the person everyone wants next to them on hard days and lazy Sundays alike. You don't need to be loud to leave an impression — your kindness is the thing people remember most. You prove that being soft is its own kind of strength, and honestly, the world could use a lot more of you.",
        "tip": "Order it with amber pearls for maximum cozy energy."
    },
    "B": {
        "drink": "Jasmine Green Tea",
        "blurb": "You're a timeless classic. Elegant, grounded, and quietly brilliant, you don't chase attention because you've never needed to — people gravitate toward your steady presence all on their own. There's a depth to you that reveals itself slowly, like a good book that gets better with every chapter. You value quality over quantity in everything: your friendships, your space, your afternoon cup of tea.",
        "tip": "Order it with aloe vera cubes for that extra touch of calm."
    },
    "C": {
        "drink": "Honey Peach Royal Tea",
        "blurb": "Sweet, bright, and radiantly optimistic. You're the golden hour in human form — everything around you just looks a little warmer. Part adventurer, part nurturer, you're the one who finds the hidden gem restaurant, remembers everyone's birthday, and somehow always smells like fresh laundry. People light up when you walk in, and you genuinely have no idea why, which only makes it more charming.",
        "tip": "Order it with coconut jelly for a little tropical twist."
    },
    "D": {
        "drink": "Passion Fruit Smoothie",
        "blurb": "Bold, electric, and completely unforgettable. You bring the plot twist, the spontaneous road trip, and the story everyone retells for years. Boredom doesn't exist in your orbit. You're the friend who says \"let's go\" and everyone follows without asking where, because the destination was never the point — the ride with you was. Life is short and you intend to make it interesting.",
        "tip": "Order it with strawberry popping boba because of course you would."
    }
};

export const QUESTIONS = [
    {
        "question": "It's Saturday morning and you have absolutely nothing planned. What do you reach for first?",
        "options": [
            {
                "label": "The softest blanket you own — you're building a nest on the couch and nobody can stop you.",
                "type": "A"
            },
            {
                "label": "Your journal and a cup of something warm. Silence is golden and you intend to keep it that way.",
                "type": "B"
            },
            {
                "label": "Your phone, to text a friend about that new bakery you've been meaning to try.",
                "type": "C"
            },
            {
                "label": "Running shoes. Or roller skates. Or maybe you'll finally learn to skateboard? The day is young.",
                "type": "D"
            }
        ]
    },
    {
        "question": "You're hosting a dinner party. What's the vibe?",
        "options": [
            {
                "label": "Candles everywhere, a slow-cooked stew on the stove, lo-fi music, and exactly four people who feel like family.",
                "type": "A"
            },
            {
                "label": "A clean table, simple but beautifully plated dishes, fresh flowers, and good conversation that lasts until midnight.",
                "type": "B"
            },
            {
                "label": "A potluck where everyone brings their specialty — the table is overflowing and so is the laughter.",
                "type": "C"
            },
            {
                "label": "A themed night with a playlist you spent three days curating, a signature cocktail, and at least one moment where everyone ends up dancing.",
                "type": "D"
            }
        ]
    },
    {
        "question": "Pick the compliment that would genuinely make your whole week.",
        "options": [
            {
                "label": "\"I always feel so safe around you.\"",
                "type": "A"
            },
            {
                "label": "\"You have this quiet confidence that I really admire.\"",
                "type": "B"
            },
            {
                "label": "\"You make even ordinary days feel special.\"",
                "type": "C"
            },
            {
                "label": "\"I never know what you're going to do next, and I love that about you.\"",
                "type": "D"
            }
        ]
    },
    {
        "question": "You find a round-trip ticket to anywhere in the world on your doorstep. Where are you going?",
        "options": [
            {
                "label": "A mountain village in Switzerland where the only sounds are cowbells and your own breathing.",
                "type": "A"
            },
            {
                "label": "A ryokan in the Japanese countryside with tatami floors, an outdoor bath, and nowhere to be.",
                "type": "B"
            },
            {
                "label": "A sun-drenched coast in southern Italy, wandering through markets and eating peaches over the sink.",
                "type": "C"
            },
            {
                "label": "A night market in Bangkok, followed by island-hopping with strangers who are already becoming friends.",
                "type": "D"
            }
        ]
    },
    {
        "question": "You walk into a bookstore. Which section pulls you in?",
        "options": [
            {
                "label": "The cozy corner with illustrated cookbooks and hygge guides — you're already imagining the recipes.",
                "type": "A"
            },
            {
                "label": "Poetry, philosophy, or a beautifully designed nature journal you'll carry everywhere.",
                "type": "B"
            },
            {
                "label": "Travel memoirs and heartfelt essays — anything that makes you feel something warm.",
                "type": "C"
            },
            {
                "label": "The staff picks wall, the weirder the better — you trust a stranger's bold recommendation over a bestseller list.",
                "type": "D"
            }
        ]
    }
];

// `answers` is the chosen option for each question so far, in order.
// Later answers count a tiny bit more, so a tie is settled by the last thing you picked.
export function pickResult(answers) {
    const scores = {};
    answers.forEach((option, i) => {
        scores[option.type] = (scores[option.type] ?? 0) + 1 + i * 0.01;
    });
    return Object.keys(RESULTS).reduce((best, type) => (scores[type] ?? 0) > (scores[best] ?? 0) ? type : best);
}
