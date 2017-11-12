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
    })(AuthorizationModel = OauthJS.AuthorizationModel || (OauthJS.AuthorizationModel = {}));
})(OauthJS || (OauthJS = {}));
var OauthJS;
(function (OauthJS) {
    class Client {
    }
    OauthJS.Client = Client;
})(OauthJS || (OauthJS = {}));
const http = require("http");
var OauthJS;
(function (OauthJS) {
    class ClientAuthorization extends OauthJS.Authorization {
        GetAccessToken(client, server) {
            const options = {
                hostname: 'www.google.com',
                port: 80,
                path: `https://myleo.rp.edu.sg/oauth/oauth/Authoriz?grant_type=password&username=${client.Username}&password=${client.Password}`,
                method: 'get',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            };
            const req = http.request(options, (res) => {
                console.log(`状态码: ${res.statusCode}`);
                console.log(`响应头: ${JSON.stringify(res.headers)}`);
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    console.log(`响应主体: ${chunk}`);
                });
                res.on('end', () => {
                    console.log('响应中已无数据。');
                });
            });
            req.on('error', (e) => {
                console.error(`请求遇到问题: ${e.message}`);
            });
            req.end();
            return "";
        }
    }
    OauthJS.ClientAuthorization = ClientAuthorization;
})(OauthJS || (OauthJS = {}));
var OauthJS;
(function (OauthJS) {
    class OauthClient {
        constructor(oauthServer) {
            this.mOathServer = oauthServer;
        }
        GetAccessToken(authorizationModel, client) {
            return new OauthJS.ClientAuthorization().GetAccessToken(client, this.mOathServer);
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
let OauthServer = new OauthJS.OauthServer("https://myleo.rp.edu.sg/oauth/oauth/Authoriz", "https://myleo.rp.edu.sg/oauth/oauth/token");
let OauthClient = new OauthJS.OauthClient(OauthServer);
let client = new OauthJS.Client();
client.ClientId = "123456";
client.Username = "Agent_tian";
client.Password = "1qaz2wsxE";
OauthClient.GetAccessToken(OauthJS.AuthorizationModel.Client, client);
//# sourceMappingURL=oauthJS.js.map