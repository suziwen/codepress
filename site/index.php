<? include("includes/header.php"); ?>

<body>

<? include("includes/top.php"); ?>

<? include("includes/menu.php"); ?>

<? include("includes/adsense.php"); ?>


<h4>
	CodePress is web-based source code editor with syntax highlighting written in JavaScript that colors text in real time while it's being typed in the browser.
</h4>

<h3>Features</h3>
You can try some features with the demo below.
<ul>
	<li>
		<strong>Real-time syntax highlighting</strong> &raquo; just write some code
	</li>
	<li>
		<strong>Fullscreen</strong> &raquo; under "options" menu
	</li>
	<li>
		<strong>Code snippets</strong> &raquo; on PHP example type "if" and press [tab]
	</li>
	<li>
		<strong>Auto completion</strong> &raquo; simple type " or ( or ' or [ or { on any example below (except Plain Text)
	</li>
	<li>
		<strong>Shortcuts</strong> &raquo; on PHP example press [ctrl][shift][space]. It's shortcut to &amp;nbsp;
	</li>
	<li>
		<strong>Multiple windows</strong> &raquo; you can add multiple CodePress windows to the same page
	</li>	
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

<p>
	<button onclick="alert(cp1.getCode())"><strong>get code from editor</strong></button> &raquo; Example getting (<code>alert()</code>) original code from CodePress window<br />
	<button onclick="codepress2.edit('FromHiddenArea.js','myTextAreaId')"><strong>set code to editor</strong></button> &raquo; Example setting code from a hidden textarea to CodePress window
</p>

<p>
	<a href="codepress/examples.html">See more examples</a>
</p>

<?php include("includes/changelog_last.php"); ?>

<h3>Download v.<?=$changelog[0]['v']?> (<?=$changelog[0]['d']?>)</h3>

<ul>
	<li>
		<a href="download/codepress-v.<?=$changelog[0]['v']?>.zip" id="download"><strong>codepress-v.<?=$changelog[0]['v']?>.zip</strong></a> &raquo; Package with CodePress and examples
	</li>
	<ul>
		<li>
			<a href="how_to_use_it.php" class="button">Installation</a>
		</li>
		<li>
			<a href="changelog.php" class="button">Changelog</a>
		</li>
		<li>
			<a href="http://sourceforge.net/tracker/?func=add&group_id=186981&atid=919467">Bug report</a>
		</li>
		<li>
			<a href="http://sourceforge.net/tracker/?func=add&group_id=186981&atid=919470">Feature request</a>
		</li>
	</ul>
</ul>


<h3>License</h3>
<p>
	CodePress is distributed under the <a href="http://www.opensource.org/licenses/lgpl-license.php">LGPL</a>. If your software is <a href="http://www.gnu.org/philosophy/license-list.html#GPLCompatibleLicenses">compatible</a> with this licence or it is under <a href="http://creativecommons.org/">Creative Commons</a>, you can use it as you want. Just keep the credits somewhere around.
</p>
<p>
	To know a little more about this project, go to the <a href="menu_about.php">about section</a>.
</p>



<h3>Comments <span style="color:black;">(<a href="javascript:scrollBottom()" style="color:black;">add new comment</a>)</span></h3>
<p>
	These are the last 25 comments. <a href="comment_list_all.php">See everything.</a>
</p>
<div id="comments">
	
<?php include_once("includes/comment_list.php"); ?>

These are the last 25 comments. <a href="comment_list_all.php">See everything.</a>

	<div id="newcomments"></div>
    <div id="yourcomment" class="comment">
		<a href="http://" id="yoururl"><strong id="yourname" class="name">Your name</strong></a> &raquo; <strong id="yourdate"><?= date('Y-m-d') ?></strong>
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