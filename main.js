// Top 10 Twitch Users by Followers https://socialblade.com/twitch/top/10/followers
var top10TwitchUsers = ["syndicate", "riotgames", "captainsparklez", "LIRIK", "PhantomL0rd", "summit1g", "esl_csgo", "Nightblue3", "sodapoppin", "goldglove"];

function getStreamersStatus() {
	top10TwitchUsers.forEach(function(username) {
		function makeURL(type, name) {
			return 'https://api.twitch.tv/kraken/' + type + '/' + name;
		}
		$.getJSON(makeURL("streams", username), function(data) {
			var streamGame = "";
			var status = "";
			if (data.stream === null) {
				streamGame = "Offline";
				status = "offline";
			} else {
				streamGame = data.stream.game;
				status = "online";
			}
			$.getJSON(makeURL("channels", username), function(data) {
				var avatar = data.logo != null ? data.logo : "http://www-cdn.jtvnw.net/images/xarth/404_user_600x600.png";
				var username = data.display_name != null ? data.display_name : username;
				var description = status === "online" ? ': ' + data.status : "";
				var html = '<div class="row ' + status + '">' +
								'<div class="col-xs-2 col-sm-1" id="icon"><img src="' + avatar + '" class="avatar"></div>' +
								'<div class="col-xs-10 col-sm-3" id="username"><a href="' + data.url + '" target="_blank">' + username + '</a></div>' +
								'<div class="col-xs-10 col-sm-8" id="streamGame">'+ streamGame + '<span class="hidden-xs">' + description + '</span></div>' +
							'</div>';
				$("#display").append(html);
			})
		})
	})
}

window.onload = getStreamersStatus;
