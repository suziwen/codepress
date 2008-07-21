/**
 * CodePress line numbers
 */
Engine.Lines = {
	
	active : true,
	
	init : function() {
		window.addEventListener('scroll', function() { 
			lines.scrollTop = window.pageYOffset;			
		}, false);

		self.innerHTML = '<div id="lines-'+self.timeStamp+'" style="padding:5px 2px 0 0;background:#eee;width:34px;height:100%;overflow:hidden;text-align:right;font-family:monospace;font-size:13px;white-space:pre;line-height:16px;color:gray;border-right:1px solid silver;float:left;"></div><div style="float:right;height:100%;width:'+(self.textarea.clientWidth-20)+'px"></div>'
	},

	run : function() { 
	},
	
	write : function() {
		for(var i = 1, numbers = ''; i < 2000; i++) 
			numbers += i +'\n';
			
		lines.appendChild(document.createTextNode(numbers));
		lines.scrollTop = window.pageYOffset;
	}
}