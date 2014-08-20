var results = [];

d3.json("result.json", function (error, root) {
	
	root.children.forEach(traversal);
	
	function traversal(d) {
	
		if (!d.game) {
			var pointer = d,
				result = [];
			
			do {
				result.push(pointer.name);
				pointer = pointer.parent.parent;
			} while (pointer)
			
			results.push(result.reverse());
		}
		
		d.children && d.children.forEach(traversal);
		
	};
	
	document.getElementById('panel').innerHTML = JSON.stringify(results);
	
});