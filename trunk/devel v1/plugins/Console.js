if(!CodePress.Plugins) CodePress.Plugins = {}

CodePress.Plugins.Console = function(element)
{
	this.name = "Console beta";
	this.init = function()
	{
		this.console = new Console(element);
		element.event.add("highlight",this.highlightHandler, this);
		element.event.add("keypress",this.keyHandler, this);
		element.event.add("keydown",this.keyHandler, this);
	}
	
	/**
	 * Key Handler
	 */	
	this.keyHandler = function(evt)
	{
		var items = [
			{"name" : "keycode" , "value" : evt.keyCode },
			{"name" : "charcode", "value" : evt.charCode},
			{"name" : "ctrlKey" , "value" : evt.ctrlKey  ?"true":"false"},
			{"name" : "metaKey" , "value" : evt.metaKey  ?"true":"false"},
			{"name" : "shiftKey", "value" : evt.shiftKey ?"true":"false"}
		];
		
		var content = "";
		
		items.each(function(item) {
			content += item.name+" : "+item.value + "<br/>";
		});
		
		this.console.log(evt.type+" event","info",content);
		
	}
	
	/**
	 * Highlight Handler
	 */
	this.highlightHandler = function()
	{
		this.console.log("highlight","info");
	}
	
	
	if(browser.code == 'gecko') this.init();	
}

Popup = function(config)
{
	return window.open(config.location,config.name,config.arguments);
}

Console = function(element)
{
	this.popup = new Popup({
		location : element.config.plugins_dir + "Console/Console.htm",
		name : "CodePress Console for " + element.id,
		arguments : 'width=450,height=300,scrollbars=no'
	});
	
	this.popup.window.loaded = false;
	
	if(!this.popup)
	{
		alert("Debug console loading fail, check your popup blocker");
		return null;
	}

	this.log = function (title,level,message)
	{
		this.console = this.popup.document.getElementById("console");
		if(!this.console || !this.popup.window.loaded) {
			var bind = this;
			window.setTimeout(function() {bind.log(title,level,message);},200);
			return false;
		}
		
		var item = document.createElement("li");
		item.className = level;
		
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

};