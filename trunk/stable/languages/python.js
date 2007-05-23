/*
 * CodePress regular expressions for python syntax highlighting
 */

Language.syntax = [ // python
	{ input : /(&lt;[^!\?]*?&gt;)/g, output : '<b>$1</b>' }, // all tags
	{ input : /\"(.*?)(\"|<br>|<\/P>)/g, output : '<s>"$1$2</s>' }, // strings double quote
	{ input : /\'(.*?)(\'|<br>|<\/P>)/g, output : '<s>\'$1$2</s>'}, // strings single quote
	{ input : /(\$[\w\.]*)/g, output : '<a>$1</a>' }, // vars
	{ input : /\b(and|del|for|is|raise|assert|elif|from|lambda|return|break|else|global|not|try|class|except|if|or|while|continue|exec|import|pass|yield|def|finally|in|print|__import__|abs|basestring|bool|callable|chr|classmethod|cmp|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|isinstance|issubclass|iter|len|list|locals|long|map|max|min|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/g, output : '<u>$1</u>' }, // reserved words
	{ input : /([^:])\/\/(.*?)(<br|<\/P)/g, output : '$1<i>//$2</i>$3' }, // python comments //
	{ input : /\/\*(.*?)\*\//g, output : '<i>/*$1*/</i>' }, // python comments /* */
	{ input : /(&lt;!--.*?--&gt.)/g, output : '<big>$1</big>' } // html comments
]

// activated with tab
Language.snippets = [
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

// only 1 character auto-complete
Language.complete = [
	{ input : '\'', output : '\'$0\'' },
	{ input : '"', output : '"$0"' },
	{ input : '(', output : '\($0\)' },
	{ input : '[', output : '\[$0\]' },
	{ input : '{', output : '{\n\t$0\n}' }		
]

// ctrl+shift+inputKey
Language.shortcuts = [
	{ input : '[space]', output : '&nbsp;' },
	{ input : '[enter]', output : '<br />' } ,
	{ input : '[j]', output : 'testing' },
	{ input : '[7]', output : '&amp;' }
]
