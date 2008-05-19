/**
 * CodePress AutoSave Plugin
 *
 * AutoSave Base Plugin and Ctrl+S Handler
 *
 * @usage 
 *    [element].plugins.AutoSave.save = function() {
 *		  // Ajax stuff
 *	  }
 *
 * @package CodePress Plugins
 * @author  "Michael Hurni" <michael.hurni@gmail.com>
 */

jQuery(function($){

	if(!$.CodePress) return false;

	$.CodePress.Plugins.AutoSave = function(element) {

		this.active = true;
		this.periodicalSave  = true;
		this.periodicalDelay = 10000; // 10 secondes

		this.init = function()
		{
			element.event.add("plugins.loaded", function(){
				if(this.active) this.lastSave = (new Date()).getTime();
			}, this);

			element.event.add("keypress",this.keyHandler, this);
			element.event.add("keydown",this.keyHandler, this);
		}

		this.keyHandler = function(event)
		{	
			if(!this.active) return false;
			
			if(event.shortcut("ctrl+s")) {
				event.stop();
				element.console.info("Saving");
				this._save();
			}
			
			else if(this.periodicalSave)
			{
				var time = new Date();
				if(time.getTime() > (this.getLastSave() + this.periodicalDelay)) {
					element.console.info("Periodical Saving");
					this._save();
				}
			}	
		}
		
		this.save = function()
		{
			// need to be overwritted
		}	
		
		this._save = function()
		{
			var code = element.engine.getCode();
			var time = new Date();
			this.lastSave = time.getTime();
			this.save();
		}
		
		this.getLastSave = function()
		{
			return this.lastSave;
		}
		
		this.init();
		
	}
});