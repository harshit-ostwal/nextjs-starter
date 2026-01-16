module.exports = {
    "*.{js,jsx,ts,tsx}": [
        // Format (will fix whitespace/formatting)
        "bun format",
        // Lint (will fix lint issues)
        "bun lint",
        // Add staged file updates after format
        "git add .",
    ],
    "*.js": [
        // additional JS-only lint command (optional)
        "bun lint",
        "git add .",
    ],
};
