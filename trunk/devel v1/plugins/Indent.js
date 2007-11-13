if(!CodePress.Plugins) CodePress.Plugins = {}

CodePress.Plugins.Indent = function(element) {

	this.tabIndent = true;
	this.spaceIdent = true;
	
	this.init = function()
	{
		this.sameKeyCode = false;
		this.lastKeyCode = false;
		this.currentKeyCode = false;
				
		element.event.add("highlight",this.highlightHandler, this);
		element.event.add("keypress",this.keyHandler, this);
		element.event.add("keydown",this.keyHandler, this);
	}
	
	/**
	 * Key Handler
	 */	
	this.keyHandler = function(evt)
	{
		if(evt.keyCode==13) evt.stop();
		this.sameKeyCode = (this.lastKeyCode==evt.keyCode);
		this.lastKeyCode = evt.keyCode;
		this.currentKeyCode = evt.keyCode;
	}
	
	/**
	 * Highlight Handler
	 */
	this.highlightHandler = function()
	{
		if(this.currentKeyCode == 13)
		{
			if(!this.cc) this.cc = element.editor.engine.cc;
			var code = element.editor.engine.getEditor().innerHTML;
			this.indent = (this.sameKeyCode?this.indent:this.getIndent(code));
			code = code.replace(this.cc,element.editor.engine.ls+this.indent+this.cc);
			element.editor.engine.getEditor().innerHTML = code;
		}
		this.currentKeyCode = false;
	}
	
	/**
	 * getIndent method
	 * @return indentation as string of the current line
	 */	
	this.getIndent = function(code)
	{
		var lines = code.split(element.editor.engine.ls);
		var indent = currentLine = "";
		for (k=1;k<lines.length;k++)
		{
			if(lines[k].indexOf(this.cc)!=-1) {
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