/*
 * CodePress - Real Time Syntax Highlighting Editor written in JavaScript 
 * 
 * Copyright (C) 2008 Fernando M.A.d.S. <fermads@gmail.com> <codepress.org>
 *
 * This program is free software; you can redistribute it and/or modify it 
 * under the terms of the GNU Lesser General Public License (license.txt).
 */

// TO-DO: highlightStart, highlightEnd, onload com varios callbacks

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
		// Editor.active(true); // <- inside open()
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
		return value ? Engine.code(textarea.value = value) :
			Editor.active() ? Engine.code() : 
			textarea.value;
	},
	
	// open code on editor with specific language
	open : function(oa) {
		oa = oa || {}; // options from arguments

		if(oa.code)
			Editor.code(parent.document.getElementById(oa.code) ?
				parent.document.getElementById(oa.code).innerHTML :
				typeof oa.code == 'object' ? oa.code.innerHTML : oa.code);
			
		var option = function(name)  {
			var opt = textarea.className.match(name +':(.*?)( |$)');
			return oa[name] != undefined ? oa[name] : opt ? opt[1] : 
				CodePress.Config.defaults[name]; // return default if not specified
		}

		Editor.active(option('active'));
		Editor.snippets(option('snippets'));
		Editor.complete(option('complete'));
		Editor.editable(option('editable'));
		Editor.shortcuts(option('shortcuts'));
		Editor.highlight(option('highlight'));
		Editor.language(option('language'), oa.callback);
	},
	
	// language get/set 
	language : function(language, callback) {
		if(!language) 
			return Language.id;
		
		window.callback = callback; // TO-DO : change to local var if possible

		Language.load(language, function() {
			Engine.init('new');
//			Engine.syntaxHighlight('init');
			if(window.callback) // language onload
				window.callback.call();

/*
			if(CodePress.onload) { // CodePress onload. Execute once
				CodePress.onload.call();
				CodePress.onload = false;
			}
*/
		});

//		Editor.load('../languages/'+ language +'/syntax.css');
	},
	
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
		return Engine.Highlight.active = value == undefined ?
			Engine.Highlight.active : value;
	},

	shortcuts : function(value) {
		return Engine.Shortcuts.active = value == undefined ?
			Engine.Shortcuts.active : value;
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
	
	// lines on/off/get
	lines : function(value) {
		
	},

	// engine get (can't be setted)
	engine : function() {
		var ua = navigator.userAgent;
		var engine = ua.match('MSIE') || ua.match('KHTML') || 
			ua.match('Opera') || ua.match('Gecko') || 'older';
			
		return engine.toString().toLowerCase();
	},

	// readOnly on/off/get
	editable : function(value) {
		return ! (textarea.readOnly = ! Engine.editable(value));
	},

	// include js
	include : function(js) {
		js = js.replace(/\./g, '/');
		document.write('<scr'+'ipt src="../'+ js +'.js"></scr'+'ipt>');
	}
}

	

//document.write('<scr'+'ipt src="../engines/'+Editor.engine()+'/main.js"></scr'+'ipt>');
Editor.include('engines.'+Editor.engine()+'.engine');
Editor.include('languages.language');
//document.write('<scr'+'ipt src="../languages/generic.js"></scr'+'ipt>');


window.attachEvent ?
	window.attachEvent('onload', Editor.init) :
	window.addEventListener('DOMContentLoaded', Editor.init, false);
