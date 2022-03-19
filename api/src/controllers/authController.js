const User = require("../models/User");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
    "899487434886-uti0ct26ad2f4ahqvfqk7tcgo7tr2l7d.apps.googleusercontent.com"
);

class authController {
    //[POST]/api/auth/register
    async register(req, res) {
        const { username, account, email, password, department } = req.body;

        try {
            //check
            const existingAccount = await User.findOne({ account });
            const existingUserName = await User.findOne({ username });

            if (existingAccount) {
                return res.status(200).json({ message: "Tài khoản đã tồn tại!" });
            } else if (existingUserName) {
                return res.status(200).json({ message: "Tên tài khoản đã tồn tại!" });
            } else {
                //generate new password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                //create new user
                const newUser = new User({
                    username: username,
                    account: account,
                    email: email,
                    password: hashedPassword,
                    departments: [department],
                    isDepartment: true,
                });

                //save user and response
                const user = await newUser.save();
                return res.status(200).json({ message: "Tạo tài khoản thành công." });
            }
        } catch (error) {
            console.log(error);
        }
    }

    //[POST]/api/auth/login
    async login(req, res) {
        const { account, password } = req.body;

        try {
            const user = await User.findOne({ account: account });
            !user &&
                res.status(200).json({ message: "Tài khoản sai vui lòng nhập lại!" });
            const validPass = await bcrypt.compare(password, user.password);
            !validPass &&
                res.status(200).json({ message: "Mật khẩu sai vui lòng nhập lại!" });

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    //[POST]/api/auth/logingoogle
    async loginGoogle(req, res) {
        const { tokenId } = req.body;

        try {
            const resClient = await client.verifyIdToken({
                idToken: tokenId,
                audience: "899487434886-uti0ct26ad2f4ahqvfqk7tcgo7tr2l7d.apps.googleusercontent.com",
            });

            const { email_verified, name, email, picture } = resClient.payload;

            if (email_verified) {
                const user = await User.findOne({ email: email });
                if (user) {
                    res.status(200).json(user);
                } else {
                    if (
                        email.indexOf("@tdtu.edu.vn") !== -1 ||
                        email.indexOf("@student.tdtu.edu.vn") !== -1
                    ) {
                        const newUser = new User({
                            username: name,
                            account: name,
                            email: email,
                            profilePicture: picture,
                            isStudent: true,
                        });

                        //save user and response
                        const userGoogle = await newUser.save();
                        return res.status(200).json(userGoogle);
                    } else {
                        return res
                            .status(200)
                            .json({ message: "Tài khoản không được hỗ trợ!" });
                    }
                }
            }
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    }

    //[PUT]/api/auth/changepassword
    async changePass(req, res) {
        const { account, password, newpassword } = req.body;

        try {
            const accountChange = await User.findOne({ account: account });
            !accountChange &&
                res.status(200).json({ message: "Tài khoản chưa được đăng kí!" });
            const validPass = await bcrypt.compare(password, accountChange.password);
            !validPass &&
                res
                .status(200)
                .json({ message: "Mật khẩu sai vui lòng kiểm tra lại!" });

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newpassword, salt);

            if (accountChange && validPass) {
                await accountChange.updateOne({ password: hashedPassword });
            }

            res.status(200).json({ message: "Thay đổi mật khẩu thành công." });
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new authController();