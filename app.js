var Standing = require('./standing.js'),
	schedule = require('./schedule.js'),
	config = require('./config.js'),
	fs = require('fs');
	
var hypothesis = config.hypothesis,
	firstStanding = new Standing(config.rank, schedule.first());

var outputPath = './result.json';
	
var go = function cal(standing, parent) {

	var children = [];	
	var parentNode = {
		name : standing.game.guest + ' v.s. ' + standing.game.home,
		parent : parent,
		children : children,
	};
	
	hypothesis.forEach(function(hypo) {
		
		var result = standing.fight(hypo),
			childNode = {
				name : standing.game.home + ' ' + hypo.home + ', ' + standing.game.guest + ' ' + hypo.guest,
				magicNumber : result.magicNumber,
				tobeKing : result.rank[0].team,
				parent : parentNode.name,
			};

		if (standing.game.hasNext()) {
			result.game = standing.game.next();
			(childNode.children ? childNode.children : childNode.children = []).push(cal(result, childNode.name));
		}
		children.push(childNode);
	});
	
	return parentNode;
}

var d = go(firstStanding);
fs.writeFile(outputPath, JSON.stringify(d, null, 4), function(err){
	if (err) {
		console.log(err);
	} else {
		console.log('saved!');
	}

});
	
	/**
	
	get next standing
	if there exist a magin number for top 1, then show it
	
	
	*/