if(!CodePress.Plugins) CodePress.Plugins = {}

CodePress.Plugins.Indent = function(element) {

	this.tabIndent = true;
	this.spaceIdent = true;
	this.active = true;
	
	this.init = function()
	{
		this.sameKeyCode = false;
		this.lastKeyCode = false;
		this.currentKeyCode = false;

		element.event.add("keypress",this.keyHandler, this);
		element.event.add("keydown",this.keyHandler, this);
	}

	/**
	 * Key Handler
	 */	
	this.keyHandler = function(evt)
	{
		if(evt.shortcut('return') && this.active)
		{
			evt.stop();
			element.editor.engine.raiseCaret();
			var code = element.editor.engine.getEditor().innerHTML;
			code = code.replace(element.editor.engine.cc,element.editor.engine.ls+this.getIndent(code)+element.editor.engine.cc);	
			element.editor.engine.getEditor().innerHTML = code;
			element.editor.engine.findCaret();
		}
	}

	/**
	 * getIndent method
	 * @param string code
	 * @return string indentation as string of the current line
	 */	
	this.getIndent = function(code)
	{
		var lines = code.split(element.editor.engine.ls);
		var indent = currentLine = "";
		for (k=1;k<lines.length;k++)
		{
			if(lines[k].indexOf(element.editor.engine.cc)!=-1) {
				currentLine = lines[k];
				break;
			}
		}
		if(!currentLine) currentLine = code;
		currentLine = currentLine.replace(/<.*?>/g,'');
		for (i=-1,l=currentLine.length;l>i++;)
		{
			var cChar = currentLine.substr(i,1);
			if(this.tabIndent && cChar == "\t") indent += "\t";
			else if(this.spaceIdent && cChar == " ") indent+=" ";
			else break;
		}	
		return indent;
	}
	
	this.init();	
}