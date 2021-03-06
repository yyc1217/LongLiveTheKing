
var dictionary = {
	monkey : '猿',
	rhino : '犀',
	elephant : '象',
	lion : '獅',

	win : '贏',
	lose : '輸',
	tie : '和'
};

var height = 960, width = 980;

var duration = 6000;

var tree = d3.layout.tree()
	.size([height, width])
	.separation(function (a, b) {
		return (a.parent == b.parent ? 2 : 3);
	});

var diagonal = d3.svg.diagonal()
	.projection(function (d) {
		return [d.y, d.x];
	});

var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g")
	.attr("transform", "translate(100,0)");

var root;
var i = 0;
var LEVELS_OF_LAYER = 2;

d3.json("result.json", function (error, json) {

	root = json;
	// first we need 'depth'
	var nodes = tree.nodes(root);

	// decide subroot for each node
	nodes.forEach(function (d) {
		d.subroot = (d.depth % LEVELS_OF_LAYER == 0) ? d : d.parent.subroot;
		d.id = ++i;
	});

	update(1);
});

d3.select(self.frameElement).style("height", height + "px");

function update(level) {

	var limit = level * LEVELS_OF_LAYER - 1;

	function cut(d) {
		if (d.depth == limit) {
			d._children = d.children;
			d.children = null;
		} else {
			d.children = d._children || d.children;
			d._children = null;
		}
		d.children && d.children.forEach(cut);
		d._children && d._children.forEach(cut);
	}

	root.children.forEach(cut);

	var nodes = tree.nodes(root).reverse(),
	links = tree.links(nodes);

	nodes.forEach(normalize);

	var node = svg.selectAll("g.node")
		.data(nodes, function (d) {
			return d.id;
		});

	var nodeEnter = node.enter()
		.append("g")
		.attr("class", function (d) {
			return 'node ' + (d.game ? 'run' : 'result');
		})
		.attr('transform', function (d) {
			return 'translate(' + d.subroot.y + ',' + d.subroot.x + ') scale(0)';
		});

	nodeEnter.append("circle")
	.attr("r", 7)
	.attr('class', function (d) {
		return !d.game ? d.winner : '';
	});

	var newRuns = nodeEnter.filter(function (d) {
			return !d.game;
		});

	newRuns.append('text')
	.attr('dy', '.3em')
	.attr('dx', '1em')
	.attr('class', 'magic')
	.text(function (d) {
		if (d.tobeKing) {
			if (d.parent && d.parent.parent && d.parent.parent.magicNumber == 0) {
				return '';
			}
			if (d.magicNumber == 0) {
				return dictionary[d.tobeKing] + '封王';
			} else if (d.magicNumber == null) {
				return '';
			} else {
				return dictionary[d.tobeKing] + ' M' + d.magicNumber;
			}
		}
	});

	newRuns.append('text')
	.attr('dy', '.3em')
	.attr('dx', '-1em')
	.attr('text-anchor', 'end')
	.text(function (d) {
		return d.winner == 'tie' ? dictionary[d.winner] : dictionary[d.winner] + dictionary['win'];
	});

	var newResults = nodeEnter.filter(function (d) {
			return d.game;
		});

	newResults.append('text')
	.attr('dy', '-.8em')
	.attr('dx', '-2.4em')
	.text(function (d) {
		return d.game ? d.game.date : '';
	});

	newResults.append('text')
	.attr('dy', '1.3em')
	.attr('dx', '-1.9em')
	.text(function (d) {
		return d.game ? dictionary[d.game.guest] + ' v.s. ' + dictionary[d.game.home] : '';
	});

	var nodeUpdate = node.transition()
		.duration(duration)
		.attr("transform", function (d) {
			return "translate(" + d.y + "," + d.x + ") scale(1)";
		});

	var nodeExit = node.exit()
		.transition()
		.duration(duration)
		.attr("transform", function (d) {
			return "translate(" + d.subroot.y + "," + d.subroot.x + ") scale(0)";
		})
		.remove();

	var link = svg.selectAll(".link")
		.data(links, function (d) {
			return d.target.id;
		});

	link.enter()
	.insert('path', 'g')
	.attr("class", "link")
	.attr('d', function (d) {
		var source = (d.target.subroot == d.target) ? d.source : d.target.subroot;
		var o = {
			x : source.x,
			y : source.y
		};
		return diagonal({
			source : o,
			target : o
		});
	});

	link.transition()
	.duration(duration)
	.attr("d", diagonal);

	link.exit()
	.transition()
	.duration(duration)
	.attr('d', function (d) {
		var source = (d.target.subroot == d.target) ? d.source : d.target.subroot;
		var o = {
			x : source.x,
			y : source.y
		};
		return diagonal({
			source : o,
			target : o
		});
	})
	.remove();

}

function normalize(d) {
	d.y = d.depth * 130;
}
