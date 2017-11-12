let OauthServer:OauthJS.OauthServer = new OauthJS.OauthServer("https://myleo.rp.edu.sg/oauth/oauth/Authoriz","https://myleo.rp.edu.sg/oauth/oauth/token");
let OauthClient:OauthJS.OauthClient = new OauthJS.OauthClient(OauthServer);
let client:OauthJS.Client = new OauthJS.Client();
client.ClientId = "123456";
client.Username = "Agent_tian";
client.Password = "1qaz2wsxE";
OauthClient.GetAccessToken(OauthJS.AuthorizationModel.Client,client);