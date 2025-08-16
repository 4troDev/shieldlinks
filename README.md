# 🛡️ ShieldLinks

**ShieldLinks** is a scam & phishing link blocklist for JavaScript projects.  
It comes with a **manual list of known scam domains** and supports **auto-updates** from trusted phishing feeds.  
Perfect for Discord bots, web apps, or any project that needs to block malicious links.

## 🚀 Features
- ✅ Easy to use – just `isScam(url)` to check links.  
- ✅ Comes with a **built-in blocklist** of scam domains.  
- ✅ **Auto-update support** from public phishing feeds (e.g., OpenPhish, Discord phishing lists).  
- ✅ Works in **Node.js apps, Discord bots, or backend services**.  

---

## 📦 Installation
```bash
npm install shieldlinks
````

## 🔧 Usage

### Basic Check

```js
const { isScam } = require("shieldlinks");

console.log(isScam("https://free-discordnitro.com")); 
// true ✅

console.log(isScam("https://google.com")); 
// false ❌
```

### Get Full Scam List

```js
const { getScamList } = require("shieldlinks");

console.log(getScamList());
// ["free-discordnitro.com", "discord-giveaway.net", ...]
```

### Auto-Update Blocklist

```js
const { autoUpdate, getScamList } = require("shieldlinks");

(async () => {
  await autoUpdate();
  console.log("Updated scam list size:", getScamList().length);
})();
```

---

## 🗂️ Project Structure

```
shieldlinks/
├── data/
│   └── scam-links.json    # Built-in blocklist (manual updates)
├── utils/
│   ├── check.js           # Scam checker functions
│   └── update.js          # Auto-update logic
├── index.js               # Main export
└── README.md              # Documentation
```

---

## 📖 API Reference

### `isScam(url: string): boolean`

Checks if the given URL or domain is in the blocklist.

* Returns `true` if the URL is flagged as a scam.
* Returns `false` if it is safe.

---

### `getScamList(): string[]`

Returns the current in-memory list of scam domains.

---

### `autoUpdate(): Promise<void>`

Fetches phishing domain lists from trusted sources, merges them, and updates `scam-links.json`.

---

## ⚠️ Disclaimer

This package is intended as a **helper tool**.
No blocklist is 100% complete – always combine with other security practices (link previews, user reports, etc.).

---

## 📜 License

MIT License © 2025 – @4trodev
