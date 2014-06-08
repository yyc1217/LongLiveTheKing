﻿var _ = require('underscore'),
	config = require('./config.js');

module.exports = (function() {
	var _schedule = config.schedule;
	
	return {
		first : function() {
			return _schedule[0];
		},
		
		leftGames : function(team1, team2) {
			return _.reduce(_schedule, function(memo, game) {return (game.home == team1 && game.guest == team2 || game.guest ==team1 && game.home == team2) ? 1 : 0; }, 0);
		}
	};

})();