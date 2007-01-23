/*
 * CodePress regular expressions for PHP syntax highlighting
 */

Language.syntax = [ // PHP
	{
	input : /(&lt;[^!\?]*?&gt;)/g,
	output : '<b>$1</b>' // all tags
	},{
	input : /(&lt;style.*?&gt;)(.*?)(&lt;\/style&gt;)/g,
	output : '<em>$1</em><em>$2</em><em>$3</em>' // style tags
	},{
	input : /(&lt;script.*?&gt;)(.*?)(&lt;\/script&gt;)/g,
	output : '<ins>$1</ins><ins>$2</ins><ins>$3</ins>'  // script tags
	},{
	input : /\"(.*?)(\"|<br>|<\/P>)/g,
	output : '<s>"$1$2</s>' // strings double quote
	},{
	input : /\'(.*?)(\'|<br>|<\/P>)/g,
	output : '<s>\'$1$2</s>' // strings single quote
	},{
	input : /(&lt;\?)/g,
	output : '<strong>$1' // <?.*
	},{
	input : /(\?&gt;)/g,
	output : '$1</strong>' // .*?>
	},{
	input : /(&lt;\?php|&lt;\?=|&lt;\?|\?&gt;)/g,
	output : '<cite>$1</cite>' // php tags
	},{
	input : /(\$[\w\.]*)/g,
	output : '<a>$1</a>' // vars
	},{
	input : /\b(false|true|and|or|xor|__FILE__|exception|__LINE__|array|as|break|case|class|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|for|foreach|function|global|if|include|include_once|isset|list|new|print|require|require_once|return|static|switch|unset|use|while|__FUNCTION__|__CLASS__|__METHOD__|final|php_user_filter|interface|implements|extends|public|private|protected|abstract|clone|try|catch|throw|this)\b/g,
	output : '<u>$1</u>' // reserved words
	},{
	input : /([^:])\/\/(.*?)(<br|<\/P)/g,
	output : '$1<i>//$2</i>$3' // php comments //
	},{
	input : /\/\*(.*?)\*\//g,
	output : '<i>/*$1*/</i>' // php comments /* */
	},{
	input : /(&lt;!--.*?--&gt.)/g,
	output : '<big>$1</big>' // html comments
	}
]

Language.snippets = [
	{input : 'if', output : 'if($0){\n\t\n}' },
	{input : 'do', output : 'do{\n\t$0\n}\nwhile();' },
	{input : 'while', output : 'while($0){\n\t\n}' },
	{input : 'whil', output : 'while($0){\n\t\n}' },
	{input : 'echo', output : 'echo \'$0\';' },
	{input : 'eco', output : 'echo \'$0\';' },
	{input : 'switch', output : 'switch($0) {\n\tcase "": break;\n\tdefault: ;\n}' }	
];

Language.complete = [
	{input : '\'', output : '\'$0\'' },
	{input : '"', output : '"$0"' },
	{input : '(', output : '\($0\)' },
	{input : '[', output : '\[$0\]' },
	{input : '{', output : '{\n\t$0\n}' }		
];

Language.shortcuts = [
	{input : '[ctrl][shift][space]', output : '&nbsp;' } 
];