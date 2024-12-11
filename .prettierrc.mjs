/**
 * @type {import('prettier').Options}
 */
export default {
  printWidth: 120,
  trailingComma: "es5",
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  quoteProps: 'consistent',
  jsxSingleQuote: true,
  arrowParens: "avoid",
  endOfLine: "lf",
  plugins: ["prettier-plugin-tailwindcss"]
}
