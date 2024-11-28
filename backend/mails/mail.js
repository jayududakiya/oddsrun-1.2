var nodemailer = require("nodemailer");
var handlebars = require("handlebars");
var layouts = require("handlebars-layouts");

var fs = require("fs");

const EMAIL = "sendingmailhere";
const PASSWORD = "realpasshere";
const FROM_EMAIL = EMAIL;

handlebars.registerHelper(layouts(handlebars));
handlebars.registerPartial(
  "layout",
  fs.readFileSync(path.join(__dirname, "templates/layout.hbs"), "utf8")
);

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  requireTLS: true,
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
});

module.exports = options => {
  new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, "./templates/" + options.template),
      { encoding: "utf-8" },
      (err, html) => {
        if (err) {
          reject(err);
        } else {
          resolve(html);
        }
      }
    );
  })
    .then(html => {
      var template = handlebars.compile(html);
      options.context.logo = CONFIG.BASE_URL + "assets/images/logo.jpeg";
      var htmlToSend = template(options.context);
      var FROM = `OddsRun	 <${FROM_EMAIL}>`;

      let mailOptions = {
        from: FROM,
        to: options.to,
        subject: options.subject,
        html: htmlToSend
      };

      transporter.sendMail(mailOptions, function(err, info) {
        if (err) console.error(err);
        else console.log(info);
      });
    })
    .catch(err => {
      console.error(err);
    });
};
