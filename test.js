// test.js
const assert = require('assert');
const { isScam, addWhitelist } = require('./index');

// Test scam links
assert.strictEqual(isScam('https://free-discordnitro.com'), true, 'Should detect scam link');
assert.strictEqual(isScam('http://www.steam-nitro.xyz/login'), true, 'Should detect scam link with subdomain and path');

// Test legitimate links
assert.strictEqual(isScam('https://google.com'), false, 'Should not detect legitimate link');
assert.strictEqual(isScam('https://discord.com'), false, 'Should not detect legitimate link');

// Test whitelist
addWhitelist('google.com');
assert.strictEqual(isScam('https://google.com'), false, 'Should respect whitelist');

console.log('✅ All tests passed!');