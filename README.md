# Description
This is an interactive Node.js console application that solves Tag Checker Problem.

## Dependencies
- Node.js v10 and above
- npm

## Local setup
To run the app, do the following sequence:
<pre><code>npm install  
npm start</code></pre>
    
You will be prompted to enter a paragraph to verify tags in. App is running it the loop, type "exit" to close it.

## Testing
App comes with a set of unit tests and end-to-end tests.
<pre><code># To run unit tests:
npm test 

# To run end-to-end tests:
npm run e2e</code></pre>

## Structure
`index.js` is an entry point. App is split to layers to simplify future modifications - input layer, processing layer and output layer.
