const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");

const theme = {
  colors: {
    bck: "#2C2F33",
    defaultText: "#2C2F33",
    lightText: "#2C2F33",
    lightBck: "#2C2F33",
    superLightBack: "#2C2F33",
    border: "#2C2F33",
    borderOnDark: "#2C2F33",
    darkBck: "#2C2F33",
    superDarkBck: "#2C2F33",
    love: "#2C2F33",
    primary: "#2C2F33",
    primaryHover: "#2C2F33",
    success: "#2C2F33",
    successBorder: "#2C2F33",
    lightSuccess: "#2C2F33",
    error: "#2C2F33",
    lightError: "#2C2F33",
    warning: "#2C2F33",
  },
};

AdminBro.registerAdapter(AdminBroMongoose);

function HashPassword() {
  return {
    before: async (request) => {
      console.log("request.payload", request.payload);

      if (request.payload.password) {
        if (
          request.payload.password.length < 40 &&
          request.payload.password.length > 0
        ) {
          request.payload = {
            ...request.payload,
            password: __._hashPass(request.payload.password),
          };

          console.log("request.payload", request.payload);
        }
      }
      return request;
    },
  };
}

function handleEditor() {
  return {
    before: async (request) => {
      console.log("request.payload", request.payload);
      return request;
    },
  };
}

const adminBro = new AdminBro({
  branding: {
    logo: ``,
    companyName: "OddsRun  | Admin",
    softwareBrothers: false,
    theme: theme,
  },
  locale: {
    translations: {
      labels: {
        loginWelcome: "",
      },
      messages: {
        loginWelcome: "",
      },
    },
  },
  dashboard: {
    handler: async () => {},
    component: AdminBro.bundle("../admin/Dashboard"),
  },
  database: [mongoose],
  resources: [
    {
      resource: _User,

      options: {
        parent: {
          name: "Menu",
        },
        listProperties: ["createdAt", "name", "email"],
        actions: {
          new: HashPassword(),
          show: { showInDrawer: true },
          edit: { ...HashPassword(), showInDrawer: true },
        },
      },
    },
    {
      resource: _Article,
      options: {
        parent: {
          name: "Menu",
        },
        listProperties: [
          "createdAt",
          "image",
          "title",
          "sortDesccription",
          "status",
        ],
        properties: {
          fullDescriptions: {
            type: "richtext",
          },
          image: {
            components: {
              edit: AdminBro.bundle("../admin/ImageUploader"),
              show: AdminBro.bundle("../admin/ShowImage"),
              list: AdminBro.bundle("../admin/ShowImage"),
            },
            custom: {
              fileUpload: {},
              fileList: {},
              fileShow: {},
              multiple: false,
            },
          },
        },
      },
    },
    {
      resource: _Bookies,
      options: {
        parent: {
          name: "Menu",
        },
        listProperties: [
          "bookieName",
          "URL",
        ],
      },
    },
    {
      resource: _Banners,
      options: {
        parent: {
          name: "Menu",
        },
        listProperties: ["country", "image", "status"],
        properties: {
          country: {
            type: "text",
          },
          image: {
            components: {
              edit: AdminBro.bundle("../admin/ImageUploader"),
              show: AdminBro.bundle("../admin/ShowImage"),
              list: AdminBro.bundle("../admin/ShowImage"),
            },
            custom: {
              fileUpload: {},
              fileList: {},
              fileShow: {},
              multiple: false,
            },
          },
        },
      },
    },
    {
      resource: _Cron,
      options: {
        parent: {
          name: "Menu",
        },
        listProperties: [
          "sport",
          "totalNumberOfMatches",
          "intervalInMinutes",
          "lastUpdatedOdds",
          "totalAPICalls",
          "status",
        ],
        actions: {
          new: true,
          show: { showInDrawer: true },
          edit: { showInDrawer: true },
        },
      },
    },
    {
      resource: _Bookmakers,
      options: {
        parent: {
          name: "Menu",
        },
        listProperties: ["country", "fullDescriptions"],
        properties: {
          country: {
            type: "text",
          },
          fullDescriptions: {
            type: "richtext",
          },
        },
        actions: {
          new: {
            before: async (request) => {
              console.log("request.payload", request.payload);
              return request;
            },
          },
        },
      },
    },
    {
      resource: _LeagueContent,
      options: {
        parent: {
          name: "Menu",
        },
        listProperties: ["sport", "country", "league"],
        actions: {
          new: handleEditor(),
          show: { showInDrawer: false },
          edit: { ...handleEditor(), showInDrawer: false },
        },
        properties: {
          fullDescriptions: {
            type: "richtext",
          },
        },
      },
    },
  ],
  rootPath: "/master",
  loginPath: "/master/login",
  logoutPath: "/master/login",
});

// const routerX = AdminBroExpress.buildRouter(adminBro);
const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    if (email == "admin@oddsrun.com" && password == "MasterPass@2024") {
      return {
        email: "admin@oddsrun.com",
        name: "Admin",
      };
    }

    return false;

    // return await AdminController.login(email, password)
  },
  cookiePassword:
    "dsfsdgg^&*^%%&%*%gerge&*%*%ergergerg%VDWVD&*BDDWD%BD+_DWDJB1231241",
});

module.exports = router;
