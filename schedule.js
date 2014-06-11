var _ = require('underscore'),
	config = require('./config.js'),
	init = require('./init/init.js');

module.exports = (function() {
	var _schedule = init.schedule,
		that = {};
	
	var hasNext = function() {
		return this.index < (Math.min(_schedule.length , config.maxGame) - 1);
	};
	
	var next = function() {
		return _schedule[this.index+1];
	};
	
	_schedule.forEach(function(elem, index) {
		elem.index = index;
		elem.hasNext = hasNext;
		elem.next = next;
	});
	
	
	that.first = function() {
			return _schedule[0];
	};
		
	that.leftGames = function(team1, team2) {
			return _.reduce(_schedule, function(memo, game) {return (game.home == team1 && game.guest == team2 || game.guest ==team1 && game.home == team2) ? 1 : 0; }, 0);
	};
		
	that.hasNext = function(game) {
		
	}
	return that;

})();