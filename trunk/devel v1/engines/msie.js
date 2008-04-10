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
 
CodePress = {}
Language = {}

CodePress.Engine = function(element) {
	var engine = this;
	
	engine.initialize = function() {
		engine.name = "msie";
		engine.scrolling = false;
		engine.blocsize = 4000;
		engine.autocomplete = true;		
		editor = engine.getEditor();
			
		document.attachEvent('onkeypress', engine.keyHandler);
		document.attachEvent('onkeydown' , engine.metaHandler);
		
		window.attachEvent('onscroll', function() {
			if(!engine.scrolling) engine.highlight('scroll');
		});
 		
		chars = '|32|46|62|'; // charcodes that trigger syntax highlighting
		engine.cc = '¤'; // caret char
		// completeChars = this.getCompleteChars();
		// completeEndingChars =  this.getCompleteEndingChars();
		
		engine.highlight('init');
	}
	
	engine.getEditor = function() {
	
		return document.getElementsByTagName('body')[0];
		
		if(!document.getElementsByTagName('pre')[0]) {
			body = document.getElementsByTagName('body')[0];
			body.innerHTML = "<pre>"+body.innerHTML+"</pre>";
		}
		editor = document.getElementsByTagName('pre')[0];
		return editor;
	}
	
	// syntax highlighting parser
	engine.highlight = function(flag) {
		//if(document.designMode=='off') document.designMode='on'
		if(flag!='init') document.selection.createRange().text = engine.cc;
		
		editor = engine.getEditor();
		o = editor.innerHTML;
		o = o.replace(/<P>/g,'\n');
		o = o.replace(/<\/P>/g,'\r');
		o = o.replace(/<.*?>/g,'');
		o = o.replace(/&nbsp;/g,'');			
		o = '<PRE><P>'+o+'</P></PRE>';
		o = o.replace(/\n\r/g,'<P></P>');
		o = o.replace(/\n/g,'<P>');
		o = o.replace(/\r/g,'<\/P>');
		o = o.replace(/<P>(<P>)+/,'<P>');
		o = o.replace(/<\/P>(<\/P>)+/,'</P>');
		o = o.replace(/<P><\/P>/g,'<P><BR/></P>');
		x = z = this.split(o,flag);
		x = x.replace(/\n/g,'<br>');

		if(arguments[1]&&arguments[2]) x = x.replace(arguments[1],arguments[2]);
	
		for(i=0;i<Language[engine.language].syntax.length;i++) 
			x = x.replace(Language[engine.language].syntax[i].input,Language[engine.language].syntax[i].output);
 // = this.actions.history[this.actions.next()]
		editor.innerHTML = (flag=='scroll') ? x : o.split(z).join(x);

		if(flag!='init') engine.findCaret();
		
	}
	
	engine.findCaret = function() {
		range = self.document.body.createTextRange();
		if(range.findText(engine.cc)){
			range.select();
			range.text = '';
			range.select();
		}
	}

	// split big files, highlighting parts of it
	engine.split = function(code,flag)
	{
		if(flag=='scroll') {
			this.scrolling = true;
			return code;
		}
		else {
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
			return code.substring(code.indexOf('<P>'),code.lastIndexOf('</P>')+4);
		}
	}
	
	// get code from editor
	engine.getCode = function() {
		if(!document.getElementsByTagName('pre')[0] || editor.innerHTML == '')
			editor = CodePress.getEditor();
		var code = editor.innerHTML;
		code = code.replace(/<br>/g,'\n');
		code = code.replace(/\u2009/g,'');
		code = code.replace(/<.*?>/g,'');
		code = code.replace(/&lt;/g,'<');
		code = code.replace(/&gt;/g,'>');
		code = code.replace(/&amp;/gi,'&');
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
		engine.getEditor().innerHTML = '<pre>'+code+'</pre>';
		engine.getEditor().contentEditable = true;
		if (code == '')
			document.getElementsByTagName('body')[0].innerHTML = '';
	},
	
	engine.metaHandler = function(evt) {
		element.event.fire("keydown",evt);
	}
	
	engine.keyHandler = function(evt) {
		element.event.fire("keypress",evt);
		
    	keyCode = evt.keyCode;	
		charCode = evt.charCode;
		fromChar = String.fromCharCode(charCode);
		/*
		if((evt.ctrlKey || evt.metaKey) && evt.shiftKey && charCode!=90)  { // shortcuts = ctrl||appleKey+shift+key!=z(undo) 
			engine.shortcuts(charCode?charCode:keyCode);
		}
		else if( (completeEndingChars.indexOf('|'+fromChar+'|')!= -1 || completeChars.indexOf('|'+fromChar+'|')!=-1) && CodePress.autocomplete) { // auto complete
			if(!CodePress.completeEnding(fromChar))
			     CodePress.complete(fromChar);
		}
	    else */
		
		if(chars.indexOf('|'+charCode+'|')!=-1||keyCode==13) { // syntax highlighting
			
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