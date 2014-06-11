var Standing = require('./standing.js'),
	schedule = require('./schedule.js'),
	init = require('./init/init.js'),
	config = require('./config.js'),
	fs = require('fs');
	
var hypothesis = config.hypothesis,
	firstStanding = new Standing(init.rank, schedule.first());

var outputPath = './result.json';
	
var go = function cal(standing, parent) {

	var children = [];	
	var parentNode = {
		name : standing.game.date + ' ' + standing.game.guest + ' v.s. ' + standing.game.home,
		parent : parent,
		children : children,
		game : standing.game,
	};
	
	hypothesis.forEach(function(hypo) {
	
		var result = standing.fight(hypo),
			childNode = {
				name : parentNode.game.date + ' ' + parentNode.game.home + ' ' + hypo.home + ', ' + parentNode.game.guest + ' ' + hypo.guest,
				magicNumber : result.magicNumber,
				tobeKing : result.rank[0].team,
				parent : parentNode.name,
				winner : (hypo.home == 'win' ? parentNode.game.home : (hypo.home == 'lose' ? parentNode.game.guest : 'tie')),
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