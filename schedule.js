var _ = require('underscore'),
	config = require('./config.js');

module.exports = (function() {
	var _schedule = config.schedule,
		that = {};
	
	_schedule.forEach(function(elem, index) {
		elem.index = index;
		elem.hasNext = function() {
			return this.index < (Math.min(_schedule.length , 3) - 1);
		};
		elem.next = function() {
			return _schedule[this.index+1];
		};
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