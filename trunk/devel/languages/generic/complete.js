/**
 * CodePress auto-complete for generic languages
 */

Language.complete = [
	{ 
		i : '\'', 
		o : '\'$0\'' 
	},
	
	{ 
		i : '"', 
		o : '"$0"' 
	},
	
	{ 
		i : '(', 
		o : '\($0\)' 
	},
	
	{ 
		i : '[', 
		o : '\[$0\]' 
	},
	
	{ 
		i : '{', 
		o : '{\n\t$0\n}' 
	}
];