
module.exports = {
	schedule : [
		{
			serial : 111,
			date : '2014-06-08',
			home : 'lion',
			guest : 'monkey',
		},
		{
			serial : 113,
			date : '2014-06-11',
			home : 'rhino',
			guest : 'monkey',
		},
		{
			serial : 114,
			date : '2014-06-12',
			home : 'lion',
			guest : 'elephant',
		},
		{
			serial : 115,
			date : '2014-06-13',
			home : 'monkey',
			guest : 'elephant',
		},
		{
			serial : 116,
			date : '2014-06-13',
			home : 'rhino',
			guest : 'lion',
		},
		{
			serial : 117,
			date : '2014-06-14',
			home : 'monkey',
			guest : 'elephant',
		},
		{
			serial : 118,
			date : '2014-06-14',
			home : 'rhino',
			guest : 'lion',
		},
		{
			serial : 119,
			date : '2014-06-15',
			home : 'monkey',
			guest : 'elephant',
		},
		{
			serial : 120,
			date : '2014-06-14',
			home : 'rhino',
			guest : 'lion',
		},
		{
			serial : 56,
			date : '2014-06-17',
			home : 'monkey',
			guest : 'rhino',
		},
		{
			serial : 76,
			date : '2014-06-17',
			home : 'elephant',
			guest : 'lion',
		},
		{
			serial : 65,
			date : '2014-06-18',
			home : 'rhino',
			guest : 'lion',
		},
		{
			serial : 77,
			date : '2014-06-19',
			home : 'monkey',
			guest : 'rhino',
		},
		{
			serial : 112,
			date : '2014-06-21',
			home : 'elephant',
			guest : 'rhino',
		},
		{
			serial : 85,
			date : '2014-06-24',
			home : 'elephant',
			guest : 'rhino',
		},
		{
			serial : 104,
			date : '2014-06-15',
			home : 'lion',
			guest : 'rhino',
		},
	],
	
	standing : [
			{   
				team : 'monkey',
				g : 53,
				win : 32,
				tie : 2,
				lose : 19,
			},
			
			{
				team : 'lion',
				g : 52,
				win : 28,
				tie : 3,
				lose : 21,
			},
			
			{
				team : 'rhino',
				g : 50,
				win : 24,
				tie : 0,
				lose : 26,
			},
			
			{
				team : 'elephant', 
				g : 53,
				win : 17,
				tie : 1,
				lose : 35,
			}			
	],
	hypothesis : [
		{ 
			home : 'win',
			guest : 'lose',
		},
		{ 
			home : 'lose',
			guest : 'win',
		},
		{ 
			home : 'tie',
			guest : 'tie',
		}
	]
}