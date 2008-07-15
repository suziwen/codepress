/**
 * CodePress Auto-Complete
 */
Engine.Complete = {
	
	active : true,
	
	init : function() {
		completeChars = this.getChars();
		completeEndChars = this.getEndChars();
	},

	run : function(trigger) {
		window.getSelection().getRangeAt(0).deleteContents();
		var complete = Language.complete;
		for (var i = 0; i < complete.length; i++) {
			if(complete[i].i == trigger) {
				var pattern = new RegExp('\\'+ trigger + cc);
				var content = complete[i].o.replace(/\$0/g, cc);
				parent.setTimeout(function() { 
					Engine.Highlight.run('complete', pattern, content)
				}, 0); // wait for char to appear on screen
			}
		}
	},

	getChars : function() {
		var cChars = '';
		for(var i = 0; i < Language.complete.length; i++)
			cChars += '|'+Language.complete[i].i;
		return cChars +'|';
	},
	
	getEndChars : function() {
		var cChars = '';
		for(var i = 0; i < Language.complete.length; i++)
			cChars += '|'+ Language.complete[i].o.charAt(Language.complete[i].o.length - 1);
		return cChars +'|';
	},
	
	end : function(trigger) {
		var range = window.getSelection().getRangeAt(0);
		try {
			range.setEnd(range.endContainer, range.endOffset + 1);
		}
		catch(e) {
			return false;
		}
		var nextChar = range.toString();
		range.setEnd(range.endContainer, range.endOffset - 1);
		if(nextChar != trigger) {
			return false;			
		}
		else {
			range.setEnd(range.endContainer, range.endOffset + 1)
			range.deleteContents();
			return true;
		}
	}
}