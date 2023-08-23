var mysql = require('mysql');
const con = mysql.createConnection({
     host: "103.200.23.189",
     user: "vehiclec_bughunter",
     password: "DATN2023-",
     database: "vehiclec_bughunter"
});
con.connect(function(err) {
if (err) console.error(err);
console.log("Đã kết nối tới database!!!")
});

module.exports = con;