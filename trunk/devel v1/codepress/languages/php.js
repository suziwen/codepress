/*
 * CodePress regular expressions for PHP syntax highlighting
 */

Language.php = {
	syntax : [
		{ input : /(&lt;[^!\?]*?&gt;)/g, output : '<b>$1</b>' }, // all tags
		{ input : /(&lt;(style|script).*?&gt;)(.*?)(&lt;\/\2&gt;)/g, 
		  output : function() {
			var tag = (arguments[2]=="style") ? "em":"ins";
			return '<'+tag+'>'+arguments[1]+'</'+tag+'><'+tag+'>'+arguments[3]+'</'+tag+'><'+tag+'>'+arguments[4]+'</'+tag+'>';
		}},

		{ input : /<br>([\t ]*)/g, output : "<br><tt>$1</tt>" },
		{ input : /("|')(((\\\1)|.??)*(\1|<br>|<\/P>))/g,
		  output : '<s>$1$2</s>' }, // strings 
		
		{ input : /(&lt;\?)(php|=)?/gi ,
		  output : "<strong><cite>$1$2</cite>" },
		{ input : /(\?&gt;)/gi ,
		  output : "<cite>$1</cite></strong>" },
		
		{ input : /(\$[\w\.]*)/g, output : '<a>$1</a>' }, // vars
		{ input : /\b(false|true|and|or|xor|__FILE__|exception|__LINE__|array|as|break|case|class|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|for|foreach|function|global|if|include|include_once|isset|list|new|print|require|require_once|return|static|switch|unset|use|while|__FUNCTION__|__CLASS__|__METHOD__|final|php_user_filter|interface|implements|extends|public|private|protected|abstract|clone|try|catch|throw|this)\b/gi,
		  output : '<u>$1</u>' }, // reserved words
		
		/* inline comment */
		{ input : /(\/\/|#)((?:(?!<\/s>|<\/em>|<br>|<\/P>).??|<s>.*?<\/s>)*)(<br>|<\/P>)/g, 
		  output : function () {
			return (arguments[2])?"<i>"+arguments[1]+arguments[2]+"</i>"+arguments[3]:arguments.join(); 
		}}, 
		
		{ input : /\/\*(.*?)\*\//g, output : '<i>/*$1*/</i>' }, 
		{ input : /(&lt;!--.*?--&gt.)/g, output : '<big>$1</big>' },
		{ input : /\b(\d+)\b/g, output : '<var>$1</var>' }
	],
	snippets : [
		{ input : 'if', output : 'if($0){\n\t\n}' },
		{ input : 'ifelse', output : 'if($0){\n\t\n}\nelse{\n\t\n}' },
		{ input : 'else', output : '}\nelse {\n\t' },
		{ input : 'elseif', output : '}\nelseif($0) {\n\t' },
		{ input : 'do', output : 'do{\n\t$0\n}\nwhile();' },
		{ input : 'inc', output : 'include_once("$0");' },
		{ input : 'fun', output : 'function $0(){\n\t\n}' },	
		{ input : 'func', output : 'function $0(){\n\t\n}' },	
		{ input : 'while', output : 'while($0){\n\t\n}' },
		{ input : 'for', output : 'for($0,,){\n\t\n}' },
		{ input : 'fore', output : 'foreach($0 as ){\n\t\n}' },
		{ input : 'foreach', output : 'foreach($0 as ){\n\t\n}' },
		{ input : 'echo', output : 'echo \'$0\';' },
		{ input : 'switch', output : 'switch($0) {\n\tcase "": break;\n\tdefault: ;\n}' },
		{ input : 'case', output : 'case "$0" : break;' },
		{ input : 'ret0', output : 'return false;' },
		{ input : 'retf', output : 'return false;' },
		{ input : 'ret1', output : 'return true;' },
		{ input : 'rett', output : 'return true;' },
		{ input : 'ret', output : 'return $0;' },
		{ input : 'def', output : 'define(\'$0\',\'\');' },
		{ input : '<?', output : 'php\n$0\n?>' }
	],
	complete : [
		{ input : '\'', output : '\'$0\'' },
		{ input : '"', output : '"$0"' },
		{ input : '(', output : '\($0\)' },
		{ input : '[', output : '\[$0\]' },
		{ input : '{', output : '{\n\t$0\n}' }		
	],
	shortcuts : [
		{ input : '[space]', output : '&nbsp;' },
		{ input : '[enter]', output : '<br />' } ,
		{ input : '[j]', output : 'testing' },
		{ input : '[7]', output : '&amp;' }
	]
}