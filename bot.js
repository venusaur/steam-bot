//Modules
const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
//const SteamCommunity = require('steamcommunity');

//const community = new SteamCommunity();
const config = require('./config.json');
var client = new SteamUser();


client.logOn({
	accountName: config.username,
	password: config.password,
  //twoFactorCode: SteamTotp.generateAuthCode(config.sharedSecret)
});

// steam login
console.log('Logging on to steam....');

client.on('loggedOn', function(details) {
	console.log("Logged into Steam as " + client.steamID.getSteam3RenderedID());
	client.setPersona(SteamUser.EPersonaState.Online);
    client.gamesPlayed("Cool Test Bot");
});


client.on('webSession', (sessionid, cookies) => {
    manager.setCookies(cookies);

    community.setCookies(cookies);
    community.startConfirmationsChecker(20000, config.identity);
});

client.on('friendRelationship', (steamid, relationship) => {
    if (relationship === 2) {
      client.addFriend(steamid);
      client.chatMessage(steamid, 'Hello there! Thanks for adding me!');
    }
  });
