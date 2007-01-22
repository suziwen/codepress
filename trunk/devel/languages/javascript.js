/*
 * CodePress regular expressions for JavaScript syntax highlighting
 */
 
Language.syntax = [ // JavaScript
	{ 
	pattern : /\"(.*?)(\"|<br>|<\/P>)/g, 
	replace : '<s>"$1$2</s>' // strings double quote
	},{ 
	pattern : /\'(.*?)(\'|<br>|<\/P>)/g,
	replace : '<s>\'$1$2</s>' // strings single quote
	},{ 
	pattern : /\b(break|continue|do|for|new|this|void|case|default|else|function|return|typeof|while|if|label|switch|var|with|catch|boolean|int|try|false|throws|null|true|goto)\b/g,
	replace : '<b>$1</b>' // reserved words
	},{ 
	pattern : /\b(alert|isNaN|parent|Array|parseFloat|parseInt|blur|clearTimeout|prompt|prototype|close|confirm|length|Date|location|Math|document|element|name|self|elements|setTimeout|navigator|status|String|escape|Number|submit|eval|Object|event|onblur|focus|onerror|onfocus|onclick|top|onload|toString|onunload|unescape|open|valueOf|window|onmouseover)\b/g,
	replace : '<u>$1</u>' // special words
	},{
	pattern : /([^:]|^)\/\/(.*?)(<br|<\/P)/g,
	replace : '$1<i>//$2</i>$3' // comments //
	},{ 
	pattern : /\/\*(.*?)\*\//g,
	replace : '<i>/*$1*/</i>' // comments /* */
	}
]

Language.bundles = {
	tab : [],
	key : [
		{ trigger : '\'', content : '\'$0\'' },
		{ trigger : '"',  content : '"$0"' },
		{ trigger : '(',  content : '\($0\)' },
		{ trigger : '[',  content : '\[$0\]' },
		{ trigger : '{',  content : '{\n\t$0\n}' }		
	]
}
