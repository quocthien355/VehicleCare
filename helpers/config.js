var mysql = require('mysql');
const con = mysql.createConnection({
     host: "103.200.23.189",
     user: "vehiclec_bughunter",
     password: "DATN2023-",
     database: "vehiclec_bughunter"
});

var del = connection._protocol._delegateError;

con._protocol._delegateError = function(err, sequence){
     if (err.fatal) {
       console.trace('fatal error: ' + err.message);
     }
     return del.call(this, err, sequence);
   };
con.connect(function(err) {
if (err) console.error(err);
console.log("Đã kết nối tới database!!!")
});

module.exports = con;