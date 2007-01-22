/*
 * CodePress regular expressions for HTML syntax highlighting
 */

Language.syntax = [ // HTML
	{
	pattern : /(&lt;[^!]*?&gt;)/g,
	replace : '<b>$1</b>' // all tags
	},{
	pattern : /(&lt;a .*?&gt;|&lt;\/a&gt;)/g,
	replace : '<a>$1</a>' // links
	},{
	pattern : /(&lt;img .*?&gt;)/g,
	replace : '<big>$1</big>' // images
	},{
	pattern : /(&lt;\/?(button|textarea|form|input|select|option|label).*?&gt;)/g,
	replace : '<u>$1</u>' // forms
	},{
	pattern : /(&lt;style.*?&gt;)(.*?)(&lt;\/style&gt;)/g,
	replace : '<em>$1</em><em>$2</em><em>$3</em>' // style tags
	},{
	pattern : /(&lt;script.*?&gt;)(.*?)(&lt;\/script&gt;)/g,
	replace : '<strong>$1</strong><tt>$2</tt><strong>$3</strong>' // script tags
	},{
	pattern : /=(".*?")/g,
	replace : '=<s>$1</s>' // atributes double quote
	},{
	pattern : /=('.*?')/g,
	replace : '=<s>$1</s>' // atributes single quote
	},{
	pattern : /(&lt;!--.*?--&gt.)/g,
	replace : '<ins>$1</ins>' // comments 
	},{
	pattern : /\b(alert|window|document|break|continue|do|for|new|this|void|case|default|else|function|return|typeof|while|if|label|switch|var|with|catch|boolean|int|try|false|throws|null|true|goto)\b/g,
	replace : '<i>$1</i>' // script reserved words
	}	
]

Language.bundles = {

	tab : [
	
		{trigger : 'aref', content : '<a href="$0"></a>' },
		{trigger : 'h1', content : '<h1>$0</h1>' },
		{trigger : 'h2', content : '<h2>$0</h2>' },
		{trigger : 'h3', content : '<h3>$0</h3>' },
		{trigger : 'h4', content : '<h4>$0</h4>' },
		{trigger : 'h5', content : '<h5>$0</h5>' },
		{trigger : 'h6', content : '<h6>$0</h6>' },
		{trigger : 'html', content : '<html>\n\t$0\n</html>' },
		{trigger : 'head', content : '<head>\n\t<meta http-equiv="Content-type" content="text/html; charset=utf-8" />\n\t<title>$0</title>\n\t\n</head>' },
		{trigger : 'img', content : '<img src="$0" alt="" />' },
		{trigger : 'input', content : '<input name="$0" id="" type="" value="" />' },
		{trigger : 'label', content : '<label for="$0"></label>' },
		{trigger : 'legend', content : '<legend>\n\t$0\n</legend>' },
		{trigger : 'link', content : '<link rel="stylesheet" href="$0" type="text/css" media="screen" charset="utf-8" />' },		
		{trigger : 'base', content : '<base href="$0" />' }, 
		{trigger : 'body', content : '<body>\n\t$0\n</body>' }, 
		{trigger : 'css', content : '<link rel="stylesheet" href="$0" type="text/css" media="screen" charset="utf-8" />' },
		{trigger : 'div', content : '<div id="$0">\n\t\n</div>' },
		{trigger : 'dl', content : '<dl>\n\t<dt>\n\t\t$0\n\t</dt>\n\t<dd></dd>\n</dl>' },
		{trigger : 'fieldset', content : '<fieldset>\n\t$0\n</fieldset>' },
		{trigger : 'form', content : '<form action="" method="" name="">\n\t$0\n</form>' },
		{trigger : 'meta', content : '<meta name="$0" content="" />' },
		{trigger : 'p', content : '<p>$0</p>' },
		{trigger : 'script', content : '<script type="text/javascript" language="javascript" charset="utf-8">\n\t$0\t\n</script>' },
		{trigger : 'scriptsrc', content : '<script src="$0" type="text/javascript" language="javascript" charset="utf-8"></script>' },
		{trigger : 'span', content : '<span>$0</span>' },
		{trigger : 'table', content : '<table border="$0" cellspacing="" cellpadding="">\n\t<tr><th></th></tr>\n\t<tr><td></td></tr>\n</table>' },
		{trigger : 'style', content : '<style type="text/css" media="screen">\n\t$0\n</style>' }
			
	],
	
	key : [
	
		{trigger : '\'', content : '\'$0\'' },
		{trigger : '"', content : '"$0"' },
		{trigger : '(', content : '\($0\)' },
		{trigger : '[', content : '\[$0\]' },
		{trigger : '{', content : '{\n\t$0\n}' }		
	
	]
};

CodePress.initialize();

