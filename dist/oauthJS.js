var OauthJS;
(function (OauthJS) {
    class Authorize {
        GetAuthorizationHeader(client) {
            var base = new Buffer(`${client.ClientId}:${client.Security}`);
            return base.toString('base64');
        }
        GetRequestHeader(client) {
            return {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${this.GetAuthorizationHeader(client)}`
            };
        }
        GetRequestOptions(client, server) {
            let oauthURL = url.parse(server.AuthorizationUrl);
            return {
                protocol: oauthURL.protocol,
                host: oauthURL.host,
                port: oauthURL.port,
                path: oauthURL.path,
                method: 'Post',
                headers: this.GetRequestHeader(client)
            };
        }
    }
    OauthJS.Authorize = Authorize;
})(OauthJS || (OauthJS = {}));
var OauthJS;
(function (OauthJS) {
    let AuthorizeModel;
    (function (AuthorizeModel) {
        AuthorizeModel[AuthorizeModel["Client"] = 0] = "Client";
        AuthorizeModel[AuthorizeModel["Password"] = 1] = "Password";
    })(AuthorizeModel = OauthJS.AuthorizeModel || (OauthJS.AuthorizeModel = {}));
})(OauthJS || (OauthJS = {}));
var OauthJS;
(function (OauthJS) {
    class Client {
    }
    OauthJS.Client = Client;
})(OauthJS || (OauthJS = {}));
/// <reference path="Authorize.ts" />
var OauthJS;
(function (OauthJS) {
    class ClientAuthorize extends OauthJS.Authorize {
        GetAccessToken(client, server) {
            let postData = this.GetRequestData(client);
            let options = this.GetRequestOptions(client, server);
            return new Promise(function (resolve, reject) {
                let request = https.request(options, response => {
                    response.setEncoding('utf8');
                    response.on('data', (chunk) => {
                        let access_token = JSON.parse(chunk).access_token;
                        resolve(access_token);
                    });
                    response.on('error', (error) => {
                        reject(error);
                    });
                });
                request.on('error', (error) => {
                    reject(error);
                });
                request.write(postData);
                request.end();
            });
        }
        GetAuthorizeCode(client, server) {
            throw new Error("not");
        }
        GetRequestData(client) {
            return querystring.stringify({
                'grant_type': 'client_credentials',
            });
        }
    }
    OauthJS.ClientAuthorize = ClientAuthorize;
})(OauthJS || (OauthJS = {}));
/// <reference path="Authorize.ts" />
var OauthJS;
(function (OauthJS) {
    class CodeAuthorize extends OauthJS.Authorize {
        GetAccessToken(client, server) {
            let postData = this.GetRequestData(client);
            let options = this.GetRequestOptions(client, server);
            // GET /authorize?response_type=code&client_id=s6BhdRkqt3&state=xyz &redirect_uri=https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb HTTP/1.1
            return new Promise(function (resolve, reject) {
                let request = https.request(options, response => {
                    response.setEncoding('utf8');
                    response.on('data', (chunk) => {
                        let access_token = JSON.parse(chunk).access_token;
                        resolve(access_token);
                    });
                    response.on('error', (error) => {
                        reject(error);
                    });
                });
                request.on('error', (error) => {
                    reject(error);
                });
                request.write(postData);
                request.end();
            });
        }
        GetAuthorizeCode(client, server) {
            // let postData = this.GetRequestData(client);
            // let options = this.GetRequestOptions(client, server);
            // GET /authorize?response_type=code&client_id=s6BhdRkqt3&state=xyz &redirect_uri=https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb HTTP/1.1
            let oauthURL = url.parse(server.OauthUrl);
            let options = {
                protocol: oauthURL.protocol,
                host: oauthURL.host,
                port: oauthURL.port,
                path: `oauthURL.path?response_type=code&state=xyz&client_id=${client.ClientId}&redirect_uri=`,
                method: 'Get',
                headers: this.GetRequestHeader(client)
            };
            return new Promise(function (resolve, reject) {
                let request = https.request(options, response => {
                    response.setEncoding('utf8');
                    response.on('data', (chunk) => {
                        let access_token = JSON.parse(chunk).access_token;
                        resolve(access_token);
                    });
                    response.on('error', (error) => {
                        reject(error);
                    });
                });
                request.on('error', (error) => {
                    reject(error);
                });
                //request.write(postData);
                request.end();
            });
        }
        GetRequestData(client) {
            return querystring.stringify({
                'grant_type': 'client_credentials',
            });
        }
    }
    OauthJS.CodeAuthorize = CodeAuthorize;
})(OauthJS || (OauthJS = {}));
var OauthJS;
(function (OauthJS) {
    class Config {
    }
    Config.IsDebug = true;
    OauthJS.Config = Config;
})(OauthJS || (OauthJS = {}));
const https = require("https");
const url = require('url');
const querystring = require('querystring');
var OauthJS;
(function (OauthJS) {
    class OauthClient {
        constructor(oauthServer) {
            this.mOathServer = oauthServer;
        }
        GetAccessToken(authorizationModel, client) {
            if (OauthJS.Config.IsDebug) {
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
            }
            return new OauthJS.CodeAuthorize().GetAccessToken(client, this.mOathServer);
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
/// <reference path="Authorize.ts" />
var OauthJS;
(function (OauthJS) {
    class PasswordAuthorize extends OauthJS.Authorize {
        GetAccessToken(client, server) {
            let postData = this.GetRequestData(client);
            let options = this.GetRequestOptions(client, server);
            return new Promise(function (resolve, reject) {
                let request = https.request(options, response => {
                    response.setEncoding('utf8');
                    response.on('data', (chunk) => {
                        let access_token = JSON.parse(chunk).access_token;
                        resolve(access_token);
                    });
                    response.on('error', (error) => {
                        reject(error);
                    });
                });
                request.on('error', (error) => {
                    reject(error);
                });
                request.write(postData);
                request.end();
            });
        }
        GetAuthorizeCode(client, server) {
            throw new Error("not");
        }
        GetRequestData(client) {
            return querystring.stringify({
                'grant_type': 'password',
                'username': client.Username,
                'password': client.Password,
            });
        }
    }
    OauthJS.PasswordAuthorize = PasswordAuthorize;
})(OauthJS || (OauthJS = {}));
let OauthServer = new OauthJS.OauthServer("https://10.2.165.80/oauth/oauth/Authoriz", "https://10.2.165.80/oauth/oauth/token");
let OauthClient = new OauthJS.OauthClient(OauthServer);
let client = new OauthJS.Client();
client.ClientId = "123456";
client.Username = "Agent_tian";
client.Password = "1qaz2wsxE";
client.Security = "abcdefgh";
OauthClient.GetAccessToken(OauthJS.AuthorizeModel.Client, client).then(function (token) {
    console.log(token);
}, function (error) {
    console.log(error);
});
//# sourceMappingURL=oauthJS.js.map