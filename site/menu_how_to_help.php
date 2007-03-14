<? include("includes/header.php"); ?>

<body>

<? include("includes/top.php"); ?>

<? include("includes/menu.php"); ?>

<div class="hold">
<h3>How to help</h3>
<p>
If you want to help someway, you can:
</p>
<ul>
	<li>write syntax highlighting for any language you like</li>
	<li>rewrite codepress.php to another server-side language</li>	
	<li>translate the interface to some other language (language in this case is English, French etc :)</li>	
	<li>improve browser compatibility (KHTML? Opera?)</li>
	<li>try to implement one of the features from "To do" list below</li>
	<li>try to fix one of the bugs from "Known issues" list below</li>
	<li>do something new</li>
</ul>
<p>
In any case, I'll keep your credits directly in your code (or in your
part of the code) and put your name on "About" page.
</p>
</div>

<h3>To do</h3>
<p>You can suggest improvements and features through <a href="http://sourceforge.net/tracker/?group_id=186981&atid=919470">feature request page</a> at SourceForge.
</p>
<ul>
	<li>syntax highlighting for C, C++, Python, Ruby and ASP (these I'll do someday, if no one does)</li>
	<li>auto indent, soft tabs, block ident</li>
	<li>auto completion with code suggest</li>
	<li>code folding</li>
	<li>improve the actual shortcut system</li>	
	<li>improve the actual auto-complete system</li>
	<li>a "save" button?</li>	
</ul>

<h3>Known issues</h3>
<p>You can report a bug through <a href="http://sourceforge.net/tracker/?func=add&group_id=186981&atid=919467">bug report page</a> at SourceForge.
<ul>
	<li>work with Firefox 1.5 and 2.0, Internet Explorer 5.5, 6 and 7 only</li>
    <!-- li>first undo seems to be going back 2 levels</li-->
    <li>font resize not resizing line numbers (because it's a bg img)</li>
    <li>pasted (ctrl+v) text should be parsed and highlighted instantly</li>
</ul>


<? include("includes/footer.php"); ?>
