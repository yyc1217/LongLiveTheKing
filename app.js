var Standing = require('./standing.js'),
	schedule = require('./schedule.js'),
	config = require('./config.js');
	
var hypothesis = config.hypothesis,
	firstStanding = new Standing(config.rank, schedule.first());

	var flat = 0;
	
	console.log('init standing:', firstStanding);
	
var go = function cal(standing) {
	console.log('parent node:', standing);

	hypothesis.forEach(function(hypo) {
		flat++;
		var result = standing.fight(hypo);
			console.log('line:', hypo);
		if (standing.game.hasNext()) {
			result.game = standing.game.next();
			console.log('child node:', result);
			if (flat < 10){
			
				cal(result);
			}
		}
	
	});
}

go(firstStanding);
	
	/**
	
	get next standing
	if there exist a magin number for top 1, then show it
	
	
	*/