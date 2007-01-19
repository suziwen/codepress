/*
 * CodePress regular expressions for PHP syntax highlighting
 */

Language.syntax = [ // PHP
	{
	pattern : /(&lt;[^!\?]*?&gt;)/g,
	replace : '<b>$1</b>' // all tags
	},{
	pattern : /(&lt;style.*?&gt;)(.*?)(&lt;\/style&gt;)/g,
	replace : '<em>$1</em><em>$2</em><em>$3</em>' // style tags
	},{
	pattern : /(&lt;script.*?&gt;)(.*?)(&lt;\/script&gt;)/g,
	replace : '<ins>$1</ins><ins>$2</ins><ins>$3</ins>'  // script tags
	},{
	pattern : /\"(.*?)(\"|<br>|<\/P>)/g,
	replace : '<s>"$1$2</s>' // strings double quote
	},{
	pattern : /\'(.*?)(\'|<br>|<\/P>)/g,
	replace : '<s>\'$1$2</s>' // strings single quote
	},{
	pattern : /(&lt;\?)/g,
	replace : '<strong>$1' // <?.*
	},{
	pattern : /(\?&gt;)/g,
	replace : '$1</strong>' // .*?>
	},{
	pattern : /(&lt;\?php|&lt;\?=|&lt;\?|\?&gt;)/g,
	replace : '<cite>$1</cite>' // php tags
	},{
	pattern : /(\$[\w\.]*)/g,
	replace : '<a>$1</a>' // vars
	},{
	pattern : /\b(false|true|and|or|xor|__FILE__|exception|__LINE__|array|as|break|case|class|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|for|foreach|function|global|if|include|include_once|isset|list|new|print|require|require_once|return|static|switch|unset|use|while|__FUNCTION__|__CLASS__|__METHOD__|final|php_user_filter|interface|implements|extends|public|private|protected|abstract|clone|try|catch|throw|this)\b/g,
	replace : '<u>$1</u>' // reserved words
	},{
	pattern : /([^:])\/\/(.*?)(<br|<\/P)/g,
	replace : '$1<i>//$2</i>$3' // php comments //
	},{
	pattern : /\/\*(.*?)\*\//g,
	replace : '<i>/*$1*/</i>' // php comments /* */
	},{
	pattern : /(&lt;!--.*?--&gt.)/g,
	replace : '<big>$1</big>' // html comments
	}
]

Language.bundles = {

	tab : [
	
		{triger : 'if', content : 'if($0){\n\t\n}' },
		{triger : 'do', content : 'do{\n\t$0\n}\nwhile();' },
		{triger : 'while', content : 'while($0){\n\t\n}' },
		{triger : 'whil', content : 'while($0){\n\t\n}' },
		{triger : 'echo', content : 'echo \'$0\';' },
		{triger : 'eco', content : 'echo \'$0\';' },
		{triger : 'switch', content : 'switch($0) {\n\tcase "": break;\n\tdefault: ;\n}' }	
	
	],
	key : [
	
		{triger : '\'', content : '\'$0\'' },
		{triger : '"', content : '"$0"' },
		{triger : '(', content : '\($0\)' },
		{triger : '[', content : '\[$0\]' },
		{triger : '{', content : '{\n\t$0\n}' }		
	
	]
}

CodePress.initialize();

