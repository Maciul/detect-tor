# Detect-Tor

Easy to use library to identify TOR network connection. 

### Usage Example: 

```js
const detectTor = require( 'detect-tor' ) 

function testTor() {
    console.log( detectTor.isTor( '127.0.0.1' ) ) // true or false    
}

require( 'http' )
    .createServer( testTor )
    .listen( 8000 )
    .once( 'listening', ()=> console.log( 'Tor detection server enabled on ' + 8000 ) );
```

curl localhost:8000 

### About

List of exit addresses is automatically updated every 24hrs. 
The list of TOR exit nodes used can be found here: https://check.torproject.org/exit-addresses
### Tests:

npm test