'use strict';

const c = require( './constants.js' );
const request = require( 'request' );
const isValidIPAddress = require( 'net' ).isIP;

module.exports.detectTor = function detectTor() {
    let torExitNodes;
    update();
    setInterval( update, c.TWENTYFOUR_HOURS );

    function isTor( IP ) {
        if ( torExitNodes ) {
            return torExitNodes[IP] === true;
        } else {
            console.error( 'detectTor.isTor: List of TOR exit nodes unavailable... request still in progress?' );
        }
    }
    function update() {
        const options = {
            uri: c.TOR_EXIT_NODE_URI,
            strictSSL: true
        };
        const arrayToHashMap = ( listofIPs, IP ) => {
            if ( isValidIPAddress( IP ) ) {
                listofIPs[IP] = true;
            }
            return listofIPs;
        };

        request( options, function( error, data ) {
            if ( error ) {
                console.error( 'message: detectTor.update: ' + error );
            } else if ( data && data.body && data.statusCode === 200 ) {
                data = data.body;
                torExitNodes = data.split( ' ' ).reduce( arrayToHashMap, {} );
            }
        } );
    }
    return {
        isTor
    };
}();