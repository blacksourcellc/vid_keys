import fetch from "node-fetch";
import { writeFile } from "node:fs/promises";

async function fetchKeysFromURL(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch keys from URL: ${response.status} - ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch keys:", error);
        throw error;
    }
}

async function main() {
    const keysURL = "https://raw.githubusercontent.com/Ciarands/vidsrc-keys/main/keys.json";
    try {
        const keys = await fetchKeysFromURL(keysURL);
        console.info("Success!");
        await writeFile("keys.json", JSON.stringify(keys), "utf8");
    } catch (error) {
        console.error("Failed to fetch keys:", error);
        await writeFile("failed.js", error.message, "utf8");
    }
}

main();
