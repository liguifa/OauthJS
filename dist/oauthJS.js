var OauthJS;
(function (OauthJS) {
    class Authorization {
    }
    OauthJS.Authorization = Authorization;
})(OauthJS || (OauthJS = {}));
var OauthJS;
(function (OauthJS) {
    let AuthorizationModel;
    (function (AuthorizationModel) {
        AuthorizationModel[AuthorizationModel["Client"] = 0] = "Client";
        AuthorizationModel[AuthorizationModel["Password"] = 1] = "Password";
    })(AuthorizationModel = OauthJS.AuthorizationModel || (OauthJS.AuthorizationModel = {}));
})(OauthJS || (OauthJS = {}));
var OauthJS;
(function (OauthJS) {
    class Client {
    }
    OauthJS.Client = Client;
})(OauthJS || (OauthJS = {}));
var OauthJS;
(function (OauthJS) {
    class Config {
    }
    Config.IsDebug = true;
    OauthJS.Config = Config;
})(OauthJS || (OauthJS = {}));
var OauthJS;
(function (OauthJS) {
    class OauthClient {
        constructor(oauthServer) {
            this.mOathServer = oauthServer;
        }
        GetAccessToken(authorizationModel, client) {
            return new OauthJS.PasswordAuthorization().GetAccessToken(client, this.mOathServer);
        }
    }
    OauthJS.OauthClient = OauthClient;
})(OauthJS || (OauthJS = {}));
var OauthJS;
(function (OauthJS) {
    class OauthServer {
        constructor(oauthUrl, authorizationUrl) {
            if (!/http[s]+?:\/\/.?/.test(oauthUrl)) {
                throw new Error("OAuth URL format error.");
            }
            if (!/http[s]+?:\/\/.?/.test(authorizationUrl)) {
                throw new Error("Authorization URL format error.");
            }
            this.mOauthUrl = oauthUrl;
            this.mAuthorizationUrl = authorizationUrl;
        }
        get OauthUrl() {
            return this.mOauthUrl;
        }
        get AuthorizationUrl() {
            return this.mAuthorizationUrl;
        }
    }
    OauthJS.OauthServer = OauthServer;
})(OauthJS || (OauthJS = {}));
const https = require("https");
const url = require('url');
const querystring = require('querystring');
var OauthJS;
(function (OauthJS) {
    class PasswordAuthorization extends OauthJS.Authorization {
        GetAccessToken(client, server) {
            if (OauthJS.Config.IsDebug) {
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
            }
            var base = new Buffer(`${client.ClientId}:${client.Security}`);
            var authorization = base.toString('base64');
            const oauthURL = url.parse(server.AuthorizationUrl);
            const options = {
                protocol: oauthURL.protocol,
                host: oauthURL.host,
                port: oauthURL.port,
                path: oauthURL.path,
                method: 'Post',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Basic ${authorization}`
                }
            };
            const req = https.request(options, (res) => {
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    let access_token = JSON.parse(chunk).access_token;
                    console.log(access_token);
                });
            });
            const postData = querystring.stringify({
                'grant_type': 'password',
                'username': client.Username,
                'password': client.Password,
            });
            req.write(postData);
            req.end();
            return "";
        }
    }
    OauthJS.PasswordAuthorization = PasswordAuthorization;
})(OauthJS || (OauthJS = {}));
let OauthServer = new OauthJS.OauthServer("https://myleo.rp.edu.sg/oauth/oauth/Authoriz", "https://myleo.rp.edu.sg/oauth/oauth/token");
let OauthClient = new OauthJS.OauthClient(OauthServer);
let client = new OauthJS.Client();
client.ClientId = "123456";
client.Username = "Agent_tian";
client.Password = "1qaz2wsxE";
OauthClient.GetAccessToken(OauthJS.AuthorizationModel.Client, client);
//# sourceMappingURL=oauthJS.js.map