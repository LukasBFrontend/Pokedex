/** @type {import('prettier').Config} */
export default {
  printWidth: 88,
  objectWrap: 'preserve',
  singleAttributePerLine: true,
  plugins: ['prettier-plugin-multiline-arrays'],
  multilineArraysWrapThreshold: 3,
}
