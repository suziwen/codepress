/**
 * CodePress syntax for generic languages
 */

//Language.id = 'generic';
//Language.name = 'Generic';

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
		i : /\b(abstract|continue|for|new|switch|default|goto|boolean|do|if|private|this|break|double|protected|throw|byte|else|import|public|throws|case|return|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|const|float|while|function|label)\b/g, 
		o : '<b>$1</b>' 
	},
	// special chars;
	{ 
		i : /([\(\){}])/g, 
		o : '<em>$1</em>' 
	}, 
	// comments //
	{ 
		i : /([^:]|^)\/\/(.*?)(<br|<\/P)/g, 
		o : '$1<i>//$2</i>$3' 
	}, 
	// comments /* */
	{ 
		i : /\/\*(.*?)\*\//g, 
		o : '<i>/*$1*/</i>' 
	} 
];