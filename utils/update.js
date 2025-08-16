const https = require("https");
const fs = require("fs");
const path = require("path");
const { _updateScamSet } = require("./check"); // Import the internal update function

const DATA_FILE = path.join(__dirname, "../data/scam-links.json");

const SOURCES = [
  "https://raw.githubusercontent.com/nikolaischunk/discord-phishing-links/main/domain-list.json",
  "https://openphish.com/feed.txt"
];

// ... (keep fetchURL function as is) ...

async function autoUpdate() {
  const existingLinks = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  const mergedSet = new Set(existingLinks);
  let hasNewLinks = false;

  for (const source of SOURCES) {
    try {
      const data = await fetchURL(source);
      let domains = [];

      if (source.endsWith(".json")) {
        domains = JSON.parse(data);
      } else {
        domains = data.split("\n").map(line => line.trim()).filter(Boolean);
      }

      domains.forEach(domain => {
        if (!mergedSet.has(domain)) {
          mergedSet.add(domain);
          hasNewLinks = true;
        }
      });

    } catch (err) {
      console.error(`❌ Failed to fetch ${source}:`, err.message);
    }
  }

  if (hasNewLinks) {
    const updatedList = Array.from(mergedSet);
    fs.writeFileSync(DATA_FILE, JSON.stringify(updatedList, null, 2));
    _updateScamSet(updatedList); // Update the in-memory Set
    console.log(`✅ Scam list updated. Total entries: ${updatedList.length}`);
  } else {
    console.log("✅ Scam list is already up to date.");
  }
}

module.exports = { autoUpdate };