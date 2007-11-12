if(!CodePress.Plugins) CodePress.Plugins = {}

CodePress.Plugins.GotoLine = function(element) {

	this.keyHandler = function(evt)
	{
		if(evt.charCode==103 && evt.ctrlKey) // CTRL + G
		{
			evt.stop();
			
			if(element.console) element.console.info("Goto line called");
			
			var line = window.prompt("Go to line ?");
			
			if(line!=null) {
			
				var code = element.editor.engine.getEditor().innerHTML;
				var splited = code.split(new RegExp(element.editor.engine.ls));
				
				var input = line = parseInt(line);
				
				if(line > splited.length) {
					line = splited.length;
					if(element.console) element.console.warning("Line invalid ("+input+")","Line changed to "+(line));
				}
				if(line < 1 || !line) {
					line = 1;
					if(element.console) element.console.warning("Line invalid ("+input+")","Line changed to "+(line));
				}
				
				if(element.console) element.console.info("Replace carret to line "+(line));
				
				splited[line-1] = element.editor.engine.cc.replace("&","&amp;") + splited[line-1];
				
				element.editor.engine.getEditor().innerHTML = splited.join(element.editor.engine.ls);
				element.editor.engine.findCaret();
			
			}
		
		}
		
	}
	
	element.event.add("keypress",this.keyHandler, this);
	element.event.add("keydown",this.keyHandler, this);
}