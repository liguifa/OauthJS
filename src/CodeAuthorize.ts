/// <reference path="Authorize.ts" />

namespace OauthJS {
    export class CodeAuthorize extends Authorize {
      public GetAccessToken(client: Client, server: OauthServer): Promise<string> {
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
          request.on('error',(error)=>{
            reject(error);
          })
          request.write(postData);
          request.end();
        });
      }

      public GetAuthorizeCode(client: Client, server: OauthServer): Promise<string>{
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
          request.on('error',(error)=>{
            reject(error);
          })
          //request.write(postData);
          request.end();
        });
      }
  
      private GetRequestData(client: Client): any {
        return querystring.stringify({
          'grant_type': 'client_credentials',
        });
      }
    }
  }