/*
 * CodePress regular expressions for generic syntax highlighting
 */
 
Language.syntax = [ // generic languages
	{
	pattern : /\"(.*?)(\"|<br>|<\/P>)/g,
	replace : '<s>"$1$2</s>' // strings double quote
	},{
	pattern : /\'(.*?)(\'|<br>|<\/P>)/g,
	replace : '<s>\'$1$2</s>' // strings single quote
	},{
	pattern : /\b(abstract|continue|for|new|switch|default|goto|boolean|do|if|private|this|break|double|protected|throw|byte|else|import|public|throws|case|return|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|const|float|while|function|label)\b/g,
	replace : '<b>$1</b>' // reserved words
	},{
	pattern : /([\(\){}])/g,
	replace : '<em>$1</em>' // special chars;
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
	
		{triger : '\'', content : '\'$0\'' },
		{triger : '"', content : '"$0"' },
		{triger : '(', content : '\($0\)' },
		{triger : '[', content : '\[$0\]' },
		{triger : '{', content : '{\n\t$0\n}' }		
	
	]
}

CodePress.initialize();

