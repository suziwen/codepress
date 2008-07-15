/**
 * CodePress Snippets
 */
Engine.Snippets = {
	
	active : true,
	
	run : function(evt) {
		var snippets = Language.snippets;	
		var trigger = this.getLastWord();
		
		for (var i = 0; i < snippets.length; i++) {
			if(snippets[i].i == trigger) {
				var content = snippets[i].o.replace(/</g, '&lt;');
				content = content.replace(/>/g, '&gt;');
				if(content.indexOf('$0') < 0) 
					content += cc;
				else 
					content = content.replace(/\$0/, cc);
					
				content = content.replace(/\n/g, '<br>');
				var pattern = new RegExp(trigger + cc, 'gi');
				evt.preventDefault(); // prevent the tab key from being added
				Engine.Highlight.run('snippets', pattern, content);
			}
		}
	},
	
	getLastWord : function() {
		var rangeAndCaret = this.getRangeAndCaret();
		words = rangeAndCaret[0].substring(rangeAndCaret[1] - 40, rangeAndCaret[1]);
		words = words.replace(/[\s\n\r\);\W]/g, '\n').split('\n');
		return words[words.length - 1].replace(/[\W]/gi, '').toLowerCase();
	},
	
	getRangeAndCaret : function() {	
		var range = window.getSelection().getRangeAt(0);
		var range2 = range.cloneRange();
		var node = range.endContainer;			
		var caret = range.endOffset;
		range2.selectNode(node);
		return [range2.toString(), caret];
	}

}
