/*
 * CodePress regular expressions for CSS syntax highlighting
 */

Language.syntax = [ // CSS
	{ 
	pattern : /(.*?){(.*?)}/g,
	replace : '<b>$1</b>{<u>$2</u>}' // tags, ids, classes, values
	},{ 
	pattern : /([\w-]*?):([^\/])/g,
	replace : '<a>$1</a>:$2' // keys
	},{ 
	pattern : /\((.*?)\)/g,
	replace : '(<s>$1</s>)' // parameters
	},{ 
	pattern : /\/\*(.*?)\*\//g,
	replace : '<i>/*$1*/</i>' // comments
	}
]

Language.bundles = {

	tab : [],
	key : []

}

CodePress.initialize();

