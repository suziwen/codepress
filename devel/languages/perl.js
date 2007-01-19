/*
 * CodePress regular expressions for Perl syntax highlighting
 * By J. Nick Koston
 */

Language.syntax = [ // Perl
	{
	pattern : /\"(.*?)(\"|<br>|<\/P>)/g,
	replace : '<s>"$1$2</s>' // strings double quote
	},{
	pattern : /\'(.*?)(\'|<br>|<\/P>)/g,
	replace : '<s>\'$1$2</s>' // strings single quote
	},{
    pattern : /([\$\@\%]+)([\w\.]*)/g,
	replace : '<a>$1$2</a>' // vars
	},{
    pattern : /(sub\s+)([\w\.]*)/g,
	replace : '$1<em>$2</em>' // functions
	},{
    pattern : /\b(abs|accept|alarm|atan2|bind|binmode|bless|caller|chdir|chmod|chomp|chop|chown|chr|chroot|close|closedir|connect|continue|cos|crypt|dbmclose|dbmopen|defined|delete|die|do|dump|each|else|elsif|endgrent|endhostent|endnetent|endprotoent|endpwent|eof|eval|exec|exists|exit|fcntl|fileno|find|flock|for|foreach|fork|format|formlinegetc|getgrent|getgrgid|getgrnam|gethostbyaddr|gethostbyname|gethostent|getlogin|getnetbyaddr|getnetbyname|getnetent|getpeername|getpgrp|getppid|getpriority|getprotobyname|getprotobynumber|getprotoent|getpwent|getpwnam|getpwuid|getservbyaddr|getservbyname|getservbyport|getservent|getsockname|getsockopt|glob|gmtime|goto|grep|hex|hostname|if|import|index|int|ioctl|join|keys|kill|last|lc|lcfirst|length|link|listen|LoadExternals|local|localtime|log|lstat|map|mkdir|msgctl|msgget|msgrcv|msgsnd|my|next|no|oct|open|opendir|ordpack|package|pipe|pop|pos|print|printf|push|pwd|qq|quotemeta|qw|rand|read|readdir|readlink|recv|redo|ref|rename|require|reset|return|reverse|rewinddir|rindex|rmdir|scalar|seek|seekdir|select|semctl|semget|semop|send|setgrent|sethostent|setnetent|setpgrp|setpriority|setprotoent|setpwent|setservent|setsockopt|shift|shmctl|shmget|shmread|shmwrite|shutdown|sin|sleep|socket|socketpair|sort|splice|split|sprintf|sqrt|srand|stat|stty|study|sub|substr|symlink|syscall|sysopen|sysread|system|syswritetell|telldir|tie|tied|time|times|tr|truncate|uc|ucfirst|umask|undef|unless|unlink|until|unpack|unshift|untie|use|utime|values|vec|waitpid|wantarray|warn|while|write)\b/g,
	replace : '<b>$1</b>' // reserved words
	},{
    pattern : /([\(\){}])/g,
	replace : '<u>$1</u>' // special chars
	},{
    pattern : /#(.*?)(<br>|<\/P>)/g,
	replace : '<i>#$1</i>$2' // comments
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

