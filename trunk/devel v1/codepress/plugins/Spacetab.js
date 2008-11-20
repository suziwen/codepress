/**
 * CodePress Spacetab Plugin
 * 
 * Replace Tab by Spaces
 *
 * Others usage : 
 *   [element].tabify()
 *   [element].spacify()
 *   [element].useTab()
 *   [element].useSpace()
 *
 * @author : "Michael Hurni" <michael.hurni@gmail.com>
 */
 
jQuery(function($){

	if(!$.CodePress) return false;

	$.CodePress.Plugins.Spacetab = function(element)
	{
		this.tabLength = 4;
		this.active = true;
		this.spacifyOnLoad = true;
		
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
						
			// element.event.add("plugins.loaded", function(){
				if(this.spacifyOnLoad) this.spacify(true);
			// }, this);
			
			element.extend({
				useSpace : function() { this.plugins.Spacetab.active = true; },
				useTab   : function() { this.plugins.Spacetab.active = false; },
				spacify  : function() {	this.plugins.Spacetab.spacify(); },
				tabify   : function() {	this.plugins.Spacetab.tabify(); }
			});
		}
		
		this.spacify = function( noreload /*=false*/)
		{
			var code = element.editor.engine.getCode().replace(/\t/g,WHITE_SPACE.repeat(this.tabLength));
			element.editor.engine.setCode(code,true);
			if(!noreload) element.editor.engine.initialize();
		}
		
		this.tabify = function()
		{
			var code = element.editor.engine.getCode().replace(new RegExp(WHITE_SPACE.repeat(this.tabLength),"g"),"\t");
			element.editor.engine.setCode(code,true);
			if(!noreload) element.editor.engine.initialize();
		}
		
		this.init();
	}
});