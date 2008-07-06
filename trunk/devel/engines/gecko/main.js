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
		else if((completeEndChars.indexOf('|'+ fromChar +'|') != -1 || completeChars.indexOf('|'+ fromChar +'|') != -1) && Engine.Complete.active) {
			if(!Engine.Complete.end(fromChar))
			     Engine.Complete.run(fromChar);
		}
		// syntax highlighting
	    else if(chars.indexOf('|'+ charCode +'|') != -1 || keyCode == 13 && Engine.Highlight.active) { 
			top.setTimeout(function() {
				Engine.Highlight.run('generic');
			},100);
		}
		// snippets activation (tab)
		else if((keyCode == 9 || evt.tabKey) && Engine.Snippets.active) {  
			Engine.Snippets.run(evt);
		}
		// save to history when delete or backspace pressed
		else if(keyCode == 46 || keyCode == 8) { 
		 	Engine.Actions.history[Engine.Actions.next()] = this.body.innerHTML;
		}
		// undo and redo
		else if((charCode == 122 || charCode == 121 || charCode == 90) && evt.ctrlKey) { 
			(charCode == 121 || evt.shiftKey) ? Engine.Actions.redo() : Engine.Actions.undo(); 
			evt.preventDefault();
		}
		// handle paste
		else if(charCode == 118 && evt.ctrlKey)  { 
		 	top.setTimeout(function() {
				Engine.Highlight.run('generic');
			},100);
		}
		// handle cut
		else if(charCode == 99 && evt.ctrlKey)  { 
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


