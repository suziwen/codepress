/**
 * @author falves
 */

Language.id = 'javascript';
Language.name = 'JavaScript';

Language.syntax = [ 
	{ input : /\"(.*?)(\"|<br>|<\/P>)/g, output : '<s>"$1$2</s>' }, // strings double quote
	{ input : /\'(.*?)(\'|<br>|<\/P>)/g, output : '<s>\'$1$2</s>' }, // strings single quote
	{ input : /\b(break|continue|do|for|new|this|void|case|default|else|function|return|typeof|while|if|label|switch|var|with|catch|boolean|int|try|false|throws|null|true|goto)\b/g, output : '<b>$1</b>' }, // reserved words
	{ input : /\b(alert|isNaN|parent|Array|parseFloat|parseInt|blur|clearTimeout|prompt|prototype|close|confirm|length|Date|location|Math|document|element|name|self|elements|setTimeout|navigator|status|String|escape|Number|submit|eval|Object|event|onblur|focus|onerror|onfocus|onclick|top|onload|toString|onunload|unescape|open|valueOf|window|onmouseover)\b/g, output : '<u>$1</u>' }, // special words
	{ input : /([^:]|^)\/\/(.*?)(<br|<\/P)/g, output : '$1<i>//$2</i>$3' }, // comments //
	{ input : /\/\*(.*?)\*\//g, output : '<i>/*$1*/</i>' } // comments /* */
]

	
//alert(44)
//document.write('<scr'+'ipt src="../languages/javascript/snippets.js"></scr'+'ipt>');
//document.write('<scr'+'ipt src="../languages/javascript/complete.js"></scr'+'ipt>');
//document.write('<scr'+'ipt src="../languages/javascript/shortcuts.js"></scr'+'ipt>');