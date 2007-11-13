/**
 * CodePress Console Plugin
 * 
 * This plugin watch basicly keyevents, engine.highlight calls, language change.
 * It extends the [element] with some methods that allow writing
 * into the console from outside the plugin
 * 
 * Usage
 *		[element].console.info(title[,content])
 *		[element].console.warning(title[,content])
 *		[element].console.log(title[,content[,CSSlevel = 'info']])
 *
 * @author : "Michael Hurni" <michael.hurni@gmail.com>
 */

if(!CodePress.Plugins) CodePress.Plugins = {}
CodePress.Plugins.Console = function(element)
{
	this.name = "Console beta";

	this.init = function()
	{
		element.console = new Console(element); // extends element
		
		element.event.add("highlight",function() {
			element.console.info("highlight");
		},this);
		
		element.event.add("languageChange",function() {
			element.console.info("Language changed to " + element.language.value);
		},this);
		
		element.event.add("keypress",this.keyHandler, this);
		element.event.add("keydown",this.keyHandler, this);
	}
	
	/**
	 * Key Watching
	 */	
	this.keyHandler = function(evt)
	{
		var items = [
			{"name" : "keycode" , "value" : evt.keyCode },
			{"name" : "charcode", "value" : evt.charCode ? evt.charCode+" ("+String.fromCharCode(evt.charCode)+")":0},
			{"name" : "ctrlKey" , "value" : evt.ctrlKey  ? "true" : "false"},
			{"name" : "metaKey" , "value" : evt.metaKey  ? "true" : "false"},
			{"name" : "shiftKey", "value" : evt.shiftKey ? "true" : "false"},
			{"name" : "altKey"  , "value" : evt.altKey ? "true" : "false"}
		];
		
		var content = "";
		
		items.each(function(item) {
			content += item.name+" : "+item.value + "<br/>";
		});
		
		element.console.info(evt.type+" event",content);
		
	}
	
	if(browser.code == 'gecko') this.init(); // Only on Gecko for now
}

/**
 * Console Factory
 * This Class is separated to allow develop of other Console (e.g : inline Console) 
 */
 
Console = function(element)
{
	this.popup = new Console.popup({
		name : "CodePress Console for " + element.type + " #" + element.id,
		location : element.config.plugins_dir + "Console/Console.htm",
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
		this.console.scrollTop = this.console.scrollHeight;
		return true;
	}

}

Console.popup = function(config)
{
	var options = "";
	for(var i in config.options)
		if(typeof config.options[i] != "function")
			options += i + "=" + config.options[i] + ",";

	return window.open(config.location,config.name,options);
}