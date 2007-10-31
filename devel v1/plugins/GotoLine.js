if(!CodePress.Plugins) CodePress.Plugins = {}

CodePress.Plugins.GotoLine = function(element) {

	this.keyHandler = function(evt)
	{
		if(evt.charCode==103 && evt.ctrlKey) // CTRL + G
		{
			evt.stop();
			
			var line = window.prompt("Goto to line");
			
			if(line!=null) {
			
				var code = element.editor.engine.getEditor().innerHTML;
				var splited = code.split(new RegExp(element.editor.engine.ls));
				
				line = parseInt(line);
				
				if(line > splited.length) line = splited.length;
				if(line < 1) line = 1;
				
				splited[line-1] = element.editor.engine.cc + splited[line-1];
				
				element.editor.engine.getEditor().innerHTML = splited.join(element.editor.engine.ls);
				element.editor.engine.findCaret();
			
			}
		
		}
		
	}
	
	element.event.add("keypress",this.keyHandler, this);
	element.event.add("keydown",this.keyHandler, this);
}