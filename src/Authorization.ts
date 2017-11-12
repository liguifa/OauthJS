namespace OauthJS{
    export abstract class Authorization{
        public abstract GetAccessToken(client:Client,server:OauthServer):string
    }
}