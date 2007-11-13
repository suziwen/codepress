if(!CodePress.Plugins) CodePress.Plugins = {}

Number.prototype.toString = function ()
{
	return this+"";
}

Number.prototype.limit = function(min,max)
{
	return (this < min) ? min : (this > max) ? max : this;
}

CodePress.Plugins.GotoLine = function(element) {

	this.keyHandler = function(evt)
	{
		if(evt.fromChar("g") && evt.ctrlKey) // from Char
		{
			evt.stop();		
			if(element.console) element.console.info("Goto line called");	
			var line = window.prompt("Go to line ?");
			
			if(line!=null)
			{
				var code = element.editor.engine.getEditor().innerHTML;
				var splited = code.split(new RegExp(element.editor.engine.ls));
				
				line = parseInt(line);
				
				if(line.toString()=="NaN") {
					if(element.console) element.console.warning("Line invalid (not a number)","Line changed to 1");
					line = 1;
				}
				else line = line.limit(1,splited.length);
				
				if(element.console) element.console.info("Replace carret to line "+(line));
				
				splited[line-1] = element.editor.engine.cc.replace("&","&amp;") + splited[line-1];	
				element.editor.engine.getEditor().innerHTML = splited.join(element.editor.engine.ls);
				element.editor.engine.findCaret();
			}
			else if(element.console) element.console.warning("Goto line cancelled");
		}
	}
	
	element.event.add("keypress",this.keyHandler, this);
	element.event.add("keydown",this.keyHandler, this);
}