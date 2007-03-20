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

var cpTheme = 'default';

CodePress = function(obj) {
	var self = document.createElement('iframe');
	self.id = obj.id;
	self.style.height = obj.clientHeight +'px';
	self.style.width = obj.clientWidth +'px';
	self.style.display = 'block';
	self.style.border = '1px solid gray'; 	
	self.language = obj.className.replace(/cp ?/,'');
	self.src = cpPath+'modules/codepress.html?engine='+cpEngine+'&theme='+cpTheme+'&language='+self.language;

	self.initialize = function () {
		self.editor = self.contentWindow.CodePress;	
		self.editor.setCode(obj.value);
		self.editor.syntaxHighlight('init');
	}
	
	self.getCode = function() {
		return self.editor.getCode();
	}

	self.setCode = function(code) {
		self.editor.setCode(code);
	}
	
	self.swap = function() {
		self.style.display = 'none';
		alert(self.id)
		document.getElementById(self.id).style.display = 'block';
	}

	self.attachEvent ? self.attachEvent('onload',self.initialize) : self.addEventListener('load',self.initialize,false);
	return self;
}

CodePress.tools = {
	detect : function() {
		cpEngine = 'older';
		var ua = navigator.userAgent;
		if(ua.match('MSIE')) cpEngine = 'msie';
		else if(ua.match('KHTML')) cpEngine = 'khtml'; 
		else if(ua.match('Opera')) cpEngine = 'opera'; 
		else if(ua.match('Gecko')) cpEngine = 'gecko';
	},

	loadStyle : function(selector, declarations) {
		var style = document.createElement('style');
		style.type = 'text/css';
		document.getElementsByTagName('head')[0].appendChild(style);
		sheet = document.styleSheets[document.styleSheets.length-1];
		if (sheet.insertRule) sheet.insertRule(selector+' { '+declarations+' }', sheet.cssRules.length);
		else if (sheet.addRule) sheet.addRule(selector, declarations);
	},
	
	loadScript : function(src) {
		var node = document.createElement('script');
		node.src = src;
		document.getElementsByTagName('head').item(0).appendChild(node);
		node = null;
	},

	start : function(ini) { // on dom load
		(!ini) ? this.c=0 : this.c++ ;
		if(typeof(document.getElementsByTagName)!='undefined' && document.getElementsByTagName('body')[0]!=null) CodePress.tools.set()
		else if(this.c < 50) setTimeout('CodePress.tools.start(1)', 200);
	},
	
	set : function() {
		Content = {};
		$ = function() { return document.getElementById(arguments[0]); }
		cpPath = $('cp-script').src.replace('codepress-lite.js',''); // last index of here
		this.detect();
		this.loadScript(cpPath+'content/'+$('cp-script').lang+'.js');
		t = document.getElementsByTagName('textarea');
		for(var i=0,z=0,n=t.length;i<n;i++) {
			if(t[i].className.match('cp')) {
				id = t[i].id;
				t[i].id = id+'_cp';
				eval(id+' = new CodePress(t[i])');
				t[i].parentNode.insertBefore(eval(id), t[i]);
				t[i].style.display='none';
//				t[z].parentNode.removeChild(t[z]);
			} 
//			else {
//				z++;
//			}
		}
//		CodePress.tools.loadStyle('.cp','display:none;');
	}
}

CodePress.tools.loadStyle('.cp','border:1px solid gray;overflow:auto;background:white;');
if(window.attachEvent) window.attachEvent('onload',function(){CodePress.tools.set()});
else window.addEventListener('DOMContentLoaded',function(){CodePress.tools.set()},false);

//CodePress.tools.start();