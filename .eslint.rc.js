module.exports = {
  "extends": "airbnb",
  "globals": {
    "beforeEach": true,
    "describe": true,
    "document": true,
    "global": true,
    "it": true,
    "window": true,
  },
  "rules": {
    "function-paren-newline": ["warn", "consistent"],
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "to" ],
      "aspects": [ "noHref", "invalidHref", "preferButton" ]
    }],
    "react/jsx-filename-extension": [
      "warn",
      { "extensions": [".js", ".jsx"] },
    ],
    "react/no-find-dom-node": "warn",
  },
};
