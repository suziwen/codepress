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
	language : null,
	scrolling : false,

	// set initial vars and start sh
	initialize : function() {
		if(typeof(editor)=='undefined'&&!arguments[0]) return;
		chars = '|32|46|62|'; // charcodes that trigger syntax highlighting
		cc = '\u2009'; // control char
		editor = document.getElementById('code');
		document.designMode = 'on';
		document.addEventListener('keypress', this.keyHandler, true);
		window.addEventListener('scroll', function() { if(!CodePress.scrolling) CodePress.syntaxHighlight('scroll') }, false);
		completeChars = this.getCompleteChars();
		parent.CodePress.initialize();
		this.language = parent.CodePress.language;
	},

	getCompleteChars : function() {
		var cChars = '';
		for(var i=0;i<Language.complete.length;i++)
			cChars += '|'+Language.complete[i].input;
		return cChars+'|';
	},

	shortcuts : function() {
		var cCode = arguments[0];
		if(cCode==13) cCode = '[enter]';
		else if(cCode==32) cCode = '[space]';
		else cCode = '['+String.fromCharCode(charCode).toLowerCase()+']';
		for(var i=0;i<Language.shortcuts.length;i++)
			if(Language.shortcuts[i].input == cCode)
				this.insertCode(Language.shortcuts[i].output,false);
	},
	
	// treat key bindings
	keyHandler : function(evt) {
	  	if(evt) {
	    	keyCode = evt.keyCode;	
			charCode = evt.charCode;
			top.document.title = 'charCode='+charCode+' keyCode='+keyCode;

			if((evt.ctrlKey || evt.metaKey) && evt.shiftKey && charCode!=90)  { // shortcuts = ctrl||appleKey+shift+key!=z(undo) 
				CodePress.shortcuts(charCode?charCode:keyCode);
			}
			else if(completeChars.indexOf('|'+String.fromCharCode(charCode)+'|')!=-1 && parent.CodePress.complete) { // auto complete
				window.getSelection().getRangeAt(0).deleteContents();
				CodePress.syntaxHighlight('complete',String.fromCharCode(charCode),evt);
			}
		    else if(chars.indexOf('|'+charCode+'|')!=-1||keyCode==13) { // syntax highlighting
			 	CodePress.syntaxHighlight('generic');
			}
			else if(keyCode==9 || evt.tabKey) {  // snippets activation (tab)
				CodePress.syntaxHighlight('snippets',evt);
			}
			else if(keyCode==46||keyCode==8) { // save to history when delete or backspace pressed
			 	CodePress.actions.history[CodePress.actions.next()] = editor.innerHTML;
			}
			else if((charCode==122||charCode==121||charCode==90) && evt.ctrlKey) { // undo and redo
				(charCode==121||evt.shiftKey) ? CodePress.actions.redo() :  CodePress.actions.undo(); 
				evt.preventDefault();
			}
			else if(keyCode==86 && evt.ctrlKey)  { // paste
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
		if(flag!='init') window.getSelection().getRangeAt(0).insertNode(document.createTextNode(cc));

		o = editor.innerHTML;
		o = o.replace(/<br>/g,'\n');
		o = o.replace(/<.*?>/g,'');
//		o = o.replace(/\u2008/g,'<br>');
//		o = o.replace(/\u2007/g,'\t');
		x = z = this.split(o,flag);
		x = x.replace(/\n/g,'<br>');
		
		if(flag=='snippets') x = this.snippets(arguments[1]);
		if(flag=='complete') x = this.complete(arguments[1],arguments[2]);
	
		for(i=0;i<Language.syntax.length;i++) 
			x = x.replace(Language.syntax[i].input,Language.syntax[i].output);

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

	/*
	getLastChar : function() {
		var rangeAndCaret = CodePress.getRangeAndCaret();
		alert(rangeAndCaret)
		return rangeAndCaret[0].substr(rangeAndCaret[1]-1,1);
	},
*/
	
	getLastWord : function() {
		var rangeAndCaret = this.getRangeAndCaret();
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
	
	snippets : function(evt) {
		var trigger = this.getLastWord();
		for (var i=0; i<Language.snippets.length; i++) {
			if(Language.snippets[i].input == trigger) {
				var content = Language.snippets[i].output.replace(/</g,'&lt;');
				content = content.replace(/>/g,'&gt;');
				content = content.replace(/\$0/g,cc);
				content = content.replace(/\n/g,'<br>');
				var pattern = new RegExp(trigger+cc,"g");
				evt.preventDefault(); // prevent the tab key from being added
				return x.replace(pattern,content);
			}
		}
		return x;
	},

	complete : function(trigger,evt) {
		for (var i=0; i<Language.complete.length; i++) {
			if(Language.complete[i].input == trigger) {
				var pattern = new RegExp(cc);
				evt.preventDefault(); // prevent the key from being added
				return x.replace(cc,Language.complete[i].output.replace(/\$0/g,cc));
			}
		}
		return x;
	},
	
	getRangeAndCaret : function() {	
		var range = window.getSelection().getRangeAt(0);
		var range2 = range.cloneRange();
		var node = range.endContainer;			
		var caret = range.endOffset;
		range2.selectNode(node);	
		return [range2.toString(),caret];
	},
	
	insertCode : function(code,replaceCursorBefore) {
		var range = window.getSelection().getRangeAt(0);
		var node = window.document.createTextNode(code);
		var selct = window.getSelection();
		var range2 = range.cloneRange();
		// Insert text at cursor position
		selct.removeAllRanges();
		range.deleteContents();
		range.insertNode(node);
		// Move the cursor to the end of text
		range2.selectNode(node);		
		range2.collapse(replaceCursorBefore);
		selct.removeAllRanges();
		selct.addRange(range2);
	}
}

Language={};
window.addEventListener('load', function() { CodePress.initialize('new'); }, true);