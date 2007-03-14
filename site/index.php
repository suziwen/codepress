<? include("includes/header.php"); ?>

<body>


<? include("includes/top.php"); ?>

<? include("includes/menu.php"); ?>

<div id="main">
	<!--  a href="http://sourceforge.net/donate/index.php?group_id=186981"><img src="http://images.sourceforge.net/images/project-support.jpg" width="88" height="32" border="0" alt="Support This Project" /> </a -->
	<h4>
	CodePress is web-based source code editor with syntax highlighting written in JavaScript that colors text in real time while it's being typed in the browser.
	</h4>
	
	<!-- p>
	It's a lightweight, extensible and simple (compared to similar web-based code editors) script with very good performance with large files (tested with up to 3000 lines).
	</p>

	<p>
	CodePress project main goal is to build a web application code editor that look and feel like a desktop code editor as much as possible, having in mind the upside and downside of being a web-based software.
	</p>

	<p>
		CodePress is part of a bigger project called <strong>ECCO</strong> (<a href="http://ecco.sourceforge.net/">ecco.sourceforge.net</a>).
		ECCO is a web-based programming IDE with file manager, console and a code editor. CodePress is ECCO's editor.
	</p -->
	
</div>

<div class="hold">
<h3>Features</h3>
You can try some features with the demo below.
<ul style="margin:10px 0 0 0;padding:0 0 0 17px;">
	<li><strong>Real-time syntax highlighting</strong> :: just write some code</li>
	<li style="margin:8px 0 0 0"><strong>Fullscreen</strong> :: under "options" menu</li>
</ul>
</div>
<ul style="margin:8px 0 0 0;padding-left:17px">
	<li><strong>Code snippets</strong> :: on PHP example type "if" and press [tab]</li>
	<li style="margin: 8px 0"><strong>Auto completion</strong> :: simple type " or ( or ' or [ or { on any example below (except Plain Text)</li>
	<li><strong>Shortcuts</strong> :: on PHP example press [ctrl][shift][space]. It's shortcut to &amp;nbsp;</li>
	<li style="margin-top:8px;"><strong>Multiple windows</strong> :: you can add multiple codepress windows to the same page</li>	
	<!-- li><strong>Show/Hide line numbers</strong> - under "options" menu</li -->
</ul>

<h3>Demo</h3>
<p>
The first example below is opening code from files on the server. The second example is opening code directly embeded on this page. 
</p>
<div id="languages">
	<em>choose example in:</em> 
	<button onclick="cp1.edit('codepress.php')" id="default">PHP</button> 
	<button onclick="cp1.edit('codepress.js')">JavaScript</button> 
	<button onclick="cp1.edit('testdir/FileManager.java')">Java</button>
	<button onclick="cp1.edit('example.pl')">Perl</button>
	<button onclick="cp1.edit('example.sql')">SQL</button>	
	<button onclick="cp1.edit('index.html')">HTML</button> 
	<button onclick="cp1.edit('styles.css')">CSS</button> 	
	<button onclick="cp1.edit('loremipsum.txt')">plain text</button><br />
</div>

<!-- [options here] class below = any or all of the following: hideMenu, hideFileName, hideLanguage, hideOptions -->
<code id="cp1" title="codepress.php" class="cp"></code>

<form><textarea id="myTextAreaId" class="codepress">/* CodePress example */
for (i=0;i<10;i++) {
	alert(10);
	document.write("Test");
}
</textarea></form>

<br>

<code id="codepress2" title="codepress-test.js" class="cp" style="width:700px;height:300px;">
// loading code directly from page
this.setLanguage = function() {
	if(arguments[0]) {
		language = (typeof(Content.languages[arguments[0]])!='undefined') ? arguments[0] : this.setLanguage();
		cpLanguage.innerHTML = Content.languages[language].name;
		if(cpBody.document.designMode=='on') cpBody.document.designMode = 'off';
		CodePress.loadScript(cpBody.document, '../languages/'+language+'.js', function () { cpBody.CodePress.syntaxHighlight('init'); })
		cpBody.document.getElementById('cp-lang-style').href = '../languages/'+language+'.css';
		this.hideMenu();
	}
	else {
		var extension = filename.replace(/.*\.([^\.]+)$/,'$1');
		var aux = false;
		for(lang in Content.languages) {
			extensions = ','+Content.languages[lang].extensions+',';
			if(extensions.match(','+extension+',')) aux = lang;
		}
		language = (aux) ? aux : 'generic';
	}
}
</code>

<script src="codepress/codepress.js" type="text/javascript" id="cp-script" lang="en-us"></script>

<p style="margin-top:10px">
<button onclick="alert(cp1.getCode())"><strong>get code from editor</strong></button> :: Example getting (<code>alert()</code>) original code from CodePress window<br />
<button onclick="codepress2.edit('FromHiddenArea.js','myTextAreaId')"><strong>set code to editor</strong></button> :: Example setting code from a hidden textarea to CodePress window
</p>
<h3>Download v.<?=$CodePressVersion?> (<?=$ReleaseDate?>)<a href="http://sourceforge.net/" id="sflogo"><img src="http://sourceforge.net/sflogo.php?group_id=37044&type=1" border=0 /></a></h3>
<p>
You can access development versions through <a href="http://sourceforge.net/svn/?group_id=186981">anonymous SVN</a> at <a href="http://sourceforge.net/projects/codepress/">CodePress SourceForge page</a>.
</p>
<ul>
	<li><a href="download/codepress-v.<?=$CodePressVersion?>.zip" target="_top">codepress-v.<?=$CodePressVersion?>.zip</a> :: Package with CodePress and examples</li>
</ul>
<p style="margin:20px 40px">
<a href="http://sourceforge.net/tracker/?func=add&group_id=186981&atid=919467" class="button">Bug report</a>
<a href="http://sourceforge.net/tracker/?func=add&group_id=186981&atid=919470" class="button">Feature request</a>
</p>
<p>
CodePress installation is for advanced users and developers. <a href="menu_how_to_use_it.php">See how to install and use</a>.
</p>


<h3>Changelog</h3>
<div id="changelog">
<ul id="v0-9-01">
	<li>Added multiple CodePress windows support</li>
	<li>&lt;? changed to &lt;?php</li>
	<li>Fix for IE's problem of losing line breaks with load code on demand</li>	
	<li>Fix to horizontal scroll problem for IE which deleted all code</li>
	<li>Fix to the "forward and back" problem on IE</li>
</ul>

<a href="int_changelog.php"><strong>View changelog for all versions</strong></a>
</div>

<h3>Known issues</h3>
<ul>
	<li>works with Firefox 1.5 and 2.0, Internet Explorer 5.5, 6 and 7 only</li>
    <!-- li>first undo seems to be going back 2 levels</li-->
    <li>font resize not resizing line numbers (because it's a bg img)</li>
    <li>pasted (ctrl+v) text should be parsed and highlighted instantly</li>
</ul>


<h3>License</h3>
<p>
	CodePress is distributed under the <a href="http://www.opensource.org/licenses/lgpl-license.php">LGPL</a>. If your software is <a href="http://www.gnu.org/philosophy/license-list.html#GPLCompatibleLicenses">compatible</a> with this licence or it is under <a href="http://creativecommons.org/">Creative Commons</a>, you can use it as you want. Just keep the credits somewhere around.
</p>
<p>
	To know a little more about this project, go to the <a href="menu_about.php">about section</a>.
</p>

<h3>Comments <span style="color:black;">(<a href="javascript:scrollBottom()" style="color:black;">add new comment</a>)</span></h3>
These are the last 25 comments. <a href="comment_list_all.php">See everything.</a>
<div id="comments">
	
<?php include_once("includes/comment_list.php"); ?>

These are the last 25 comments. <a href="comment_list_all.php">See everything.</a>

	<div id="newcomments"></div>
    <div id="yourcomment" class="comment">
		<a href="http://" id="yoururl"><strong id="yourname" class="name">Your name</strong></a> :: <strong id="yourdate"><?= date('Y-m-d') ?></strong>
	    <p id="yourtext">Your comment</p>
	</div>
</div><!--/comments-->

	<h3>Post a comment</h3>
	<div id="postcomment">
		<img src=images/preview.gif id="previewimg">
		<form name="comm">
		<input type="text" name="cname" value="Your name" onkeyup="commentPreview()" onclick="if(this.value=='Your name')this.value=''" /><br />
		<input type="text" name="curl" value="http://" onkeyup="commentPreview()" /><br />
		<textarea name="ccomment" onkeyup="commentPreview()" onclick="if(this.value=='Your comment')this.value=''" onfocus="if(this.value=='Your comment')this.value=''">Your comment</textarea><br />
		<div id="comment-msg"></div>
		</form>
		<button onclick="commentAdd()">submit your comment</button>
		<script type="text/javascript">commentPreview(1)</script>
	</div>

<? include("includes/footer.php"); ?>