var con = require('../helpers/config');
const User ={
   getOneUser: (id, callback) => {
      const query = 'SELECT u.id_user, u.number_phone, u.gender, u.full_name, u.image FROM user u WHERE u.id_user = ?';
      return con.query(query, id, callback);
   },
   checkUser: (number_phone,callback) => {
      const query = 'SELECT * FROM user WHERE number_phone = ?';
      return con.query(query, [number_phone], callback);
   },
   register: (user, callback) => {
      const {number_phone,password,gender,full_name,image} = user;
      const query = 'INSERT INTO user (number_phone,password,gender,full_name,image) VALUES (?)';
      const values = [number_phone,password,gender,full_name,image];
      return con.query(query, [values], callback);
   },
   updateUser: (id, user, callback) => {
      const {number_phone,name,gender,image} = user;
      query = 'UPDATE user SET number_phone = ?, name = ?, gender = ?, image = ? WHERE id_user = ?';
      const values = [number_phone,name,gender,image,id];
      return con.query(query, values, callback);
   }
};
module.exports = User;