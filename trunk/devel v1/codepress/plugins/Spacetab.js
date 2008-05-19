if(!CodePress.Plugins) CodePress.Plugins = {}

String.prototype.repeat = function(number)
{
	var value = "";
	for(var i=0;i<number;i++) value += this.toString();
	return value;
}

CodePress.Plugins.Spacetab = function(element)
{
	this.tabLength = 4;
	this.active = true;
	
	var WHITE_SPACE = " ";
	
	this.keyHandler = function(evt)
	{
		if(evt.shortcut('tab') && this.active) {
			evt.stop();
			element.editor.engine.insert(WHITE_SPACE.repeat(this.tabLength));
		}
	}
	
	this.init = function()
	{
		element.event.add("keypress",this.keyHandler, this);
		element.event.add("keydown",this.keyHandler, this);
		
		element.extend({
			useSpace : function() { this.plugins.Spacetab.active = true; },
			useTab   : function() { this.plugins.Spacetab.active = false; },
			spacify  : function() {	this.plugins.Spacetab.spacify(); }
		});
	}
	
	this.spacify = function()
	{
		element.editor.engine.setCode(element.editor.engine.getCode().replace(/\t/g,WHITE_SPACE.repeat(this.tabLength)),true);
		element.editor.engine.initialize();
	}

	this.init();
}