/*
 * CodePress - Real Time Syntax Highlighting Editor written in JavaScript - http://codepress.org/
 * 
 * Copyright (C) 2006 Fernando M.A.d.S. <fermads@gmail.com>
 *
 * This program is free software; you can redistribute it and/or modify it under the terms of the 
 * GNU Lesser General Public License as published by the Free Software Foundation.
 * 
 * Read the full licence: http://www.opensource.org/licenses/lgpl-license.php
 */

CodePress = function(obj) {
	var self = document.createElement('iframe');
	self.reference = document.getElementById(obj.id);
	self.style.height = obj.clientHeight +'px';
	self.style.width = obj.clientWidth +'px';
	self.style.display = 'block';
	self.style.border = '1px solid gray';

	self.initialize = function() {
		self.editor = self.contentWindow.CodePress;
		self.editor.body = self.contentWindow.document.getElementsByTagName('body')[0];
		self.editor.setCode(self.reference.value);
		self.editor.syntaxHighlight('init');
	}
	
	self.edit = function(id,language) {
		if(id) self.reference = document.getElementById(id+'_cp');
		self.language = (language) ? language : self.reference.className.replace(/ ?cp ?/,'');
		self.src = cpPath+'modules/codepress.html?engine='+self.getEngine()+'&language='+self.language;
		self.attachEvent ? self.attachEvent('onload',self.initialize) : self.addEventListener('load',self.initialize,false);
	}
	
	self.getCode = function() {
		return self.editor.getCode();
	}

	self.setCode = function(code) {
		self.editor.setCode(code);
	}
	
	self.toogleLinenumbers = function() {
		var cn = self.editor.body.className;
		self.editor.body.className = (cn==''||cn=='show-line-numbers') ? 'hide-line-numbers' : 'show-line-numbers';
	}
	
	self.toogleEditor = function() {
		if(self.style.display=='block') {
			self.style.display = 'none';
			self.reference.value = self.getCode();
			self.reference.style.display = 'block';
		}
		else {
			self.setCode(self.reference.value);
			self.editor.syntaxHighlight('init');
			self.style.display = 'block';
			self.reference.style.display = 'none';
		}
	}
	
	self.getEngine = function()	{
		var engine = 'older';
		var ua = navigator.userAgent;
		if(ua.match('MSIE')) engine = 'msie';
		else if(ua.match('KHTML')) engine = 'khtml'; 
		else if(ua.match('Opera')) engine = 'opera'; 
		else if(ua.match('Gecko')) engine = 'gecko';
		return engine;
	}
	
	self.edit();
	return self;
}

/*

CodePress.tools = {
	detect : function() {
		this.engine = 'older';
		var ua = navigator.userAgent;
		if(ua.match('MSIE')) this.engine = 'msie';
		else if(ua.match('KHTML')) this.engine = 'khtml'; 
		else if(ua.match('Opera')) this.engine = 'opera'; 
		else if(ua.match('Gecko')) this.engine = 'gecko';
	},
	loadStyle : function(selector, declarations) {
		var style = document.createElement('style');
		style.type = 'text/css';
		document.getElementsByTagName('head')[0].appendChild(style);
		sheet = document.styleSheets[document.styleSheets.length-1];
		if (sheet.insertRule) sheet.insertRule(selector+' { '+declarations+' }', sheet.cssRules.length);
		else if (sheet.addRule) sheet.addRule(selector, declarations);
	},
*/	
/*
	loadScript : function(src) {
		var node = document.createElement('script');
		node.src = src;
		document.getElementsByTagName('head').item(0).appendChild(node);
		node = null;
	},
*/
/*
	start : function(ini) { // on dom load
		(!ini) ? this.c=0 : this.c++ ;
		if(typeof(document.getElementsByTagName)!='undefined' && document.getElementsByTagName('body')[0]!=null) CodePress.tools.set()
		else if(this.c < 50) setTimeout('CodePress.tools.start(1)', 200);
	},
}
*/

CodePress.run = function() {
	cpPath = document.getElementById('cp-script').src.replace('codepress-lite.js',''); // last index of here
	t = document.getElementsByTagName('textarea');
	for(var i=0,z=0,n=t.length;i<n;i++) {
		if(t[i].className.match('cp')) {
			id = t[i].id;
			t[i].id = id+'_cp';
			eval(id+' = new CodePress(t[i])');
			t[i].parentNode.insertBefore(eval(id), t[i]);
			t[i].style.display = 'none';
		} 
	}
}


//CodePress.tools.loadStyle('.cp','border:1px solid gray;overflow:auto;background:white;');
if(window.attachEvent) window.attachEvent('onload',CodePress.run);
else window.addEventListener('DOMContentLoaded',CodePress.run,false);
