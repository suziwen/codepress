/**
 * CodePress Shortcuts Plugin
 * 
 * This plugin watch basicly keyboard Shortcuts
 * 
 * ctrl + g : goto line
 * ctrl + d : duplicate line
 * ctrl + l : delete line
 *
 * @author : "Michael Hurni" <michael.hurni@gmail.com>
 */
 
jQuery(function($){

	if(!$.CodePress) return false;

	$.CodePress.Plugins.Shortcuts = function(element)
	{
		this.keyHandler = function(event)
		{
			switch(event.shortcut())
			{
				case "ctrl+g" : this.gotoLine(event); break;
				case "ctrl+d" : this.duplicateLine(event); break;
				case "ctrl+l" : this.deleteLine(event); break;
				default : break;
			}
		}

		this.gotoLine = function(event)
		{
			event.stop();		
			element.gotoline();
		}

		this.duplicateLine = function(event)
		{
			event.stop();		
			element.console.error("Duplicate Line");	
		}

		this.deleteLine = function(event)
		{
			event.stop();		
			element.console.info("Delete Line");	
		}

		this.init = function() {

			element.event.add("keypress",this.keyHandler, this);
			element.event.add("keydown",this.keyHandler, this);
			element.extend({
				gotoline : function(line)
				{
					element.console.info("Goto line called");	
					if(line==null) {
						var line = window.prompt("Go to line ?","");
						if(line==null) return element.console.info("Goto line cancelled");
					}
					
					if(parseInt(line).toString()=="NaN") {
						element.console.warning("Line given is not a valid input","not a number");
						return false;
					}

					var code = element.editor.engine.getEditor().innerHTML;
					var splited = code.split(new RegExp(element.editor.engine.ls));
					
					line = parseInt(line).limit(1,splited.length);
					
					element.console.info("Replace carret to line "+(line));
					
					splited[line-1] = element.editor.engine.cc + splited[line-1];	
					element.editor.engine.getEditor().innerHTML = splited.join(element.editor.engine.ls);
					element.editor.engine.findCaret();
				}
			});
		}
		
		this.init();
	}
});
