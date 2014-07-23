
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
	
d3.json("result.json", function (error, json) {

	root = json;	
	//root.parent = {x0 : (height / 2), y0 : 0};
	// root.parent = { y : 0, x : (height / 2), y0 : 0, x0 : (height / 2) };
	// calculate tree layout first
	var nodes = tree.nodes(root);

	root.x0 = root.x;
	root.y0 = root.y;
	
	root.parent = {};
	root.parent.x0 = root.x;
	root.parent.y0 = root.y;

	update(1);
});

d3.select(self.frameElement).style("height", height + "px");

function update(level) {
 
	var limit = level * 2 - 1;
 
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

	var nodes = tree.nodes(root),
		links = tree.links(nodes);

	nodes.forEach(normalize);

	var node = svg.selectAll("g.node")
		.data(nodes, function(d){return d.id || (d.id = ++i);});
		
	var nodeEnter = node.enter()
		.append("g")
		.attr("class", function (d) {
			return 'node ' + (d.game ? 'run' : 'result');
		})
		.attr('transform', function (d) {
			return 'translate(' + d.parent.y0 + ',' + d.parent.x0 + ')';
		});
	
	nodeEnter.append("circle")
		.attr("r", 1e-6)
		.attr('class', function (d) {
			return !d.game ? d.winner : '';
		});
		
	var nodeUpdate = nodeEnter.transition()
		.duration(duration)
		.attr("transform", function (d) {
			return "translate(" + d.y + "," + d.x + ")";
		});

	nodeUpdate.select('circle')
		.attr('r', 7);
		
	var nodeExit = node.exit()
		.transition()
		.duration(duration)
		.attr("transform", function(d) { return "translate(" + d.parent.y + "," + d.parent.x + ")"; })
		.remove();
	
	nodeExit.select('circle')
		.attr('r', 1e-6);

	 // Stash the old positions for transition.
	nodes.forEach(function(d) {
		d.x0 = d.x;
		d.y0 = d.y;
	});
		
	var link = svg.selectAll(".link")
		.data(links, function(d){return d.target.id;});
		
	link.enter()
		.insert('path', 'g')
		.attr("class", "link")
		.attr('d', function(d) {
			var o = {x: d.source.x, y: d.source.y};
			return diagonal({source: o, target: o});
		});

	link.transition()
		.duration(duration)
		.attr("d", diagonal);
	
	link.exit()
		.transition()
		.duration(duration)
		.attr('d', function(d) {
			var o = {x:d.source.x, y: d.source.y};
			return diagonal({source: o, target: o});
		})
		.remove();
	
	renderText();
}

function normalize(d) {
	d.y = d.depth * 130;
}

function renderText() {

	return;

	svg.selectAll('.node.result')
	.each(function (d) {
		d3.select(this)
		.append('text')
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
		d3.select(this)
		.append('text')
		.attr('dy', '.3em')
		.attr('dx', '-1em')
		.attr('text-anchor', 'end')
		.text(function(d){
			return d.winner == 'tie' ? dictionary[d.winner] : dictionary[d.winner] + dictionary['win'];
		});
	});
	
	svg.selectAll('.node.run')
		.each(function (d) {
			d3.select(this)
			.append('text')
			.attr('dy', '-.8em')
			.attr('dx', '-2.4em')
			.text(function (d) {
				return d.game ? d.game.date : '';
			});

			d3.select(this)
			.append('text')
			.attr('dy', '1.3em')
			.attr('dx', '-1.9em')
			.text(function (d) {
				return d.game ? dictionary[d.game.guest] + ' v.s. ' + dictionary[d.game.home] : '';
			});
		});
}