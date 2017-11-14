/// <reference path="Authorize.ts" />

namespace OauthJS {
  export class ClientAuthorize extends Authorize {
    public GetAccessToken(client: Client, server: OauthServer): Promise<string> {
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
        request.on('error',(error)=>{
          reject(error);
        })
        request.write(postData);
        request.end();
      });
    }

    public GetAuthorizeCode(client: Client, server: OauthServer): Promise<string>{
        throw new Error("not");
    }

    private GetRequestData(client: Client): any {
      return querystring.stringify({
        'grant_type': 'client_credentials',
      });
    }
  }
}