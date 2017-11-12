namespace OauthJS{
    export class OauthServer{
        private mOauthUrl:string;
        get OauthUrl():string{
            return this.mOauthUrl;
        }

        private mAuthorizationUrl:string;
        get AuthorizationUrl():string{
            return this.mAuthorizationUrl;
        }

        public constructor(oauthUrl:string,authorizationUrl:string){
            if(!/http[s]+?:\/\/.?/.test(oauthUrl)){
                throw new Error("OAuth URL format error.");
            }
            if(!/http[s]+?:\/\/.?/.test(authorizationUrl)){
                throw new Error("Authorization URL format error.");
            }
            this.mOauthUrl = oauthUrl;
            this.mAuthorizationUrl = authorizationUrl;
        }
    }
}