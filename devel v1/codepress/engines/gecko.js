/**
 * CodePress - Real Time Syntax Highlighting Editor written in JavaScript - http://codepress.org/
 * Copyright (C) 2007 Fernando M.A.d.S. <fermads@gmail.com>
 *
 * @authors: Fernando M.A.d.S. <fermads@gmail.com>, Michael Hurni <michael.hurni@gmail.com>
 *
 * This program is free software; you can redistribute it and/or modify it under the terms of the 
 * GNU Lesser General Public License as published by the Free Software Foundation.
 * 
 * Read the full licence: http://www.opensource.org/licenses/lgpl-license.php
 */
 
Object.prototype.extend = function() {
	for (var property in this) arguments[0][property] = this[property];
	return arguments[0];
}

Array.prototype.each = Object.prototype.each = function(fn, bind){
	var array = new Array();
	for (var i = 0, j = this.length; i < j; i++) array[i] = this[i];
	for (var i = 0, j = this.length; i < j; i++) fn.call(bind, array[i], i, this);
}

CodePress = {};
Language = {};

CodePress.Engine = function(element) {
	var engine = this;
	
	engine.initialize = function() {
		element.event.fire("init");
		engine.name = "gecko";
		engine.blocsize = 4000;
		engine.language = element.language.value;
		engine.scrolling = false;
		engine.autocomplete = true;		
		editor = engine.getEditor();
			
		document.addEventListener('keypress', engine.keyHandler, true);
		window.addEventListener('scroll', function() {
			if(!engine.scrolling) engine.highlight('scroll');
		},false);
 		
		chars 		= '|32|46|62|9|'; // charcodes that trigger syntax highlighting
		engine.cc 	= '\v'; 	// caret char
		engine.ls 	= '<br>';		// lines separator
			
		// completeChars = this.getCompleteChars();
		// completeEndingChars =  this.getCompleteEndingChars();
		
		document.designMode = 'on';
		engine.highlight('init');
	}
	
	// split big files, highlighting parts of it
	engine.split = function(code,flag)
	{
		if(flag=='scroll'){ engine.scrolling = true; return code;}
		else{
			var position = code.indexOf(engine.cc);
			var start = 0;
			var end = code.length;
			engine.scrolling = false;
			if(position - engine.blocsize/2 < 0) {
				end = engine.blocsize/2;
			}
			else if(position + engine.blocsize/2 > code.length) {
				start = code.length-engine.blocsize;
			}
			else {
				start = position - engine.blocsize/2;
				end = position + engine.blocsize/2;
			}
			code = code.substring(start,end);
			return code;}
	}
	
	engine.getEditor = function() {
		return document.getElementsByTagName('body')[0];
	}

	engine.insert = function(text)
	{
		engine.raiseCaret();
		var editor = engine.getEditor();
		var code = editor.innerHTML;
		code = code.replace(engine.cc,text+engine.cc);
		editor.innerHTML = code;	
		return engine.findCaret();
	}

	// syntax highlighting parser
	engine.highlight = function(flag)
	{
		//if(document.designMode=='off') document.designMode='on'
		
		if(flag != 'init') engine.raiseCaret();
		element.event.fire("highlight");
		
		var editor = engine.getEditor();
		o = editor.innerHTML;
		o = o.replace(/<br>/g,'\n');
		o = o.replace(/<.*?>/g,'');
		x = z = engine.split(o,flag);
		x = x.replace(/\n/g,'<br>');
		x = x.replace(/&nbsp;/g,' ')
		if(arguments[1]&&arguments[2]) x = x.replace(arguments[1],arguments[2]);
	
		for(i=0;i<Language[engine.language].syntax.length;i++) 
			x = x.replace(Language[engine.language].syntax[i].input,Language[engine.language].syntax[i].output);

		/* editor.innerHTML = this.actions.history[this.actions.next()] = 
		(flag=='scroll') ? x : o.split(z).join(x);
		*/
	
		x = x.replace(/ /g,'&nbsp;');
		editor.innerHTML = (flag=='scroll') ? x : '<pre>' + o.split(z).join(x) + '</pre>';
		if(flag!='init') engine.findCaret();
		
	}

	engine.raiseCaret = function() {
		window.getSelection().getRangeAt(0).insertNode(document.createTextNode(engine.cc));
	}
	
	engine.findCaret = function() {
		return self.find(engine.cc) && window.getSelection().getRangeAt(0).deleteContents();
	}
	
	// get code from editor
	engine.getCode = function() {
		if(!document.getElementsByTagName('pre')[0] || editor.innerHTML == '')
			editor = engine.getEditor();
		var code = editor.innerHTML;
		code = code.replace(/<br>/g,'\n');
		code = code.replace(/\u2009/g,'');
		code = code.replace(/<.*?>/g,'');
		code = code.replace(/&lt;/g,'<');
		code = code.replace(/&gt;/g,'>');
		code = code.replace(/&amp;/gi,'&');
		code = code.replace(/&nbsp;/gi,' ');
		return code;
	},

	// put code inside editor
	engine.setCode = function(code,encoded) {
		code = code.replace(/\u2009/gi,'');
		if(encoded) {
			code = code.replace(/&/gi,'&amp;');
			code = code.replace(/</g,'&lt;');
			code = code.replace(/>/g,'&gt;');
		}
		engine.getEditor().innerHTML = code;
		if (code == '')
			document.getElementsByTagName('body')[0].innerHTML = '';
	},
	
	engine.keyHandler = function(evt) {
		
    	var keyCode = evt.keyCode;	
		var charCode = evt.charCode;
		
		element.event.fire("keypress",evt);
		/*
		if((evt.ctrlKey || evt.metaKey) && evt.shiftKey && toChar!="z")  { // shortcuts = ctrl||appleKey+shift+key!=z(undo) 
			engine.shortcuts(charCode?charCode:keyCode);
		}
		else if( (completeEndingChars.indexOf('|'+toChar+'|')!= -1 || completeChars.indexOf('|'+toChar+'|')!=-1) && CodePress.autocomplete) { // auto complete
			if(!CodePress.completeEnding(fromChar))
			     CodePress.complete(fromChar);
		}
	    else */
		
		if(chars.indexOf('|'+charCode+'|')!=-1||keyCode==13||keyCode==9) { // syntax highlighting

	/*	if( chars.indexOf('|'+charCode+'|') != -1
			|| keyCode == 13
			|| keyCode == 8
			|| keyCode == 46
			|| (charCode && !evt.ctrlKey))
		{ */
			top.setTimeout(function(){engine.highlight('generic');},100);
		}
		/*
		else if(keyCode==9 || evt.tabKey) {  // snippets activation (tab)
			CodePress.snippets(evt);
		}
		else if(keyCode==46||keyCode==8) { // save to history when delete or backspace pressed
		 	CodePress.actions.history[CodePress.actions.next()] = editor.innerHTML;
		}
		else if((charCode==122||charCode==121||charCode==90) && evt.ctrlKey) { // undo and redo
			(charCode==121||evt.shiftKey) ? CodePress.actions.redo() :  CodePress.actions.undo(); 
			evt.preventDefault();
		}
		else if(charCode==118 && evt.ctrlKey)  { // handle paste
		 	top.setTimeout(function(){CodePress.syntaxHighlight('generic');},100);
		}
		else if(charCode==99 && evt.ctrlKey)  { // handle cut
		 	//alert(window.getSelection().getRangeAt(0).toString().replace(/\t/g,'FFF'));
		}
		*/
	}
	
}