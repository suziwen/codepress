/**
 * CodePress Engine interface
 */
Engine = {
	
	init : function() {
		Engine.body = document.getElementsByTagName('body')[0];
		Engine.Main.init(arguments[0]);
	},

	// name of the engine
	name : function() {
		var ua = navigator.userAgent;
		var engine = ua.match('MSIE') || ua.match('KHTML') || 
			ua.match('Opera') || ua.match('Gecko') || 'older';
			
		return engine.toString().toLowerCase();
	}(),
	
	// snippets on/off/get
	snippets : function(value) {
		return Engine.Snippets.active = value == undefined ? 
			Engine.Snippets.active : value;
	},

	// auto-complete on/off/get
	complete : function(value) {
		return Engine.Complete.active = value == undefined ?
			Engine.Complete.active : value;
	},
	
	// syntax highlighting on/off/get
	highlight : function(value) {
		Engine.Highlight.active = value == undefined ?
			Engine.Highlight.active : value;

		Engine.Highlight.run('init');
			
		return Engine.Highlight.active
	},

	shortcuts : function(value) {
		return Engine.Shortcuts.active = value == undefined ?
			Engine.Shortcuts.active : value;
	},

	// lines on/off/get
	lines : function(value) {
		
	}
}

Editor.include('engines.'+ Engine.name +'.main');