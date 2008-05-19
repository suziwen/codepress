/**
 * CodePress Indent Plugin
 * 
 * Keep the indentation level on new line
 *
 * @author : "Michael Hurni" <michael.hurni@gmail.com>
 */
 
jQuery(function($){

	if(!$.CodePress) return false;
	
	$.CodePress.Plugins.Indent = function(element)
	{
		this.active = true;
		this.name = "CodePress Indent Plugin";
		
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
			if(evt.shortcut('enter') && this.active)
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
			for (var k=1,l=lines.length;l>k++;)
			{
				if(lines[k].indexOf(element.editor.engine.cc)!=-1) {
					currentLine = lines[k];
					break;
				}
			}
			if(!currentLine) currentLine = code;
			currentLine = currentLine.replace(/<.*?>/g,'').replace(/&nbsp;/g,' ');
			for (i=-1,l=currentLine.length;l>i++;)
			{
				var cChar = currentLine.substr(i,1);
				if(cChar == "\t") indent += "\t";
				else if(cChar == " ") indent+=" ";
				else break;
			}	
			return indent;
		}
		
		this.init();	
	}
});