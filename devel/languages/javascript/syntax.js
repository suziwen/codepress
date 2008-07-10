/*
 * CodePress Syntax for Javascript
 */

Language.id = 'javascript';
Language.name = 'JavaScript';

Language.syntax = [ 
	// strings double quote
	{	
		input : /\"(.*?)(\"|<br>|<\/P>)/g, 
		output : '<s>"$1$2</s>' 
	}, 

	// strings single quote
	{	
		input : /\'(.*?)(\'|<br>|<\/P>)/g, 
		output : '<s>\'$1$2</s>' 
	},
	
	// reserved words
	{ 
		input : /\b(break|continue|do|for|new|this|void|case|default|else|function|return|typeof|while|if|label|switch|var|with|catch|boolean|int|try|false|throws|null|true|goto)\b/g, 
		output : '<b>$1</b>' 
	}, 
	
	// special words
	{ 
		input : /\b(alert|isNaN|parent|Array|parseFloat|parseInt|blur|clearTimeout|prompt|prototype|close|confirm|length|Date|location|Math|document|element|name|self|elements|setTimeout|navigator|status|String|escape|Number|submit|eval|Object|event|onblur|focus|onerror|onfocus|onclick|top|onload|toString|onunload|unescape|open|valueOf|window|onmouseover)\b/g, 
		output : '<u>$1</u>' 
	}, 

	// comments (//)
	{ 
		input : /([^:]|^)\/\/(.*?)(<br|<\/P)/g, 
		output : '$1<i>//$2</i>$3' 
	},
	 
	// comments (/* */)
	{ 
		input : /\/\*(.*?)\*\//g, 
		output : '<i>/*$1*/</i>' 
	}
];
