var config = require('./config.js'),
	_ = require('underscore'),
	schedule = require('./schedule.js');

function Standing(rank, game) {
	this.rank = rank;
	this.game = game;
}

Standing.prototype.magic = function() {
	var rank = this.rank;
	
	//(應賽場數-第一名和局數)/(應賽場數-第二名和局數)*(應賽場數-第二名敗場數-第二名和局數)-第一名勝場數
	var mn = (60 - rank[0].tie) / (60 - rank[1].tie) * (60 - rank[1].lose - rank[1].tie) - rank[0].win
	mn = Math.round(mn);
	
	// mn要小於等於第一名剩餘未賽場次-第一名與第二名剩餘未賽場次才成立
	if(mn > (60 - rank[0].played) - schedule.leftGames(rank[0].team, rank[1].team)) {
		mn = null;
	}
	this.magicNumber = mn > -1 ? mn : null; 
	return mn;
};

Standing.prototype.fight = function(hypo) {
	var tempRank = _.map(this.rank, _.clone),
		game = this.game;

	tempRank.forEach(function(row) {
		if (row.team == game.home) {
			row[hypo.home] += 1;
			row.played += 1;
		} else if (row.team == game.guest) {
			row[hypo.guest] += 1;
			row.played += 1;
		}
	});
	
	_.sortBy(tempRank, 'win');
	var nextStanding = new Standing(tempRank);
	nextStanding.magic();
	return nextStanding;
};

module.exports = Standing;