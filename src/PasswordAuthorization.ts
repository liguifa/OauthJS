const https = require("https");
const url = require('url');
const querystring = require('querystring');

namespace OauthJS {
  export class PasswordAuthorization extends Authorization {
    public GetAccessToken(client: Client, server: OauthServer): string {
      if (Config.IsDebug) {
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
}