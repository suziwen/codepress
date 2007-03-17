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
//	self.className = 'cp-editor'
	self.style.height = obj.clientHeight +'px';
	self.style.width = obj.clientWidth +'px';
	self.style.display = 'block';
	self.style.border = '1px solid gray'; 	
	self.language = obj.className.replace(/cp +/,'');
	self.src = cpPath+'modules/codepress.html?engine='+cpEngine+'&theme='+cpTheme+'&language='+self.language;
	
	self.onload = function () {
		self.contentWindow.CodePress.setCode(obj.value);
		self.contentWindow.CodePress.syntaxHighlight('init');
	}
	
	self.getCode = function() {
		return self.contentWindow.CodePress.getCode();
	}

	self.setCode = function() {
		// TO DO 
	}
	
	return self;
}

CodePress.detect = function() {
	cpEngine = 'older';
	var ua = navigator.userAgent;
	if(ua.match('MSIE')) cpEngine = 'msie';
	else if(ua.match('KHTML')) cpEngine = 'khtml'; 
	else if(ua.match('Opera')) cpEngine = 'opera'; 
	else if(ua.match('Gecko')) cpEngine = 'gecko';
}

CodePress.loadScript = function(src) {
	var node = document.createElement('script');
	node.src = src;
	document.getElementsByTagName('head').item(0).appendChild(node);
	node = null;
}

CodePress.initialize = function() {
	Content = {};
	$ = function() { return document.getElementById(arguments[0]); }
	cpPath = $('cp-script').src.replace('codepress-lite.js',''); // last index of here
	CodePress.detect();
	CodePress.loadScript(cpPath+'content/'+$('cp-script').lang+'.js');

	t = document.getElementsByTagName('textarea');
	for(var i=0,n=t.length;i<n;i++) {
		if(t[0].className.match('cp')) {
			eval(t[0].id+' = new CodePress(t[0])');
			t[0].parentNode.insertBefore(eval(t[0].id), t[0]);
			t[0].parentNode.removeChild(t[0]);
		} 
	}
}

CodePress.initialize();

