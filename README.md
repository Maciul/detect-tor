# Detect-Tor

Easy to use library to identify TOR network connection. 

### Usage: 

```js
const detectTor = require( 'detect-tor' ) 
detectTor.isTor( '127.0.0.1' ) // true or false
```
### About

List of exit addresses is automatically updated every 24hrs. 
The list of TOR exit nodes used can be found here: https://check.torproject.org/exit-addresses
### Tests:

npm test