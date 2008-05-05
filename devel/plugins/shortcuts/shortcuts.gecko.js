/**
 * CodePress Shortcuts
 */
Engine.Shortcuts = {
	
	active : true,
	
	run : function() {
		var cCode = arguments[0];
		if(cCode==13) 
			cCode = '[enter]';
		else if(cCode==32) 
			cCode = '[space]';
		else 
			cCode = '['+String.fromCharCode(charCode).toLowerCase()+']';
			
		for(var i=0;i<Language.shortcuts.length;i++)
			if(Language.shortcuts[i].input == cCode)
				this.insertCode(Language.shortcuts[i].output, false);
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