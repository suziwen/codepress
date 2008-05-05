/*
 * CodePress - Real Time Syntax Highlighting Editor written in JavaScript 
 * 
 * Copyright (C) 2008 Fernando M.A.d.S. <fermads@gmail.com> <codepress.org>
 *
 * This program is free software; you can redistribute it and/or modify it 
 * under the terms of the GNU Lesser General Public License (license.txt).
 */

/**
 * CodePress
 */
CodePress = {

	init : function() {
		var t = document.getElementsByTagName('textarea');
		for (var i = 0; i < t.length; i++) {
			var ti = t[i];
			if (ti.className.match('codepress')) {
				CodePress[ti.id] = new CodePress.instance(ti);
			}
		}
	}, 
	
	instance : function(textarea) {
		this.iframe = document.createElement('iframe');
		this.iframe.src = 'editor/editor.html';
		this.iframe.self = this; // store itself to be accessed from inside iframe
		this.iframe.self.Config = CodePress.Config;
		this.iframe.style.visibility = 'hidden';
		this.iframe.style.position = 'absolute';
		this.textarea = textarea;
		this.textarea.parentNode.insertBefore(this.iframe, this.textarea);
	}
};


/**
 * Config
 */
CodePress.Config = {
	
	plugins : {
		complete 	: 'Auto-complete',
		snippets 	: 'Code snippets',
		shortcuts	: 'Shortcut keys'
	},
	
	languages : {
		csharp 		: 'C#', 
		css    		: 'CSS', 
		generic 	: 'Generic',
		html 		: 'HTML',
		java 		: 'Java', 
		javascript  : 'JavaScript', 
		perl 		: 'Perl', 
		ruby 		: 'Ruby',	
		php 		: 'PHP', 
		text 		: 'Text', 
		sql 		: 'SQL',
		vbscript 	: 'VBScript'
	}, 
	
	defaults : {
		active      : true,
		language    : 'generic',
		editable    : true,
		complete    : true,
		snippets    : true,
		shortcuts   : true,
		highlight   : true
	}
};


window.attachEvent ? 
	window.attachEvent('onload', CodePress.init) : 
	window.addEventListener('DOMContentLoaded', CodePress.init, false);
	