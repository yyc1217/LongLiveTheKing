var Standing = require('./standing.js'),
	schedule = require('./schedule.js'),
	config = require('./config.js');
	
var hypothesis = config.hypothesis,
	firstStanding = new Standing(config.standing, schedule.first());
	
doing(firstStanding);
	
var doing = function cal(standing, game) {
	hypothesis.forEach(function(hypo) {
		var nextStanding = standing.fight(game, hypo);
		
		if (nextStanding.hasKing()) {
			console.log(nextStanding);
			return;
		}
		
		if (schedule.hasNext(game)) {
			cal(nextStanding)
		}
		return;
	});
}
	/**
	
	get next standing
	if there exist a magin number for top 1, then show it
	
	
	*/