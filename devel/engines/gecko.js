/*
 * CodePress - Real Time Syntax Highlighting Editor written in JavaScript - http://codepress.fermads.net/
 * 
 * Copyright (C) 2007 Fernando M.A.d.S. <fermads@gmail.com>
 *
 * Contributors :
 *
 * 	Michael Hurni <michael.hurni@gmail.com>
 *
 * This program is free software; you can redistribute it and/or modify it under the terms of the 
 * GNU Lesser General Public License as published by the Free Software Foundation.
 * 
 * Read the full licence: http://www.opensource.org/licenses/lgpl-license.php
 */


CodePress = {
	range : null,
	language : null,
	scrolling : false,

	// set initial vars and start sh
	initialize : function() {
		if(typeof(editor)=='undefined'&&!arguments[0]) return;
//		this.detect();
		chars = '|13|32|191|57|48|187|188|'; // charcodes that trigger syntax highlighting
		cc = '\u2009'; // control char
		editor = document.getElementById('code');
		document.designMode = 'on';
		document.addEventListener('keydown', this.keyHandler, true);
		window.addEventListener('scroll', function() { if(!CodePress.scrolling) CodePress.syntaxHighlight('scroll') }, false);
		parent.CodePress.initialize();
//		this.syntaxHighlight('init');
	},

	// treat key bindings
	keyHandler : function(evt) {
		evt = (evt) ? evt : (window.event) ? event : null;
	  	
	  	if(evt) {
	    	top.document.title = charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));	
			if(charCode==32 && evt.shiftKey)  { // non-breaking space
				CodePress.insertCode("&nbsp;",false);
			}
			else if(((charCode>48 && charCode<65) || charCode>187 ) && charCode != 192 && charCode != 224 && ((evt.ctrlKey && evt.altKey) || (!evt.ctrlKey && !evt.altKey))) {
				if(CodePress.language != "text") {
					top.window.setTimeout(function () { CodePress.putBundles(CodePress.getLastChar(),"key"); },4);
				}   
			}
			else if(charCode==9 || evt.tabKey) {  // Tab Activation
				if(CodePress.language != "text") {
					top.window.setTimeout(function () {	CodePress.putBundles(CodePress.getLastWord(),"tab"); },4);	
				}
			}
		    if((chars.indexOf('|'+charCode+'|')!=-1) && (!evt.tabKey && !evt.altKey)) { // syntax highlighting
			 	CodePress.syntaxHighlight('generic');
			}
			else if(charCode==46||charCode==8) { // save to history when delete or backspace pressed
			 	CodePress.actions.history[CodePress.actions.next()] = editor.innerHTML;
			}
			else if((charCode==90||charCode==89) && evt.ctrlKey) { // undo and redo
				(charCode==89||evt.shiftKey) ? CodePress.actions.redo() : CodePress.actions.undo() ;
				evt.preventDefault();
			}
			else if(charCode==86 && evt.ctrlKey)  { // paste
				// TODO: pasted text should be parsed and highlighted
			}
		}
	},

	// put cursor back to its original position after every parsing
	findString : function() {
		if(self.find(cc))
			window.getSelection().getRangeAt(0).deleteContents();
	},
	
	// split big files, highlighting parts of it
	split : function(code,flag) {
		if(flag=='scroll') {
			this.scrolling = true;
			return code;
		}
		else {
			this.scrolling = false;
			mid = code.indexOf(cc);
			if(mid-2000<0) {ini=0;end=4000;}
			else if(mid+2000>code.length) {ini=code.length-4000;end=code.length;}
			else {ini=mid-2000;end=mid+2000;}
			code = code.substring(ini,end);
			return code;
		}
	},
	
	// syntax highlighting parser
	syntaxHighlight : function(flag) {
		if(document.designMode=='off') document.designMode='on'
		var preParse = this.prepareParsing(flag);
		var x = preParse[0];
		var z = preParse[1];
		
		for(i=0;i<Language.syntax.length;i++) 
			x = x.replace(Language.syntax[i].pattern,Language.syntax[i].replace);

		editor.innerHTML = this.actions.history[this.actions.next()] = (flag=='scroll') ? x : o.replace(z,x);
		if(flag!='init') this.findString();
	},

	// undo and redo methods
	actions : {
		pos : -1, // actual history position
		history : [], // history vector
		
		undo : function() {
			if(editor.innerHTML.indexOf(cc)==-1){
				window.getSelection().getRangeAt(0).insertNode(document.createTextNode(cc));
			 	this.history[this.pos] = editor.innerHTML;
			}
			this.pos--;
			if(typeof(this.history[this.pos])=='undefined') this.pos++;
			editor.innerHTML = this.history[this.pos];
			CodePress.findString();
		},
		
		redo : function() {
			this.pos++;
			if(typeof(this.history[this.pos])=='undefined') this.pos--;
			editor.innerHTML = this.history[this.pos];
			CodePress.findString();
		},
		
		next : function() { // get next vector position and clean old ones
			if(this.pos>20) this.history[this.pos-21] = undefined;
			return ++this.pos;
		}
	},

	getLastChar : function() {
		var rangeAndCaret = CodePress.getRangeAndCaret();
		return rangeAndCaret[0].substr(rangeAndCaret[1]-1,1);
	},

	getLastWord : function() {
		var rangeAndCaret = CodePress.getRangeAndCaret();
		var s = rangeAndCaret[0].substr(0,rangeAndCaret[1]);
		s = s.replace(/<.*?>/g,' ');
			
		s = s.replace(/\'/g,' ');
		s = s.replace(/\"/g,' ');
		s = s.replace(/\n/g,' ');
		s = s.replace(/\r/g,' ');
		s = (s.substr(s.length-1,1)=="\t") ? s.substr(0,s.length-1) : s;
		s = s.replace(/\t/g,' ');
		
		// use a char who is never used in as snippet
		sentence = s.replace(/ /g,'\u2008');
		words = sentence.split('\u2008');
		return words[words.length-1];
		
	},
	
	putBundles : function(triger,event) {
		var bundle = Language.bundles[event];
		for (var i=0; i<bundle.length; i++) {
			if(bundle[i].triger == triger) {
				var preParse = this.prepareParsing("generic");
				var x = preParse[0];
				var z = preParse[1];
	
				content = bundle[i].content.replace(/</g,'&lt;');
				content = content.replace(/>/g,'&gt;');
				content = content.replace(/\$0/g,cc);
				
				content = content.replace(/\n/g,'<br>');
				
				var postTriger = (event=='tab') ? "\t" : "";
				var escape = (event=='key') ? "\\" : "";

				var pattern = new RegExp(escape+triger+postTriger+cc,"g");

				x = x.replace(pattern,content);

				for(j=0;j<Language.syntax.length;j++) 
					x = x.replace(Language.syntax[j].pattern,Language.syntax[j].replace);

				editor.innerHTML = this.actions.history[this.actions.next()] = o.replace(z,x);
				this.findString();
				return true;
			}
		}
	},
	
	prepareParsing : function(flag) {
		if(flag!='init') window.getSelection().getRangeAt(0).insertNode(document.createTextNode(cc));
		o = editor.innerHTML;
		o = o.replace(/<br>/g,'\n');
		o = o.replace(/<.*?>/g,'');
		o = o.replace(/\u2008/g,'<br>');
		o = o.replace(/\u2007/g,'\t');
		x = z = this.split(o,flag);
		x = x.replace(/\n/g,'<br>');
		return [x,z,flag];
	
	},
	
	getRangeAndCaret : function() {	
		var r1 = window.getSelection().getRangeAt(0);
		var range = r1.cloneRange();
		var node = range.endContainer;			
		var caret = range.endOffset;
		range.selectNode(node);	
		return new Array(range.toString(),caret);
	},
	
	insertCode : function(code,replaceCursorBefore) {
		var r = window.getSelection().getRangeAt(0);
		var n = window.document.createTextNode(code);
		var s = window.getSelection();
		var r2 = r.cloneRange();
		// Insert text at cursor position
		s.removeAllRanges();
		r.deleteContents();
		r.insertNode(n);
		
		// Move the cursor to the end of text
		r2.selectNode(n);		
		r2.collapse(replaceCursorBefore);
		s.removeAllRanges();
		s.addRange(r2);
	}
}

Language={};
window.addEventListener('load', function() { CodePress.initialize('new'); }, true);