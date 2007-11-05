if(!CodePress.Plugins) CodePress.Plugins = {}

CodePress.Plugins.Debug = function(element) {

	this.name = "Debug Console beta";
	
	this.init = function()
	{
		this.debugOuput = window.open("","codepress_console_"+element.id,"width=450,height=300,scrollbars=no");
		if(!this.debugOuput) alert("Debug console loading fail, check your popup blocker");
		
		this.debugOuput.document.title = "codepress_console_"+element.id;
		style = document.createElement("style");
		style.innerHTML = "* {font-family:Tahomas;font-size:11pt;}";
		style.innerHTML += "#debug {overflow:auto !important;overflow:scroll;height:270}";
		style.innerHTML += "h1 {background:#ffdebe;font-family:Trebuchet MS;font-size:13pt;margin:0;height:30px;padding-left:5px;}";
		style.innerHTML += "ul {border:3px solid #fffeae;background:#ffeeae;margin:0; padding-left:5px;}";
		style.innerHTML += "li {margin:0;padding:0}";
		style.innerHTML += "body {background:#FFFFCC;margin:0}";
		style.innerHTML += "h2 {font-family:Trebuchet MS;font-size:11pt;margin:0;padding-left:5px;}";
	
		this.debugOuput.document.getElementsByTagName("head")[0].appendChild(style);
		
		if(!this.debugOuput.document.getElementById("title")) {
			var title = document.createElement("h1");
			title.id = "title";
			this.debugOuput.document.getElementsByTagName("body")[0].appendChild(title);
		}
		
		this.debugOuput.document.getElementById("title").innerHTML = "Debug Console for : "+element.id;
		
		if(!this.debugOuput.document.getElementById("debug")) {
			var debug = document.createElement("div");
			debug.id = "debug";
			this.debugOuput.document.getElementsByTagName("body")[0].appendChild(debug);
		}
		
		element.event.add("highlight",this.highlightHandler, this);
		element.event.add("keypress",this.keyHandler, this);
		element.event.add("keydown",this.keyHandler, this);
	}
	
	/**
	 * Key Handler
	 */	
	this.keyHandler = function(evt)
	{
		var info = document.createElement("div");
		var title = document.createElement("h2");
		title.innerHTML = evt.type + " event";
		info.appendChild(title);

		var ul = document.createElement("ul");
		
		var items = [
			{"name" : "keycode" , "value" : evt.keyCode },
			{"name" : "charcode", "value" : evt.charCode},
			{"name" : "ctrlKey" , "value" : evt.ctrlKey  ?"true":"false"},
			{"name" : "metaKey" , "value" : evt.metaKey  ?"true":"false"},
			{"name" : "shiftKey", "value" : evt.shiftKey ?"true":"false"}
		];
		
		items.each(function(item) {
			var li = document.createElement("li");
			li.innerHTML = item.name+" : "+item.value;
			ul.appendChild(li);
		});
		
		info.appendChild(ul);
	
		this.debugOuput.document.getElementById("debug").appendChild(info);
		
	}
	
	/**
	 * Highlight Handler
	 */
	this.highlightHandler = function()
	{
		var info = document.createElement("div");
		var title = document.createElement("h2");
		title.innerHTML = "Highlight";
		info.appendChild(title);
		
		this.debugOuput.document.getElementById("debug").appendChild(info);
		
	}
	
	
	if(browser.code == 'gecko') this.init();	
}