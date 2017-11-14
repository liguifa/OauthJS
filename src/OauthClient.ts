namespace OauthJS {
    export class OauthClient {
        private mOathServer: OauthServer;

        public constructor(oauthServer: OauthServer) {
            this.mOathServer = oauthServer;
        }

        public GetAccessToken(authorizationModel: AuthorizeModel, client: Client): Promise<string> {
            if (Config.IsDebug) {
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
            }
            return new CodeAuthorize().GetAccessToken(client, this.mOathServer)
        }
    }
}