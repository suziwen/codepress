/**
 * @author falves
 */
/**
 * Language
 */
Language = {
	id : 'text',
	name : 'Plain text',
	syntax : [],
	snippets : [],
	complete : [],
	shortcuts : [],
	
	load : function(language, callback) {

		Language.loadJS(['../languages/'+ language +'/syntax.js', 
			'../languages/'+ language +'/snippets.js', 
			'../languages/'+ language +'/complete.js', 
			'../languages/'+ language +'/shortcuts.js'], callback);
			
		Language.loadCSS('../languages/'+ language +'/syntax.css');
	},
	
	loadCount : 0,
	
	loadJS : function(url, callback) {
		var head = document.getElementsByTagName('head')[0];
		var js = document.createElement('script');

		js.type = 'text/javascript';
		js.src = url[Language.loadCount];

		var ok = false;

//		var editable = Editor.editable();
		Editor.editable(false); // can't add script to designMode=on, so turn it off
		
		js.onload = js.onreadystatechange = function() {
			if (!ok && (!this.readyState || 
					this.readyState == "loaded" || 
					this.readyState == "complete")) {

				ok = true;
				head.removeChild(js);
				if(url.length == ++Language.loadCount) {
					alert(1)
					
					Language.loadCount = 0;
					if(callback)
						callback.call();
	
					if(CodePress.onload) { // CodePress onload. Execute once
						CodePress.onload.call();
						CodePress.onload = false;
					}
	//				if(editable) // return to original editable mode
						Editor.editable(true);
						
				}
				else {
					Language.loadJS(url, callback);					
				}
			}
		};
			
		head.appendChild(js);
		
	},

	loadCSS : function(url) {
		var head = document.getElementsByTagName('head')[0];		
		var css = document.createElement('link');
		css.rel = 'stylesheet';
		css.type = 'text/css';
		css.href = url;
		head.appendChild(css);
//		head.removeChild(css);			
	}

}
