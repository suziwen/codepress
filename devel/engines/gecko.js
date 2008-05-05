/*
 * CodePress - Real Time Syntax Highlighting Editor written in JavaScript - http://codepress.org/
 * 
 * Copyright (C) 2007 Fernando M.A.d.S. <fermads@gmail.com>
 *
 * Developers:
 *		Fernando M.A.d.S. <fermads@gmail.com>
 *		Michael Hurni <michael.hurni@gmail.com>
 * Contributors: 	
 *		Martin D. Kirk
 *
 * This program is free software; you can redistribute it and/or modify it under the terms of the 
 * GNU Lesser General Public License as published by the Free Software Foundation.
 * 
 * Read the full licence: http://www.opensource.org/licenses/lgpl-license.php
 */


/**
 * CodePress Engine
 */
Engine = {

	scrolling : false,
	
	init : function() {
		chars = '|32|46|62|', // charcodes that trigger syntax highlighting
		cc = '\u2009', // control char


	//	if(typeof(editor)=='undefined' && !arguments[0]) return;
		this.body = document.getElementsByTagName('body')[0]; // isso nao deve ficar aqui

		window.addEventListener('scroll', function() { 
			if(!Engine.scrolling) 
				Engine.Highlight.run('scroll');
		}, false);

		document.addEventListener('keypress', Engine.keyHandler, true);
		
		Engine.Complete.init();
		Engine.Highlight.run('init');
	},

	// treat key bindings
	keyHandler : function(evt) {
    	var keyCode = evt.keyCode;	
		var charCode = evt.charCode;
		var fromChar = String.fromCharCode(charCode);

		// shortcuts = ctrl||appleKey+shift+key!=z(undo) 
		if((evt.ctrlKey || evt.metaKey) && evt.shiftKey && charCode != 90 && Engine.Shortcuts.active) { 
			Engine.Shortcuts.run(charCode ? charCode : keyCode);
		}
        // auto complete
		else if((completeEndChars.indexOf('|'+fromChar+'|')!= -1 || completeChars.indexOf('|'+fromChar+'|')!=-1) && Engine.Complete.active) {
			if(!Engine.Complete.end(fromChar))
			     Engine.Complete.run(fromChar);
		}
		// syntax highlighting
	    else if(chars.indexOf('|'+charCode+'|')!=-1 || keyCode==13 && Engine.Highlight.active) { 
			top.setTimeout(function() {
				Engine.Highlight.run('generic');
			},100);
		}
		// snippets activation (tab)
		else if((keyCode==9 || evt.tabKey) && Engine.Snippets.active) {  
			Engine.Snippets.run(evt);
		}
		// save to history when delete or backspace pressed
		else if(keyCode==46 || keyCode==8) { 
		 	Engine.Actions.history[Engine.Actions.next()] = this.body.innerHTML;
		}
		// undo and redo
		else if((charCode==122 || charCode==121 || charCode==90) && evt.ctrlKey) { 
			(charCode==121 || evt.shiftKey) ? Engine.Actions.redo() : Engine.Actions.undo(); 
			evt.preventDefault();
		}
		// handle paste
		else if(charCode==118 && evt.ctrlKey)  { 
		 	top.setTimeout(function() {
				Engine.Highlight.run('generic');
			},100);
		}
		// handle cut
		else if(charCode==99 && evt.ctrlKey)  { 
		 	//alert(window.getSelection().getRangeAt(0).toString().replace(/\t/g,'FFF'));
		}
	},

	// readOnly set/get
	editable : function(value) {
		var dm = {'true':'on', 'false':'off'};
		return ((document.designMode = value == undefined ?
			document.designMode : dm[value]) == 'on');
	},

	// get/set code from editor
	code : function(code) {
		if(code) {
			code = code.replace(/\u2009/gi,'');
			code = code.replace(/&/gi,'&amp;');
	       	code = code.replace(/</g,'&lt;');
	        code = code.replace(/>/g,'&gt;');
			this.body.innerHTML = '<pre>'+code+'</pre>';
			Engine.Highlight.run('init');
		}
		else {
			var code = this.body.innerHTML;
			code = code.replace(/<br>/g,'\n');
			code = code.replace(/\u2009/g,'');
			code = code.replace(/<.*?>/g,'');
			code = code.replace(/&lt;/g,'<');
			code = code.replace(/&gt;/g,'>');
			code = code.replace(/&amp;/gi,'&');
			return code;
		}
	}
}



/**
 * CodePress Syntax Highlighting
 */
Engine.Highlight = {
	
	active : true,

	// put cursor back to its original position after every parsing
	findString : function() {
		if(self.find(cc))
			window.getSelection().getRangeAt(0).deleteContents();
	},
	
	// split big files, highlighting parts of it
	split : function(code, flag) {
		if(flag=='scroll') {
			Engine.scrolling = true;
			return code;
		}
		else {
			Engine.scrolling = false;
			var mid = code.indexOf(cc), ini, end;
			if(mid - 2000 < 0) {
				ini = 0;
				end = 4000;
			}
			else if(mid + 2000 > code.length) {
				ini = code.length - 4000;
				end = code.length;
			}
			else {
				ini = mid - 2000;
				end = mid + 2000;
			}

			return code.substring(ini,end);
		}
	},		
	
	run : function(flag) {
		//if(document.designMode=='off') document.designMode='on'
		if(flag != 'init')
			window.getSelection().getRangeAt(0).insertNode(document.createTextNode(cc));

		var o, x, z, i, code;
		o = Engine.body.innerHTML;
		o = o.replace(/<br>/g,'\n');
		o = o.replace(/<.*?>/g,'');
		x = z = this.split(o,flag);
		x = x.replace(/\n/g,'<br>');

		if(arguments[1]&&arguments[2]) 
			x = x.replace(arguments[1],arguments[2]);
	
		for(i=0;i<Language.syntax.length;i++) 
			x = x.replace(Language.syntax[i].input,Language.syntax[i].output);

		code = Engine.Actions.history[Engine.Actions.next()] = flag == 'scroll' ? 
			x : o.split(z).join(x); 
		
		Engine.body.innerHTML = '<PRE>'+code+'</PRE>';
		if(flag != 'init') 
			this.findString();
	}
}


// undo and redo methods
Engine.Actions = {
	pos : -1, // actual history position
	history : [], // history vector
	
	undo : function() {
		if(Engine.body.innerHTML.indexOf(cc)==-1) {
			window.getSelection().getRangeAt(0).insertNode(document.createTextNode(cc));
		 	this.history[this.pos] = Engine.body.innerHTML;
		}
		
		this.pos--;
		
		if(typeof(this.history[this.pos])=='undefined') 
			this.pos++;
		Engine.body.innerHTML = this.history[this.pos];
		Engine.Highlight.findString();
	},
	
	redo : function() {
		this.pos++;
		if(typeof(this.history[this.pos])=='undefined') 
			this.pos--;
		Engine.body.innerHTML = this.history[this.pos];
		Engine.Highlight.findString();
	},
	
	next : function() { // get next vector position and clean old ones
		if(this.pos > 20) 
			this.history[this.pos-21] = undefined;
		return ++this.pos;
	}
}


//window.addEventListener('load', function() { Engine.initialize('new'); }, true);