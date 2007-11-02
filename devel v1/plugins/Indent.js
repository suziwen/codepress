if(!CodePress.Plugins) CodePress.Plugins = {}

CodePress.Plugins.Indent = function(element) {

	this.tabIndent = true;
	this.spaceIdent = true;
	
	this.init = function()
	{
		this.lastKeyCode = false;
				
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
		this.lastKeyCode = evt.keyCode;
	}
	
	/**
	 * Highlight Handler
	 */
	this.highlightHandler = function(engine)
	{
		if(this.lastKeyCode == 13)
		{
			if(!this.cc) this.cc = element.editor.engine.cc.replace("&","&amp;");
			var code = engine.getEditor().innerHTML;
			code = code.replace(this.cc,element.editor.engine.ls+this.getIndent(code)+this.cc);
			engine.getEditor().innerHTML = code;
		}
		this.lastKeyCode = false;
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