/**
 * CodePress Editor
 */
Editor = {
	
	init : function() {
		// external references (outside iframe) 
		CodePress = window.frameElement.self;
		CodePress.Editor = Editor;
		CodePress.Engine = Engine;
		CodePress.Language = Language;

		// internal references (inside iframe, no conflicts)
		iframe = CodePress.iframe;
		textarea = CodePress.textarea;

		Engine.init('new');
		Editor.style();
		Editor.open();
	}, 
	
	// set style to iframe editor
	style : function() {
//		textarea.style.overflow = 'hidden';
		iframe.style.height = textarea.clientHeight +'px';
		iframe.style.width = textarea.clientWidth +'px';
//		textarea.style.overflow = 'auto';
		iframe.style.border = '1px solid gray';
		iframe.frameBorder = 0; // remove IE iframe border // TO-DO: try to move to msie.js
	},
	
	// get/set code from/to editor
	code : function(value) {
		return value ? Engine.Main.code(textarea.value = value) :
			Editor.active() ? Engine.Main.code() : 
			textarea.value;
	},
	
	// open code on editor with specific language
	open : function(oa) {
//		alert(CodePress.options.snippets)
		oa = oa || CodePress.options || {}; // options from arguments

		if(oa.code)
			Editor.code(parent.document.getElementById(oa.code) ?
				parent.document.getElementById(oa.code).innerHTML :
				typeof oa.code == 'object' ? oa.code.innerHTML : oa.code);

		var option = function(name)  {
			var opt = textarea.className.match(name +':(.*?)( |$)');
			if (name == 'language')
				return oa[name] != undefined ? oa[name] : opt ? opt[1] : 'generic'; 

			// defaults to true (feature on) if not specified
			return oa[name] != undefined ? oa[name] : opt ? opt[1] == 'true' : true; 
		}

		Engine.snippets(option('snippets'));
		Engine.complete(option('complete'));
		Engine.shortcuts(option('shortcuts'));
		Engine.highlight(option('highlight'));
		Editor.active(option('active'));
		Editor.editable(option('editable'));
		Editor.language(option('language'), oa.callback);
	},
	
	// language get/set 
	language : function(language, callback) {
		if(!language) 
			return Language.id;
		
		// defaults to generic if specified languages does not exist
		Language.id = Language.languages[language] ? language : 'generic';
		Language.callback = callback;

		Language.load(Language.id, function() {
			Engine.init('new');

			if(Language.callback) // language onload
				Language.callback.call();

			if(CodePress.options.onload) { // CodePress onload. Execute once
				CodePress.options.onload.call();
				CodePress.options.onload = false;
			}
		});
	},
	
	// update textarea and CodePress editor
	update : function() {
		Editor.active() ? textarea.value = Editor.code() :			
			Editor.code(textarea.value);
	},
	
	// CodePress editor on/off/get
	active : function(value) {
		if(value == undefined)
			return ! (iframe.style.visibility == 'hidden');

		Editor.update();				

		var v = {'true':'visible', 'false':'hidden'};
		textarea.style.visibility = v[!value];
		iframe.style.visibility = v[value];
	},
	
	// editable on/off/get
	editable : function(value) {
		return ! (textarea.readOnly = ! Engine.Main.editable(value));
	},

	// include js
	include : function(js) {
		js = js.replace(/\./g, '/');
		document.write('<scr'+'ipt src="../'+ js +'.js"></scr'+'ipt>');
	}
}

	
Editor.include('engines.engine');
Editor.include('languages.language');

window.attachEvent ?
	window.attachEvent('onload', Editor.init) :
	window.addEventListener('DOMContentLoaded', Editor.init, false);
