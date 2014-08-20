var result = [];

d3.json("result.json", function (error, root) {
	
	root.isRoot = true;

	root.children.forEach(traversal);
	
	function tranversal(d) {
		
		if (d.tobeKing && d.magicNumber == 0) {
			
		}
	
	};
});