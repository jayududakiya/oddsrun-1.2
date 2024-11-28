var bcrypt = require("bcryptjs");

var saltRounds = 10;
module.exports = {
  _checkFields: function (body, required, skip = []) {
    for (var i = 0; i < required.length; i++) {
      if (Object.keys(body).indexOf(required[i]) === -1) {
        return {
          is_valid: false,
          message: required[i] + " is required.",
        };
      }
    }

    for (var i = 0; i < Object.keys(body).length; i++) {
      var field = Object.keys(body)[i];
      if (body[field] == null) {
        body[field] = "";
      }
      if (
        body[field].toString().trim() == "" &&
        field !== "image" &&
        required.indexOf(field) !== -1
      ) {
        return {
          is_valid: false,
          message: field + " is required.",
        };
      }

      if (
        field == "email" &&
        required.indexOf(field) !== -1 &&
        !this._validateEmail(body[field].toString().trim())
      ) {
        return {
          is_valid: false,
          message: "Please enter valid email address.",
        };
      }
    }

    return true;
  },
  res: function (res, message, status, is_api = true) {
    if (status !== 200) {
      if (message == "default")
        message = "Oops! something went wrong,Please try again.";
      var response = {
        status: 0,
        code: status,
        data: message,
      };
      if (is_api) {
        res.send(JSON.stringify(response)).status(200);
      } else {
        res.status(status).send(message);
      }
      return;
    }
    var response = {
      status: 1,
      code: status,
      data: message,
    };
    if (is_api) {
      res.send(JSON.stringify(response)).status(200);
    } else {
      res.send(message).status(status);
    }
    return;
  },
  _hashPass: function (pass) {
    return bcrypt.hashSync(pass, 10);
  },
  _comparPass: function (pass, hash) {
    return bcrypt.compareSync(pass, hash);
  },
  _form: function (body) {
    Object.keys(body).forEach((key) => {
      if (typeof body[key] === "string") {
        body[key] = body[key].replace(/<[^>]*>/g, "");
      }
    });
    return body;
  },
  _validateEmail: function (email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  authResponse: async function (user, token = false) {
    let response = {
      _id: user._id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
    if (token) {
      response.token = token;
    }
    return response;
  },
  ext: function (name) {
    var ext = name.split(".");
    return ext[ext.length - 1];
  },
  verifyToken: async function (req) {
    try {
      var token = req.header(CONFIG.AUTH_HEADER);
      console.info(req.header(CONFIG.AUTH_HEADER));

      if (!token) {
        throw new Error("You must login first.");
      }
      var decoded = JWT.verify(token, CONFIG.SECRET_KEY);

      req.authID = decoded.user;
      const user = await Model._findOne(_User, { _id: req.authID });
      if (!user) throw new Error("Not Authenticated!");

      req.Auth = {
        _id: user._id,
        email: user.email,
        token: user.token,
        name: user.name,
        phone: user.phone,
      };
      return true;
    } catch (err) {
      return false;
    }
  },
  verifyTokenAgent: async function (req) {
    try {
      var token = req.header(CONFIG.AUTH_HEADER_AGENT);

      if (!token) {
        throw new Error("You must login first.");
      }
      var decoded = JWT.verify(token, CONFIG.SECRET_KEY);
      // console.log('decoded',decoded.user)
      req.authID = decoded.user;
      const agent = await Model._findOne(_Agent, { _id: req.authID });
      if (!agent) throw new Error("Not Authenticated!");

      const orientation = await Model._findOne(_Orientation, {
        agent: req.authID,
      });
      // console.log('orientation',orientation)
      // && orientation.status == 'Completed'
      if (orientation) {
        agent.orientation = orientation.status;
      } else {
        agent.orientation = null;
      }
      req.Auth = await this.authAgentResponse(agent);

      return true;
    } catch (err) {
      return false;
    }
  },

  hotMatches: async function (condition) {
    try {
      const options = {
        limit: 50,
      };

      const searchResult = await Model._find(_Matches, condition, options);
      return searchResult;
    } catch (error) {
      return false;
    }
  },
  stringToSlug: (str) => {
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str;
  },

  slugToString: (slug) => {

    var words = slug.split('-');

    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }
    console.log('words.join', words.join(' '));

    return words.join(' ');

  }
};
