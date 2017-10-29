module.exports = {
	listAllJson: (routes) => {
		list = [];
		for (var key in routes) {
			if (routes.hasOwnProperty(key)) {
				var val = routes[key];
				if(val.route)
				{
					val = val.route;
					var _o = {};
					_o["path"]  = [val.path];
					_o["methods"]  = [];
					for (var method in val.methods){
						_o["methods"].push(method);
					}
					list.push(_o);
				}		
			}
		}
		return list;
	},
	listAllLogStr: (routes) => {
		list = [];
		for (var key in routes) {
			if (routes.hasOwnProperty(key)) {
				var val = routes[key];
				if(val.route)
				{
					val = val.route;
					var methods = [];
					for (var method in val.methods){
						methods.push(method.toUpperCase());
					}
					list.push(`${val.path} [${methods}]`);
				}		
			}
		}
		return list;
	}
};