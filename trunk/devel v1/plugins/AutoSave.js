/**
 * AutoSave Base Plugin and Ctrl+S Handler
 * @package: CodePress Plugins
 * @author: Michael Hurni
 */
 
if(!CodePress.Plugins) CodePress.Plugins = {}

CodePress.Plugins.AutoSave = function(element) {

	this.periodicalSave  = false;
	this.periodicalDelay = 20000; // 20 secondes

	this.init = function()
	{
		var time = new Date();
		this.lastSave = time.getTime();
		element.event.add("keypress",this.keyHandler, this);
		element.event.add("keydown",this.keyHandler, this);
	}

	this.keyHandler = function(evt)
	{	
		if(	evt.charCode==115 && evt.ctrlKey || 	// Gecko
			evt.keyCode==83 && evt.ctrlKey)			// Msie
		{
			evt.stop();
			this.save();
		}
		
		else if(this.periodicalSave)
		{
			var time = new Date();
			if(time.getTime() > (this.getLastSave() + this.periodicalDelay))
			{
				this.save();
			}
		}	
	}
	
	this.save = function()
	{
		var code = element.engine.getCode();
		var time = new Date();
		this.lastSave = time.getTime();
		
		alert("Saving...");
		// Here your script //
	}
	
	this.getLastSave = function()
	{
		return this.lastSave;
	}
	
	this.init();
	
}