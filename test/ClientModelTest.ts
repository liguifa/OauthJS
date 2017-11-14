let OauthServer:OauthJS.OauthServer = new OauthJS.OauthServer("https://10.2.165.80/oauth/oauth/Authoriz","https://10.2.165.80/oauth/oauth/token");
let OauthClient:OauthJS.OauthClient = new OauthJS.OauthClient(OauthServer);
let client:OauthJS.Client = new OauthJS.Client();
client.ClientId = "123456";
client.Username = "Agent_tian";
client.Password = "1qaz2wsxE";
client.Security = "abcdefgh";
OauthClient.GetAccessToken(OauthJS.AuthorizeModel.Client,client).then(function(token){
    console.log(token);
},function(error){
    console.log(error);
});