const User = require('../models/UserModel');
var bcrypt = require('bcrypt');
var middleware = require('../middlewares/upload');
var host = require('../helpers/host');
exports.register = (req, res) => {
  try {
    const { number_phone, password,gender,full_name,image } = req.body;
    if (!number_phone || !password) {
      return res.status(400).json({ error: 'Không được để trống dữ liệu' });
    }
    User.checkUser(number_phone, (error, result) => {
      if (result.length > 0) {
        return res.status(400).json({ success: false, error: 'Số điện thoại đã tồn tại!' });
      } else {
        bcrypt.hash(password, 10, (err, password) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log('Hashed password:', password);
          const user = { number_phone, password,gender,full_name,image };
          console.log('user', user)
          User.register(user, (error, result) => {
            if (error) {
              console.error('Đã có lỗi xảy ra:', error);
              res.status(500).json({ error: 'Đã xảy ra lỗi!' });
            } else {
              res.status(200).json({ message: 'Đăng ký thành công!' });
            }
          });
        });
      }
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Đã xảy ra lỗi!' });
  }
}
exports.login = (req, res) => {
  try {
    const { number_phone, password } = req.body;
    console.log('user', number_phone, password);
    if (!number_phone || !password) {
      return res.status(400).json({ error: 'Không được để trống dữ liệu' });
    }
    User.checkUser(number_phone, (error, result) => {
      if (error) {
        console.error('Đã có lỗi xảy ra:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi!' });
      } else {
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (err, passRes) => {
            if (err) {
              // Handle the error
              console.error(err);
              return;
            }
            if (passRes) {
              User.getOneUser(result[0].id_user, (error, result) => {
                if (error) {
                  console.error('Có lỗi khi lấy user:', error);
                  res.status(500).json({ error: 'Lỗi server' });
                } else {
                  console.log('result', result)
                  res.status(200).json({ message: 'Đăng nhập thành công!', result });
                }
              });
            } else {
              res.status(401).json({ error: 'Mật khẩu không đúng!' });
            }
          });
        } else {
          res.status(400).json({ error: 'Số điện thoại không tồn tại!' });
        }
      }
    })
  } catch (err) {
    console.log("Sự cố", err);
  }
}

exports.updateUser =  (req, res) => {
  try {
    const { number_phone, name, gender, image } = req.body;
    const { id } = req.params;
    const user = {number_phone, name, gender, image}
    User.updateUser(id, user, (error, result) => {
      if (error) {
        console.error('Có lỗi khi update user:', error);
        res.status(500).json({ error: 'Lỗi server' });
      } else {
        res.json({ message: 'Update user thành công!', result});
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Đã xảy ra lỗi!' });
  }
}
exports.getOneUser = (req, res) => {
  try {
    const { id } = req.params;
    User.getOneUser(id, (error, result) => {
      if (error) {
        console.error('Có lỗi khi lấy user:', error);
        res.status(500).json({ error: 'Lỗi server' });
      } else {
        console.log('result', result)
        res.json({ result });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Đã xảy ra lỗi!' });
  }
}

exports.checkUser = (req, res) => {
  try{
    const {number_phone} = req.body;
    User.checkUser(number_phone, (error, result) => {
      if (error) {
        console.error('Có lỗi khi lấy user:', error);
        res.status(500).json({ error: 'Lỗi server' });
      } else {
        console.log('result', result)
        res.json({ result });
      }
    });
  }catch(err){
    console.log(err);
    res.status(500).json({ error: 'Đã xảy ra lỗi!' });
  }
}