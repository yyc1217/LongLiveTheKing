var Standing = require('./standing.js'),
	schedule = require('./schedule.js'),
	config = require('./config.js');
	
var hypothesis = config.hypothesis;
	
	var firstStanding = new Standing(config.standing);
	console.log('init:');
	console.log(firstStanding);
	hypothesis.forEach(function(hypo) {
		console.log(firstStanding.fight(schedule.first(), hypo));
	
	});
	/**
	
	for each condition
	home win
	guest win
	tie
	
	get next standing
	if there exist a magin number for top 1, then show it
	
	
	*/