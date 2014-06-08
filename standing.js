var schedule = require('./schedule.js');

module.exports = (function() {
	var current = [
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
		]
		
		return {
			magic : function() {
				//(應賽場數-第一名和局數)/(應賽場數-第二名和局數)*(應賽場數-第二名敗場數-第二名和局數)-第一名勝場數
				var mn = (60 - current[0].tie) / (60 - current[1].tie) * (60 - current[1].lose - current[1].tie) - current[0].win
				mn = Math.round(mn);
				
				// mn要小於等於第一名剩餘未賽場次-第一名與第二名剩餘未賽場次才成立
				if (mn > (60 - current[0].g) - schedule.leftGames(current[0].team, current[1].team)) {
					mn = null;
				}
				return mn;
			}
		};

		
	})();
 
function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}
 