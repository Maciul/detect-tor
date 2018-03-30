'use strict';
let resFromTorProject = require( '../test/mock/mock_data.js' ).bodyFromTorProject;
console.log( resFromTorProject )
let dataObj = { body: resFromTorProject, statusCode: 200 };

let request = jest.fn( ( error, fn )=>{
    fn( null, dataObj );
} );

request.changeData = function ( otherObj ) {
    dataObj = otherObj;
    console.log( otherObj )
};

module.exports = request;