module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "script", 
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "semi": ["error", "always"]
    }
  }
];
