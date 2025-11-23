import { sandbox } from './sandbox.js';
import { prompt, cleanUp } from './input.js';
import { singlePlayerGame } from './game.js';
import { demo_play_10_games } from './tests.js';

async function main() {
    // Startup logic, welcome, splash screen
    console.log("Welcome to Jesse's demonstration app!");

    // Main Event Loop / Logic
    // What are the main things our app does?
    console.log("Type 'h' for help. 'q' to quit.");

    // Start running our application
    let running = true;
    while (running) {
        // Ask the user what they want to do
        const userInput = await prompt("> ");

        switch (userInput) {
            case "h":
                console.log("Help Menu:");
                console.log("h - Display this help menu");
                console.log("demo - Run a demo of 10 games between two preset players");
                console.log("game - Play a game of Rock, Paper, Scissors");
                console.log("poke - Fetch info about a given Pokemon");
                console.log("sandbox - Run the sandbox async example from unit 4");
                console.log("stocks - Fetch weekly stock data for a hardcoded ticker (IBM)");
                console.log("q - Quit the application");
                break;
            case "q":
                // Stop running
                running = false;
                break;
            case "demo":
                demo_play_10_games();
                break;
            case "game":
                await singlePlayerGame();
                console.log("Thanks for playing!");
                break;
            case "poke":
                // Ask the user for a pokemon name
                const pokemonName = await prompt("Enter a pokemon name: ");

                // Try to fetch the information
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
                if (response.ok) {
                    const pokemonData = await response.json();
                    console.log(`All the data: ${JSON.stringify(pokemonData)}`);
                } else {
                    console.log(`Could not find data for pokemon: ${pokemonName}`);
                }
                break;
            case "music":
                const apiKey = "";
                if (!apiKey) {
                    console.log("No API key provided for Discogs API.");
                    break;
                }

                const responseMusic = await fetch(`https://api.discogs.com/database/search?q=Nirvana&token=${apiKey}`);
                if (responseMusic.ok) {
                    const musicData = await responseMusic.json();
                    console.log(`Music data: ${JSON.stringify(musicData)}`);
                } else {
                    console.log("Failed to fetch music data.");
                }
                break;
            case "sandbox":
                await sandbox();
                break;
            case "stocks":
                const stockTicker = "IBM"; // Hardcoded for now
                const stockUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${stockTicker}&apikey=demo`;
                const stockResponse = await fetch(stockUrl);
                if (stockResponse.ok) {
                    const stockData = await stockResponse.json();
                    console.log(`Stock data: ${JSON.stringify(stockData)}`);
                }
                break;
            default:
                console.log("What are you even trying to do? Type 'h' for help.");
                break;
        }
    }

    // Cleanup logic / shutdown
    console.log("Thanks for playing! Goodbye!");
    cleanUp();
}

// Start our application
main();
