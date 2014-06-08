var config = require('./config.js'),
	_ = require('underscore');

function Standing(standing) {
	this.current = standing;
}

Standing.prototype.magic = function() {
	//(應賽場數-第一名和局數)/(應賽場數-第二名和局數)*(應賽場數-第二名敗場數-第二名和局數)-第一名勝場數
	var mn = (60 - current[0].tie) / (60 - current[1].tie) * (60 - current[1].lose - current[1].tie) - current[0].win
	mn = Math.round(mn);
	
	// mn要小於等於第一名剩餘未賽場次-第一名與第二名剩餘未賽場次才成立
	if(mn > (60 - current[0].g) - schedule.leftGames(current[0].team, current[1].team)) {
		mn = null;
	}
	return mn;
};

Standing.prototype.fight = function(game, hypo) {
	var next = _.clone(this.current);

	next.forEach(function(row) {
		if (row.team == game.home) {
			row[hypo.home] += 1;
			row[hypo.home].g += 1;
		} else if (row.team == game.guest) {
			row[hypo.guest] += 1;
			row[hypo.guest].g += 1;
		}
	});
	
	return new Standing(next);
};

module.exports = Standing;