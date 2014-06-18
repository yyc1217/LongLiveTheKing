
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

var tree = d3.layout.tree()
	.size([height, width])
	.separation(function (a, b) {
		return (a.parent == b.parent ? 13 : 10);
	});

var diagonal = d3.svg.diagonal()
	.projection(function (d) {
		return [d.y, d.x];
	});

var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g")
	.attr("transform", "translate(100,50)");

d3.json("result.json", function (error, json) {
	
	var pre = tree.nodes(json);
	
	function re(d) {
		if (d.depth == 3) {
			d._children = d.children;
			d.children = null;
		}
	}
	pre.forEach(re);
	console.log(json);
	
	var nodes = tree.nodes(json),
	links = tree.links(nodes);

	nodes.forEach(function (d) {
		d.y = d.depth * 130;
	});

	var link = svg.selectAll(".link")
		.data(links)
		.enter().append("path")
		.attr("class", "link")
		.attr("d", diagonal);

	var node = svg.selectAll(".node")
		.data(nodes)
		.enter().append("g")
		.attr("class", function (d) {
			return 'node ' + (d.game ? 'run' : 'result');
		})
		.attr("transform", function (d) {
			return "translate(" + d.y + "," + d.x + ")";
		})

		node.append("circle")
		.attr("r", 7)
		.attr('class', function (d) {
			return !d.game ? d.winner : '';
		});

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
	var runs = svg.selectAll('.node.run')
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
});

d3.select(self.frameElement).style("height", height + "px");

function disableOverLevel(root, level) {
	var limit = level * 2 - 1;
	
	//function re(
}