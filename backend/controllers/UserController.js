const { select } = require("underscore");

exports.register = async (req, res) => {
  try {
    req.body = __._form(req.body);

    // Validate Form
    const required = ["name", "email", "password"];
    const validate = __._checkFields(req.body, required);
    if (validate !== true) throw new Error(validate.message);

    // Check Email is Exits
    const condition = {
      email: req.body.email.toLowerCase(),
    };

    const options = {
      select: "email",
    };

    const isExistUser = await Model._findOne(_User, condition, options);
    if (isExistUser)
      throw new Error(`${isExistUser.email} is already associated with us!`);

    // Create new User

    req.body.password = __._hashPass(req.body.password);
    req.body.token = randomString.generate(100);

    // Remove critical fields
    delete req.body.created_at;
    delete req.body.updated_at;

    const user = await Model._create(_User, req.body);
    if (!user)
      throw new Error(
        "oops! Failed to register your account! Please try again."
      );

    // Return Created User
    const token = JWT.sign(
      {
        user: user._id,
      },
      CONFIG.SECRET_KEY
    );

    // Send OTP

    __.res(res, await __.authResponse(user, token), 200);
  } catch (error) {
    __.res(res, error.message, 500);
  }
};

// Login

exports.login = async (req, res) => {
  try {
    const required = ["email", "password"];
    const validate = __._checkFields(req.body, required);
    if (validate !== true) throw new Error(validate.message);

    const condition = {
      email: req.body.email.toLowerCase(),
    };

    const user = await Model._findOne(_User, condition, {});

    if (!user) throw new Error(`${req.body.email} is not  associated with us!`);

    if (!__._comparPass(req.body.password, user.password))
      throw Error("Your password is incorrect!");

    const token = JWT.sign(
      {
        user: user._id,
      },
      CONFIG.SECRET_KEY
    );

    __.res(res, await __.authResponse(user, token), 200);
  } catch (error) {
    __.res(res, error.message, 500);
  }
};

// Get User

exports.getProfile = async (req, res) => {
  try {
    // Validate Form
    const condition = {
      _id: req.Auth._id,
    };

    const options = {
      select: "-password -token",
    };

    if (req.body.fields) {
      options.select = req.body.fields.split("password").join("");
    }

    const user = await Model._findOne(_User, condition, options);
    if (!user) throw new Error(`User not found!`);

    __.res(res, user, 200);
  } catch (error) {
    __.res(res, error.message, 500);
  }
};


exports.getAllUsers = async (req, res) => {

  try {

    const condition = {
      email: req.body.email
    };
    const options = {
      select: "name email",
    };

    const user = await Model._find(_User, condition, options);
    if (!user) {

      throw new Error('User table empty')

    }
    __.res(res, user, 200);

  } catch (error) {

    __.res(res, error.message, 500);

  }

}


// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const NOT_ALLOW_UPDATE = [
      "password",
      "token",
      "status",
      "created_at",
      "updated_at",
      "_id",
    ];

    const condition = {
      _id: req.Auth._id,
    };

    const user = await Model._findOne(_User, condition, {}, false);
    if (!user)
      throw new Error("Oops! Failed to update your profile! Please try again");

    if (
      Object.keys(req.body).indexOf("email") !== -1 &&
      user.email !== req.body.email
    ) {
      const isExistUser = await Model._findOne(_User, {
        _id: { $ne: user._id },
        email: req.body.email,
      });
      if (isExistUser)
        throw new Error(`${isExistUser.email} is already associated with us!`);
    }

    Object.keys(req.body).forEach((key) => {
      if (NOT_ALLOW_UPDATE.indexOf(key) == -1) {
        user[key] = req.body[key];
      }
    });


    await user.save();
    __.res(res, await __.authResponse(user), 200);
  } catch (error) {
    __.res(res, error.message, 500);
  }
};

// Change Password

exports.changePassword = async (req, res) => {
  try {
    // Validate Form
    const required = ["oldPassword", "newPassword"];
    const validate = __._checkFields(req.body, required);
    if (validate !== true) throw new Error(validate.message);

    //Get User
    const user = await Model._findOne(_User, { _id: req.Auth._id }, {}, false);
    if (!user) throw new Error(`This user is not found!`);

    if (!__._comparPass(req.body.oldPassword, user.password))
      throw new Error(
        "Your old password is invalid! Please enter valid password"
      );

    user.password = __._hashPass(req.body.newPassword);
    await user.save();

    __.res(res, "Your password has been changed successfully.", 200);
  } catch (error) {
    __.res(res, error.message, 500);
  }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const required = ["email"];
    const validate = __._checkFields(req.body, required);
    if (validate !== true) throw new Error(validate.message);

    let condition = {
      email: req.body.email,
    };
    const user = await Model._findOne(_User, condition, {
      select: "email name",
    });

    if (!user) throw new Error("Oops! This email is not associated with us.");

    // Send Mail

    const otp = randomString.generate({
      length: 6,
      charset: "numeric",
    });

    const mail = {
      to: `${user.email}`,
      subject: "Forgot password",
      template: "password-link.html",
      context: {
        subject: "Forgot password",
        user: user.name,
        otp: otp,
      },
    };

    var mailResponse = await _Mail(mail);
    console.log("mailResponse", mailResponse);

    const otpData = {
      user: user,
      otp: otp,
    };

    const OtpData = await Model._create(_OTP, otpData);
    if (!OtpData) throw new Error("Oops! OTP not save. please try again");

    __.res(res, {
      message: 'OTP has been sent to your email! Please check your inbox or spam',
      user: user
    }, 200);
  } catch (error) {
    __.res(res, error.message, 500);
  }
};

// Reset password

exports.resetPassword = async (req, res) => {
  try {
    // if (req.body.otp != '123') throw Error('Invalid OTP');

    const required = ["user", "password", "otp"];

    const validate = __._checkFields(req.body, required);
    if (validate !== true) throw new Error(validate.message);

    const condition = {
      user: req.body.user,
      status: 0,
    };

    const options = {
      sort: "-_id",
    };

    const verifyData = await Model._findOne(_OTP, condition, options, false);
    if (!verifyData || verifyData.otp != req.body.otp)
      throw new Error(
        "Sorry, the OTP you have entered is invalid. Please try again with the correct OTP."
      );

    verifyData.status = 1;
    verifyData.updated_at = Date.now();
    await verifyData.save();

    const user = await Model._findOne(_User, { _id: req.body.user }, {}, false);
    if (!user) throw new Error("Oops! Token expired");
    user.password = __._hashPass(req.body.password);
    await user.save();

    __.res(res, "Password reset successfully", 200);
  } catch (error) {
    __.res(res, error.message, 500);
  }
};

exports.otpVerifies = async (req, res) => {
  try {

    const required = ["user", "otp"];
    const validate = __._checkFields(req.body, required);
    if (validate != true) throw new Error(validate.message);
    const condition = {
      user: req.body.user,
      status: 0,
    };

    const options = {
      sort: "-_id",
    };

    const verifyData = await Model._findOne(_OTP, condition, options, false);
    if (!verifyData) throw new Error("Invalid OTP");
    if (verifyData.otp != req.body.otp) throw new Error("Invalid OTP");

    verifyData.status = 1;
    verifyData.updated_at = Date.now();
    verifyData.save();

    const user = await Model._findOne(
      _User,
      { _id: req.body.user },
      { select: "name email status updated_at" },
      false
    );

    if (!user) throw new Error("Oops! Something else wrong. user is not found");

    await user.save();

    __.res(res, user, 200);
  } catch (error) {
    __.res(res, error.message, 500);
  }
};


exports.getArticles = async (req, res) => {
  try {

    const condition = {
      status: 'Active'
    };

    const options = {
      sort: {
        _id: -1
      },
      limit: +req.body.limit || 10,
      skip: +req.body.skip || 0,
      select: '-fullDescriptions'
    }

    const articles = await Model._find(_Article, condition, options);
    console.log('articles', articles)

    __.res(res, articles, 200)

  } catch (error) {
    __.res(res, error.message, 500)
  }
}

exports.getArticleDetails = async (req, res) => {
  try {

    const condition = {
      status: 'Active',
      _id: req.body._id
    };

    const options = {}

    const article = await Model._findOne(_Article, condition);

    __.res(res, article, 200)

  } catch (error) {
    __.res(res, error.message, 500)
  }
}


exports.getBanner = async (req, res) => {
  try {
   
    const condition = {
      country: req.body.country || 'All'
    };

    const options = {
      sort: {
        _id: -1
      },
    }

    const banner = await Model._findOne(_Banners, condition, options);

    __.res(res, banner, 200)

  } catch (error) {
    __.res(res, error.message, 500)
  }
}


