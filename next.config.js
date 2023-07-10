/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['@juspay-tech/hyper-js', '@juspay-tech/react-hyper-js']); // pass the modules you would like to see transpiled

module.exports = withTM({});
