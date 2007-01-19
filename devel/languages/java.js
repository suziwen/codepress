/*
 * CodePress regular expressions for Java syntax highlighting
 */
 
Language.syntax = [ // Java
	{
	pattern : /\"(.*?)(\"|<br>|<\/P>)/g,
	replace : '<s>"$1$2</s>' // strings double quote
	},{
	pattern : /\'(.*?)(\'|<br>|<\/P>)/g,
	replace : '<s>\'$1$2</s>' // strings single quote
	},{
	pattern : /\b(abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/g,
	replace : '<b>$1</b>' // reserved words
	},{
	pattern : /([^:]|^)\/\/(.*?)(<br|<\/P)/g,
	replace : '$1<i>//$2</i>$3' // comments //	
	},{
	pattern : /\/\*(.*?)\*\//g,
	replace : '<i>/*$1*/</i>' // comments /* */
	}
];

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

//CodePress.initialize('new');