const {SHA256} = require('crypto-js');
const bcryptjs = require('bcryptjs');

var password = '123abc!';
bcryptjs.genSalt(10,(err,salt)=>{
    bcryptjs.hash(password,salt,(err,hash)=>{
        console.log(hash);
    });
});
var hasedPaasword = '$2a$10$rwJ2ky6TXc7piV4kHm/1qeVPnn/hDIfoFtwIfcLn2Rx/H211Qwdzm';
bcryptjs.compare(password + '111',hasedPaasword,(err,res)=>{
    console.log(res);
})
// const jwt = require('jsonwebtoken');
// var data= {
//     id: 11,
//     sss:"ssssssssss"
// };
// var token = jwt.sign(data, '123abc');
// console.log(token);
// var decoded = jwt.verify(token,'123abc');
// console.log(decoded);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
// console.log(`Message:${message}`);
// console.log(`Hash:${hash}`);

// var data = {
//     id: 4
// };
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
// token.data.id = 5;
// console.log(data);
// console.log(token);
// token.hash = SHA256(JSON.stringify(data) + 'somesecret').toString()

// var resultHash = SHA256(JSON.stringify(token.data )+ 'somesecret').toString();
// if (resultHash === token.hash){
//     console.log('Data was not chenged');
// }else{
//      console.log('Data was  chenged dont trust' );
// }