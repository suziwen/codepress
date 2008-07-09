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
		if(flag == 'scroll') {
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

			return code.substring(ini, end);
		}
	},		
	
	run : function(flag) {
		//if(document.designMode=='off') document.designMode='on'
		if(flag != 'init')
			window.getSelection().getRangeAt(0).insertNode(document.createTextNode(cc));

		var o, x, z, i, code;
		o = Engine.body.innerHTML;
		o = o.replace(/<br>/g, '\n');
		o = o.replace(/<.*?>/g, '');
		x = z = this.split(o, flag);
		x = x.replace(/\n/g, '<br>');

		if(arguments[1] && arguments[2]) 
			x = x.replace(arguments[1], arguments[2]);
	
		for(i=0; i < Language.syntax.length; i++) 
			x = x.replace(Language.syntax[i].input, Language.syntax[i].output);

		code = Engine.Actions.history[Engine.Actions.next()] = flag == 'scroll' ? 
			x : o.split(z).join(x); 
		
		Engine.body.innerHTML = '<PRE>'+ code +'</PRE>';
		if(flag != 'init') 
			this.findString();
	}
}
