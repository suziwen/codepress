/**
 * Language
 */

/// put the header of every syntax.js file here

Language = {

	id : 'text',
	name : 'Plain text',
	syntax : [],
	snippets : [],
	complete : [],
	shortcuts : [],
	count : 0,
	
	load : function(language, callback) {
		Language.loadJS(['../languages/'+ language +'/syntax.js', 
					     '../languages/'+ language +'/snippets.js', 
			             '../languages/'+ language +'/complete.js', 
						 '../languages/'+ language +'/shortcuts.js'], callback);

		Language.loadCSS('../languages/'+ language +'/syntax.css');
	},
	
	loadJS : function(url, callback) {
		var head = document.getElementsByTagName('head')[0];
		var ok = false;
		var js = document.createElement('script');
		js.type = 'text/javascript';
		js.src = url[Language.count];

		if(!Language.count) { // store editable value and set it to false
			Language.editable = Editor.editable();
			Editor.editable(false); // can't add script to designMode=on, so turn it off
		}
		
		js.onload = js.onreadystatechange = function() {
			if (!ok && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				ok = true;
				head.removeChild(js);
			
				if(url.length == ++Language.count) {
					Language.count = 0;
					Editor.editable(Language.editable); // return to original editable value
					if(callback) {
						callback.call();						
					}
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
	},
	
	
	// supported languages
	languages : {
	//	csharp 		: 'C#', 
//		css    		: 'CSS', 
		generic 	: 'Generic',
//		html 		: 'HTML',
//		java 		: 'Java', 
		javascript  : 'JavaScript', 
//		perl 		: 'Perl', 
//		ruby 		: 'Ruby',	
//		php 		: 'PHP', 
		text 		: 'Text'
//		sql 		: 'SQL',
//		vbscript 	: 'VBScript'
	}

}
