const http = require("http");

namespace OauthJS{
    export class ClientAuthorization extends Authorization{
        public GetAccessToken(client:Client,server:OauthServer):string{
              
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
}