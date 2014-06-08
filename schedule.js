var _ = require('underscore');

module.exports = (function() {
	var _schedule = [
		{
			serial : 111,
			date : '2014-06-08',
			home : 'lion',
			guest : 'monkey',
		},
		{
			serial : 113,
			date : '2014-06-11',
			home : 'rhino',
			guest : 'monkey',
		},
		{
			serial : 114,
			date : '2014-06-12',
			home : 'lion',
			guest : 'elephant',
		},
		{
			serial : 115,
			date : '2014-06-13',
			home : 'monkey',
			guest : 'elephant',
		},
		{
			serial : 116,
			date : '2014-06-13',
			home : 'rhino',
			guest : 'lion',
		},
		{
			serial : 117,
			date : '2014-06-14',
			home : 'monkey',
			guest : 'elephant',
		},
		{
			serial : 118,
			date : '2014-06-14',
			home : 'rhino',
			guest : 'lion',
		},
		{
			serial : 119,
			date : '2014-06-15',
			home : 'monkey',
			guest : 'elephant',
		},
		{
			serial : 120,
			date : '2014-06-14',
			home : 'rhino',
			guest : 'lion',
		},
		{
			serial : 56,
			date : '2014-06-17',
			home : 'monkey',
			guest : 'rhino',
		},
		{
			serial : 76,
			date : '2014-06-17',
			home : 'elephant',
			guest : 'lion',
		},
		{
			serial : 65,
			date : '2014-06-18',
			home : 'rhino',
			guest : 'lion',
		},
		{
			serial : 77,
			date : '2014-06-19',
			home : 'monkey',
			guest : 'rhino',
		},
		{
			serial : 112,
			date : '2014-06-21',
			home : 'elephant',
			guest : 'rhino',
		},
		{
			serial : 85,
			date : '2014-06-24',
			home : 'elephant',
			guest : 'rhino',
		},
		{
			serial : 104,
			date : '2014-06-15',
			home : 'lion',
			guest : 'rhino',
		},
	];
	
	return {
		first : function() {
			return _schedule[0];
		},
		
		leftGames : function(team1, team2) {
			return _.reduce(_schedule, function(memo, game) {return (game.home == team1 && game.guest == team2 || game.guest ==team1 && game.home == team2) ? 1 : 0; }, 0);
		}
	};

})();