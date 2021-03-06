/**
 * CodePress Advanced Console Plugin
 * 
 * This plugin watch basicly keyevents, engine.highlight calls, language change.
 * It improve the native console using a popup 
 * 
 * Usage
 *		[element].console.info(title[,content])
 *		[element].console.warning(title[,content])
 *		[element].console.error(title[,content])
 *		[element].console.log(title[,content[,CSSlevel = 'info']])
 *
 * @author	"Michael Hurni" <michael.hurni@gmail.com>
 * @todo 	a factory to create popup or firebug logger
 */
 
jQuery(function($){

	if(!$.CodePress) return false;
	
	$.CodePress.Plugins.Console = function(element)
	{
		this.name = "CodePress Advanced Console";
		
		this.init = function()
		{
			element.console = new jQuery.CodePress.Console(element); // overwrite the native console
			
			element.event.add("highlight",function() {
				element.console.info("highlight");
			},this);
			
			element.event.add("keypress",this.keyHandler, this);
			element.event.add("keydown",this.keyHandler, this);
			
			element.event.add("languageChange",function() {
				element.console.info("Language changed to " + element.language.value);
			},this);
			
		}
		
		/**
		 * Key Watching
		 */	
		this.keyHandler = function(evt)
		{
			var items = [
				{"name" : "keycode" , "value" : evt.keyCode },
				{"name" : "charcode", "value" : evt.charCode ? evt.charCode+" ("+evt.toChar()+")":0},
				{"name" : "ctrlKey" , "value" : evt.ctrlKey  ? "true" : "false"},
				{"name" : "metaKey" , "value" : evt.metaKey  ? "true" : "false"},
				{"name" : "shiftKey", "value" : evt.shiftKey ? "true" : "false"},
				{"name" : "altKey"  , "value" : evt.altKey ? "true" : "false"},
				{"name" : "shortcut"  , "value" : evt.shortcut(false)}
			];
			
			var content = "";
			
			items.each(function(item) {
				content += item.name+" : "+item.value + "<br/>";
			});
			
			element.console.info(evt.type+" event",content);
			
		}
		
		if(jQuery.CodePress.browser.code == 'gecko') this.init(); // Only on Gecko for now
	}

	/**
	 * Console Factory
	 * This Class is separated to allow develop of other Console (e.g : inline Console) 
	 */
	 
	$.CodePress.Console = function(element)
	{
		this.popup = new jQuery.CodePress.Console.popup({
			name : "CodePress Console for " + element.type + " #" + element.id,
			location : element.util.getPath() + element.config.plugins_dir + "Console/Console.htm",
			options : {
				'width'      : 450,
				'height'     : 300,
				'scrollbars' : 'yes'
			}
		});
		
		this.popup.window.loaded = false;
		
		if(!this.popup)
		{
			alert("Debug console loading fail, check your popup blocker");
			return null;
		}
		
		this.info = function(title,message) {
			this.log(title,message,"info");
		}

		this.warning = function(title,message) {
			this.log(title,message,"warning");
		}

		this.error = function(title,message) {
			this.log(title,message,"warning");
			alert(title+"\n"+message);
		}
		
		this.log = function (title,message,level)
		{
			if(!this.popup.document) return false; // popup was closed
			
			this.console = this.popup.document.getElementById("console");

			if(!this.console || !this.popup.window.loaded) {
				var bind = this;
				window.setTimeout(function() {bind.log(title,message,level);},200);
				return false;
			}
			
			var item = document.createElement("li");
			item.className = level || 'info';
			
			var titleElement = document.createElement("h2");
			titleElement.innerHTML = title;
			item.appendChild(titleElement);
			
			if(message) 
			{
				var messageElement = document.createElement("span");
				messageElement.innerHTML = message;
				item.appendChild(messageElement);
			}
			
			this.console.appendChild(item);
			this.popup.window.onresize();
			return true;
		}

	}

	$.CodePress.Console.popup = function(config)
	{
		var options = "";
		for(var i in config.options)
			if(typeof config.options[i] != "function")
				options += i + "=" + config.options[i] + ",";

		return window.open(config.location,config.name,options);
	}
});