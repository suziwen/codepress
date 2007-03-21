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
	self.textarea = obj;
	self.textarea.disabled = true;
	self.textarea.style.overflow = 'hidden';
	self.style.height = self.textarea.clientHeight +'px';
	self.style.width = self.textarea.clientWidth +'px';
	self.textarea.style.overflow = 'auto';	
	self.style.display = 'inline';
	self.style.border = '1px solid gray';
	
	self.initialize = function() {
		self.editor = self.contentWindow.CodePress;
		self.editor.body = self.contentWindow.document.getElementsByTagName('body')[0];
		self.editor.setCode(self.textarea.value);
		self.editor.syntaxHighlight('init');
	}
	
	self.edit = function(id,language) {
		if(id) self.textarea.value = document.getElementById(id).value;
		if(!self.textarea.disabled) return;
		self.language = (language) ? language : self.textarea.className.replace(/ ?cp ?/,'');
		self.src = 'codepress.html?engine='+self.getEngine()+'&language='+self.language;
		if(self.attachEvent) self.attachEvent('onload',self.initialize);
		else self.addEventListener('load',self.initialize,false);
	}
	
	self.getCode = function() {
		return self.textarea.disabled ? self.editor.getCode() : self.textarea.value ;
	}

	self.setCode = function(code) {
		self.textarea.disabled ? self.editor.setCode(code) : self.textarea.value = code;
	}
	
	self.toogleLinenumbers = function() {
		var cn = self.editor.body.className;
		self.editor.body.className = (cn==''||cn=='show-line-numbers') ? 'hide-line-numbers' : 'show-line-numbers';
	}
	
	self.toogleEditor = function() {
		if(self.style.display=='inline') {
			self.textarea.disabled = false;
			self.textarea.value = self.getCode();
			self.style.display = 'none';
			self.textarea.style.display = 'inline';
		}
		else {
			self.textarea.disabled = true;
			self.setCode(self.textarea.value);
			self.editor.syntaxHighlight('init');
			self.style.display = 'inline';
			self.textarea.style.display = 'none';
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

CodePress.languages = {	css:'CSS', generic:'Generic', html:'HTML', java:'Java', javascript:'JavaScript', perl:'Perl', php:'PHP', text:'Text', sql:'SQL' }


CodePress.run = function() {
	t = document.getElementsByTagName('textarea');
	for(var i=0,n=t.length;i<n;i++) {
		if(t[i].className.match('cp')) {
			id = t[i].id;
			t[i].id = id+'_cp';
			eval(id+' = new CodePress(t[i])');
			t[i].parentNode.insertBefore(eval(id), t[i]);
			t[i].style.display = 'none';
		} 
	}
}

if(window.attachEvent) window.attachEvent('onload',CodePress.run);
else window.addEventListener('DOMContentLoaded',CodePress.run,false);
