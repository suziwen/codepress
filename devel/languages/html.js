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
	
		{triger : 'aref', content : '<a href="$0"></a>' },
		{triger : 'h1', content : '<h1>$0</h1>' },
		{triger : 'h2', content : '<h2>$0</h2>' },
		{triger : 'h3', content : '<h3>$0</h3>' },
		{triger : 'h4', content : '<h4>$0</h4>' },
		{triger : 'h5', content : '<h5>$0</h5>' },
		{triger : 'h6', content : '<h6>$0</h6>' },
		{triger : 'html', content : '<html>\n\t$0\n</html>' },
		{triger : 'head', content : '<head>\n\t<meta http-equiv="Content-type" content="text/html; charset=utf-8" />\n\t<title>$0</title>\n\t\n</head>' },
		{triger : 'img', content : '<img src="$0" alt="" />' },
		{triger : 'input', content : '<input name="$0" id="" type="" value="" />' },
		{triger : 'label', content : '<label for="$0"></label>' },
		{triger : 'legend', content : '<legend>\n\t$0\n</legend>' },
		{triger : 'link', content : '<link rel="stylesheet" href="$0" type="text/css" media="screen" charset="utf-8" />' },		
		{triger : 'base', content : '<base href="$0" />' }, 
		{triger : 'body', content : '<body>\n\t$0\n</body>' }, 
		{triger : 'css', content : '<link rel="stylesheet" href="$0" type="text/css" media="screen" charset="utf-8" />' },
		{triger : 'div', content : '<div id="$0">\n\t\n</div>' },
		{triger : 'dl', content : '<dl>\n\t<dt>\n\t\t$0\n\t</dt>\n\t<dd></dd>\n</dl>' },
		{triger : 'fieldset', content : '<fieldset>\n\t$0\n</fieldset>' },
		{triger : 'form', content : '<form action="" method="" name="">\n\t$0\n</form>' },
		{triger : 'meta', content : '<meta name="$0" content="" />' },
		{triger : 'p', content : '<p>$0</p>' },
		{triger : 'script', content : '<script type="text/javascript" language="javascript" charset="utf-8">\n\t$0\t\n</script>' },
		{triger : 'scriptsrc', content : '<script src="$0" type="text/javascript" language="javascript" charset="utf-8"></script>' },
		{triger : 'span', content : '<span>$0</span>' },
		{triger : 'table', content : '<table border="$0" cellspacing="" cellpadding="">\n\t<tr><th></th></tr>\n\t<tr><td></td></tr>\n</table>' },
		{triger : 'style', content : '<style type="text/css" media="screen">\n\t$0\n</style>' }
			
	],
	
	key : [
	
		{triger : '\'', content : '\'$0\'' },
		{triger : '"', content : '"$0"' },
		{triger : '(', content : '\($0\)' },
		{triger : '[', content : '\[$0\]' },
		{triger : '{', content : '{\n\t$0\n}' }		
	
	]
};

CodePress.initialize();

