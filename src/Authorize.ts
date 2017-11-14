namespace OauthJS {
    export abstract class Authorize {
        public abstract GetAccessToken(client: Client, server: OauthServer): Promise<string>;

        public abstract GetAuthorizeCode(client: Client, server: OauthServer): Promise<string>;

        protected GetAuthorizationHeader(client: Client): string {
            var base = new Buffer(`${client.ClientId}:${client.Security}`);
            return base.toString('base64');
        }

        protected GetRequestHeader(client: Client): any {
            return {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Basic ${this.GetAuthorizationHeader(client)}`
            }
        }

        protected GetRequestOptions(client: Client, server: OauthServer): any {
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
}