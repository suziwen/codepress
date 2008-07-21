/**
 * CodePress Gecko Engine
 */
Engine.Main = {

	scrolling : false,
	
	init : function() {
		chars = '|32|46|62|', // charcodes that trigger syntax highlighting
		cc = '\u2009', // control char

		document.addEventListener('keypress', Engine.Main.keyHandler, true);
		Engine.Complete.init();
		Engine.Highlight.init();		
	},

	// treat key bindings
	keyHandler : function(evt) {
    	var keyCode = evt.keyCode;	
		var charCode = evt.charCode;
		var fromChar = String.fromCharCode(charCode);

		// shortcuts = ctrl||appleKey+shift+key!=z(undo) 
		if((evt.ctrlKey || evt.metaKey) && evt.shiftKey && charCode != 90) { 
			Engine.Shortcuts.run(charCode ? charCode : keyCode);
		}
        // auto complete
		else if(Engine.Complete.endChars.indexOf('|'+ fromChar +'|') != -1 || 
			 	Engine.Complete.chars.indexOf('|'+ fromChar +'|') != -1) {
			if(!Engine.Complete.end(fromChar))
			     Engine.Complete.run(fromChar);
		}
		// syntax highlighting
	    else if(chars.indexOf('|'+ charCode +'|') != -1 || keyCode == 13) { 
			top.setTimeout(function() {
				Engine.Highlight.run('generic');
			}, 100);
		}
		// snippets activation (tab)
		else if(keyCode == 9 || evt.tabKey) {  
			Engine.Snippets.run(evt);
		}
		// save to history when delete or backspace pressed
		else if(keyCode == 46 || keyCode == 8) { 
		 	Engine.Actions.history[Engine.Actions.next()] = Engine.body.innerHTML;
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
			}, 100);
		}
		// handle cut
		else if(charCode == 99 && evt.ctrlKey)  { 
		 	//alert(window.getSelection().getRangeAt(0).toString().replace(/\t/g,'FFF'));
		}
	},

	// editable set/get (readOnly)
	editable : function(value) {
		var dm = {'true':'on', 'false':'off'};
		return ((document.designMode = value == undefined ?
			document.designMode : dm[value]) == 'on');
	},

	// get/set code from editor
	code : function(code) {
		if(code) {
			code = code.replace(/\u2009/gi, '');
			code = code.replace(/&/gi, '&amp;');
	       	code = code.replace(/</g, '&lt;');
	        code = code.replace(/>/g, '&gt;');
			Engine.body.innerHTML = '<pre>'+ code +'</pre>';
			Engine.Highlight.run('init');
		}
		else {
			var code = Engine.body.innerHTML;
			code = code.replace(/<br>/g, '\n');
			code = code.replace(/\u2009/g, '');
			code = code.replace(/<.*?>/g, '');
			code = code.replace(/&lt;/g, '<');
			code = code.replace(/&gt;/g, '>');
			code = code.replace(/&amp;/gi, '&');
			return code;
		}
	}
}

Editor.include('engines.gecko.highlight');
Editor.include('engines.gecko.complete');
Editor.include('engines.gecko.actions');
Editor.include('engines.gecko.shortcuts');
Editor.include('engines.gecko.snippets');

