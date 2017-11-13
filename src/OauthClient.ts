namespace OauthJS{
    export class OauthClient{
        private mOathServer:OauthServer;

        public constructor(oauthServer:OauthServer){
            this.mOathServer = oauthServer;
        }

        public GetAccessToken(authorizationModel:AuthorizationModel,client:Client):string{
            return new PasswordAuthorization().GetAccessToken(client,this.mOathServer);
        }
    }
}