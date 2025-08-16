const scamLinksArray = require("../data/scam-links.json");
const scamLinksSet = new Set(scamLinksArray);
const whitelistSet = new Set(); // Make sure the whitelist Set is created

/**
 * Adds a domain or an array of domains to the whitelist.
 * @param {string|string[]} domains - The domain(s) to whitelist.
 */
function addWhitelist(domains) {
    if (Array.isArray(domains)) {
        domains.forEach(domain => whitelistSet.add(domain.toLowerCase()));
    } else if (typeof domains === 'string') {
        whitelistSet.add(domains.toLowerCase());
    }
}

/**
 * Check if a given URL or domain is a scam.
 * @param {string} url - The URL or domain to check.
 * @returns {boolean}
 */
function isScam(url) {
  let domain;
  try {
    domain = new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    domain = url.replace(/^www\./, "").split('/')[0].toLowerCase();
  }

  // If the domain is in the whitelist, it's not a scam
  if (whitelistSet.has(domain)) {
      return false;
  }

  // Check for exact match or subdomain match in the scam list
  if (scamLinksSet.has(domain)) {
    return true;
  }
  const parts = domain.split('.');
  while (parts.length > 1) {
    const parentDomain = parts.join('.');
    if (scamLinksSet.has(parentDomain)) {
      return true;
    }
    parts.shift();
  }
  
  return false;
}

function getScamList() {
  return scamLinksArray;
}

// Internal function for auto-updating
function _updateScamSet(newList) {
  scamLinksSet.clear();
  newList.forEach(link => scamLinksSet.add(link));
  // Also clear whitelist if needed, or handle it based on desired behavior
}

// Ensure addWhitelist is in the exports
module.exports = { isScam, getScamList, addWhitelist, _updateScamSet };module.exports = { isScam, getScamList, _updateScamSet };