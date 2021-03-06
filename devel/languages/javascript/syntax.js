/**
 * CodePress syntax for Javascript
 */

//Language.id = 'javascript';
//Language.name = 'JavaScript';

Language.syntax = [ 
	// strings double quote
	{	
		i : /\"(.*?)(\"|<br>|<\/P>)/g, 
		o : '<s>"$1$2</s>' 
	}, 
	// strings single quote
	{	
		i : /\'(.*?)(\'|<br>|<\/P>)/g, 
		o : '<s>\'$1$2</s>' 
	},
	// reserved words
	{ 
		i : /\b(break|continue|do|for|new|this|void|case|default|else|function|return|typeof|while|if|label|switch|var|with|catch|boolean|int|try|false|throws|null|true|goto)\b/g, 
		o : '<b>$1</b>' 
	}, 
	// special words
	{ 
		i : /\b(alert|isNaN|parent|Array|parseFloat|parseInt|blur|clearTimeout|prompt|prototype|close|confirm|length|Date|location|Math|document|element|name|self|elements|setTimeout|navigator|status|String|escape|Number|submit|eval|Object|event|onblur|focus|onerror|onfocus|onclick|top|onload|toString|onunload|unescape|open|valueOf|window|onmouseover)\b/g, 
		o : '<u>$1</u>' 
	}, 
	// comments (//)
	{ 
		i : /([^:]|^)\/\/(.*?)(<br|<\/P)/g, 
		o : '$1<i>//$2</i>$3' 
	},
	// comments (/* */)
	{ 
		i : /\/\*(.*?)\*\//g, 
		o : '<i>/*$1*/</i>' 
	}
];
