const bcrypt = require('bcrypt');
const employeeModel = require('../models/EmployeeModel');
const SALT_ROUNDS = 10;
var token = require('../helpers/jwt.helper')




exports.register = async (req, res) => {
	try {
		const employee = req.body;
		const phone_number = employee.phone_number.toLowerCase();
		let data = await employeeModel.getEmployee(phone_number);

		// console.log(data);
		if (data[0]) res.status(409).send('Số điện thoại đã tồn tại.');
		else {

			const hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
			const newEmployee = {
				phone_number: phone_number,
				name: employee.name,
				password: hashPassword,
				position: employee.position,
				token: employee.token,
				id_centre: employee.id_centre
			};
			const createEmployee = await employeeModel.createEmployee(newEmployee);
			if (!createEmployee) {
				return res
					.status(400)
					.send('Có lỗi trong quá trình tạo tài khoản, vui lòng thử lại.');
			}
			return res.send({
				phone_number,
			});
		}
	} catch (error) {
		console.log(error.message);
	}
};

exports.login = async (req, res) => {
    try {
        const { phone_number, password } = req.body;
        console.log({ phone_number, password });
        let data = await employeeModel.getEmployee(phone_number);
        data = await JSON.parse(JSON.stringify(data));
        data = data[0];
        console.log(data);
        if (data == undefined) {

            res.cookie("error", 'Incorrect username or password');
            res.redirect('/auth/login')



        } else {
            const isValidatePassword = bcrypt.compareSync(password, data.password);

            if (!isValidatePassword) {
                res.cookie("error", 'Incorrect username or password');
                res.redirect('/auth/login')
            } else {

                // generate token
                const accessTokenSecret =
                    process.env.ACCESS_TOKEN_SECRET;
                const accessTokenLife =
                    process.env.ACCESS_TOKEN_LIFE;

                const dataForAccessToken = {
                    number_phone: data._phone_number,
                };
                const accessToken = await token.generateToken(
                    dataForAccessToken,
                    accessTokenSecret,
                    accessTokenLife,
                );

                if (!accessToken) {

                    res.cookie("error", " Login fail, try again!!");
                    res.redirect('/auth/login')
                } else {

                    let result = await employeeModel.updateRefreshToken(accessToken, phone_number);
                    //    console.log(result);
                    res.cookie("access_token", accessToken)
                    res.cookie("user", data)
                    res.redirect('/')
                }

            }
        }

    } catch (error) {
        console.log("err: " + error.message);
        res.cookie("error", " Login fail,try again!!");
        res.redirect('/auth/login')
    }
}
exports.logout = async (req, res) => {
	return res
		.clearCookie("access_token")
		.status(200).redirect('/auth/login');
}
