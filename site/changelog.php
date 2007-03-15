<?php include("includes/header.php"); ?>

<body>
<style>#adsense {display:none;}</style>
<?php include("includes/top.php"); ?>

<?php include("includes/menu.php"); ?>


<h3>Changelog</h3>

<?php include("includes/changelog_last.php"); ?>
<?php getAllChangeLog($changelog); ?>

<h5>version 0.9 / 31 jan 07</h5>
<ul id="v0-9-00">
	<li>Lots of changes to file/directory structures and names</li>	
	<li>Added code snippets system</li>
	<li>Added a shortcut system</li>
	<li>Added menu with language chooser, full screen, show/hide line numbers and file name display</li>
	<li>Changed the way CodePress is added to a page</li>
	<li>Beggining of code auto-completion system</li>
	<li>Beginning of localization (l10n) efforts</li>
	<li>Beginning of simple interface customization through themes (css)</li>
</ul>


<h5>version 0.8.15 / 13 jan 07</h5>
<ul id="v0-8-15">
	<li>Fix for white space at the beginning of empty lines on IE. Made by Michael Hurni</li>
	<li>Fix for wrong break line at first line for IE <code>getCode()</code> method. Reported by Marco Luethy</li>	
	<li>Added SQL syntax highlighting. Made by Merlin Moncure</li>		

</ul>

<h5>version 0.8.14 / 30 dec 06</h5>
<ul id="v0-8-14">
	<li>Remade syntax highlighting regular expressions for all languages</li>
	<li>Changes to <code>setCode()</code> and <code>getCode()</code> to support the above change</li>	
	<li>Minor fix to <code>&</code> character on <code>codepress.php</code></li>		
	<li>Control character changed (no more <code>&amp;shy;</code>)</li>
</ul>

<h5>version 0.8.13 / 23 dec 06</h5>
<ul id="v0-8-13">
	<li>fix to a huge bug that happens only with Internet Explorer which erases all the code when you keep typing to the end of the line. Reported by JohnG</li>
	<li>fix to page up/page down problem with Internet Explorer</li>
	<li>fix to the "3 [enters] between quotes" bug in PHP syntax highlighting. Reported by Michael Hurni</li>	
	<li>minor changes to JavaScript, Java, PHP and Perl regular expressions</li>			
</ul>

<h5>version 0.8.12 / 03 dec 06</h5>
<ul id="v0-8-12">
	<li>fix to main syntax highlighting <code>for</code> loop. Thanks to eas</li>
	<li>fix to JavaScript <code>//</code> style comments. Thanks to Andrew</li>
	<li>added a generic syntax highlighting (for near future use). <a href=javascript:showContent('genericsh')>What is this?</a>&darr;</li>
			<div id="genericsh" class="h">When a language is not recognized or there is no highlighting for a language, a "generic" highlighting can be used instead of "plain text". Generic highlights common reserved words like if, for, while etc</div>
	</li>
</ul>

<h5>version 0.8.11 / 04 nov 06</h5>
<ul id="v0-8-11">
	<li>otimization for editing big files (Internet Explorer and Firefox)</li>	
	<li>added syntax highlighting for Perl language. Created by J. Nick Koston</li>
	<li>language specific regular expressions separated in codepress-[language].js files</li>
	<li>changes to <code>setCode()</code> to support the above change</li>	
	<li>better way for loading code from textarea (read How to section above)</li>		
	<li>fix for first line comments (//comment) for Java and JavaScript</li>			
</ul>		

<h5>version 0.8.10 / 29 oct 06</h5>
<ul id="v0-8-10">
	<li>renewed handling system for big files. Now code are splitted and highlighted while scrolling with mouse or page up/down (Firefox only, yet)</li>
	<li>fix for problems selecting small pieces of text with mouse. Reported by OGG</li>
	<li>fix for some scrolling problems</li>
	<li>fix for parsing control char (<code>&amp;shy;</code>) in <code>getCode()</code>. Thanks to Gregor Goestl</li>
	<li>fix for parsing order of <code>&amp;amp;</code> <code>&amp;gt;</code> and <code>&amp;lt;</code> in <code>getCode()</code>. Parsing order makes a huge difference here. Thanks to Gregor Goestl</li>
</ul>		

<h5>version 0.8.9 / 22 oct 06</h5>
<ul id="v0-8-9">
	<li>CSS highlighting completely remade</li>
	<li>fix for <code>&lt;?php</code> tags inside <code>&lt;?php</code> tags. Reported by alban.lopez. <a href=javascript:showContent('phpinsidephp')>More</a>&darr;</li>
			<div id="phpinsidephp" class="h">This will not work if the string starts with " (quotes) on one line and ends in a different line with a ". The (quote)php tags(quote) must be at the same line;</div>
	<li>fix for HTML entities in <code>setCode()</code>. Thanks to Gregor Goestl</li>
	<li>security fix for codepress.php. Thanks to Dustin Spicuzza</li>
	<li>fix for single-single quotes and <code>//</code> php comments. Reported by TobyL</li>
</ul>		

<h5>version 0.8.8 / 18 oct 06</h5>
<ul id="v0-8-8">
	<li>fix to parse HTML tags in <code>setCode()</code>. Thanks to Dustin Spicuzza</li>
	<li>fix for wrong line break at end of code in <code>getCode()</code> (IE only). Thanks to Dustin Spicuzza again</li>
	<li>linenumbers.gif (44k) exchanged for linenumbers.png (16k). Thanks to Dustin one more time</li>
	<li>added syntax highlighting to CSS files. I'll try to highlight embedded HTML+JS+CSS soon</li>
</ul>		

<h5>version 0.8.7 / 16 oct 06</h5>
<ul id="v0-8-7">
	<li>since this version CodePress uses PHP as it's server side language (very simple yet)</li>
	<li>better handling of big files splitting and highlighting parts of it (Firefox only). <a href=javascript:showContent('bigfilehandling')>How this works?</a>&darr;
			<div id="bigfilehandling" class="h">See JavaScript example above to view this working. You'll notice that, if you scroll with the mouse, you'll see text not highlighted. Click the CodePress window and it will be highlighted. Page up/down automatically highlight code. This happens with files bigger then 6000 characters to prevent slowing down the highlighting process.</div>
	</li>
	<li>added <code>CodePress.setCode()</code> to put some code inside CodePress window</li>
	<li>minor fix for PHP and Java highlighting regular expressions</li>
</ul>

<h5>version 0.8.6 / 12 oct 06</h5>
<ul id="v0-8-6">
	<li>fix for <code>&amp;amp;</code> code output</li>
	<li>added new css item to all languages to remove border from CodePress iframe window</li>
</ul>

<? include("includes/footer.php"); ?>
