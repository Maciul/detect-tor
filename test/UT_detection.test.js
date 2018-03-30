const detectTor = require ( '../lib/detection.js' ).detectTor;
const mockData = require( './mock/mock_data.js' );
const c = require( '../lib/constants.js' );

describe( 'torTest', ()=>{
    let publicIP;
    it( 'should return false if IP is not a tor exit node', () => {
        publicIP = '127.0.0.1';
        expect( detectTor.isTor( publicIP ) ).toBeFalsy();
    } );

    it( 'should return false when IP is undefined', () => {
        publicIP = undefined;
        expect( detectTor.isTor( publicIP ) ).toBeFalsy();
    } );

    it( 'should return false for all other field that were supposed to be parsed out', () => {
        expect( detectTor.isTor( 'ExitAddress' ) ).toBeFalsy();
        expect( detectTor.isTor( 'LastStatus' ) ).toBeFalsy();
        expect( detectTor.isTor( '2018-01-31' ) ).toBeFalsy();
        expect( detectTor.isTor( '07:21:14' ) ).toBeFalsy();
    } );

    it( 'should return false publicIP is an empty string', () => {
        publicIP = '';
        expect( detectTor.isTor( publicIP ) ).toBeFalsy();
    } );

    it( 'should return true when IP is a tor exit node', () => {
        expect( detectTor.isTor( '171.25.193.235' ) ).toBeTruthy();
        expect( detectTor.isTor( '178.17.170.196' ) ).toBeTruthy();
        expect( detectTor.isTor( '5.2.70.160' ) ).toBeTruthy();
        expect( detectTor.isTor( '185.234.218.49' ) ).toBeTruthy();
    } );

    it( 'set interval keeps calling the update function', done => {
        /*
        Mock constant.js file and change setInterval from 24hrs to 0.5 sec.
        This checks if setInterval works properly, check if 127.0.0.1 is initially there (should be false)
        Within a second we should have updated TOR Exit list with 127.0.0.1. (should be true)
        */
        jest.mock( '../lib/constants.js' );
        jest.resetModules();
        let spy = require( 'request' );
        let detectTor2 = require( '../lib/detection.js' ).detectTor;
        let testSetInterval = function () {
            expect( detectTor2.isTor( '127.0.0.1' ) ).toBeTruthy();
            done();
        };
        expect( detectTor2.isTor( '127.0.0.1' ) ).toBeFalsy();
        spy.changeData( { body: '127.0.0.1', statusCode: 200 } );
        setTimeout( testSetInterval, 1000 );
    }, 3000 );
} );