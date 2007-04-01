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
<div id="languages">
	<em>choose example in:</em> 
	<button onclick="cp1.edit('cp-php','php')">PHP</button> 
	<button onclick="cp1.edit('cp-javascript','javascript')">JavaScript</button> 
	<button onclick="cp1.edit('cp-java','java')">Java</button>
	<button onclick="cp1.edit('cp-perl','perl')">Perl</button>
	<button onclick="cp1.edit('cp-sql','sql')">SQL</button>	
	<button onclick="cp1.edit('cp-html','html')">HTML</button> 
	<button onclick="cp1.edit('cp-css','css')">CSS</button> 	
</div>

<textarea id="cp1" class="codepress php" style="width:700px;height:350px;" wrap="off">
&lt;?php
// Very simple implementation of server side script

if(isset($_GET['file'])) {
	$file = basename($_GET['file']);
	$full_file = $path['server'].'/'.$path['webdocs'].'/'.$path['files']."/".$file;
	if(file_exists($full_file)) {
		$code = file_get_contents($full_file);
		$code = preg_replace("/>/","&amp;gt;",$code);
		$code = preg_replace("/</","&amp;lt;",$code);
		$language = getLanguage($file);
	}
}
?&gt;

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
	<title>CodePress - Real Time Syntax Highlighting Editor written in JavaScript</title>
	<link type="text/css" href="languages/codepress-&lt;?=$language?&gt;.css" rel="stylesheet" id="cp-lang-style" />
	<script type="text/javascript" src="codepress.js"></script>
	<script type="text/javascript">
		CodePress.language = '&lt;?=$language?&gt;';
	</script>
</head>
<body id="ffedt"><pre id="ieedt">&lt;?=$code?&gt;</pre></body>
</html>
</textarea>

<br /><br />

<textarea id="codepress2" class="codepress javascript" style="width:700px;height:225px;" wrap="off">
//set language
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
</textarea>

<p>
<button onclick="alert(codepress2.getCode())">get code from editor</button>
<button onclick="codepress2.toggleEditor()">turn on/off CodePress</button>
<button onclick="codepress2.toggleLinenumbers()">show/hide line numbers</button>
</p>

<?php include("includes/changelog_last.php"); ?>

<h3>Download v.<?=$changelog[0]['v']?> (<?=$changelog[0]['d']?>)</h3>
<p>
	Since version 0.9.2 CodePress is more like a lib then a standalone editor. 
	Its now easier to integrate with another systems but is more difficult to use it as a standalone editor.
</p>
<p>
	Lots of things have changed. You may not use this version the same way you used old versions.
	Just read the <a href="install.php" class="button">install section</a>.
</p>
<ul>
	<li>
		<a href="download/codepress-v.<?=$changelog[0]['v']?>.zip" id="download"><strong>codepress-v.<?=$changelog[0]['v']?>.zip</strong></a> &raquo; Package with CodePress and examples
	</li>
	<ul>
		<li>
			<a href="install.php" class="button">Installation</a>
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


<h3>Known issues</h3>
<ol>
	<li>
		Line numbers do not resize with browser font size (because it's a bg image)
	</li>
	<li>
		Cut and paste not working correctly. Should be parsed and highlighted
	</li>

</ol>

<h3>License</h3>
<p>
	CodePress is distributed under the <a href="http://www.opensource.org/licenses/lgpl-license.php">LGPL</a>. If your software is <a href="http://www.gnu.org/philosophy/license-list.html#GPLCompatibleLicenses">compatible</a> with this licence or it is under <a href="http://creativecommons.org/">Creative Commons</a>, you can use it as you want. Just keep the credits somewhere around.
</p>
<p>
	To know a little more about this project, go to the <a href="about.php">about section</a>.
</p>



<h3>Comments <span style="color:black;">(<a href="javascript:scrollBottom()" style="color:black;">add new comment</a>)</span></h3>
<p>
	These are the last 25 comments. <a href="comment_list_all.php">See everything.</a>
</p>
<div id="comments">
	
<?php include_once("includes/comment_list.php"); ?>
	<div id="newcomments"></div>
    <div id="yourcomment" class="comment">
		<a href="http://" id="yoururl"><strong id="yourname" class="name">Your name</strong></a> &raquo; <strong id="yourdate"><?= date('Y-m-d') ?></strong>
	    <p id="yourtext">Your comment</p>
	</div>

	<h3>Post a comment</h3>
	<div id="postcomment">
		<img src=images/preview.gif id="previewimg">
		<form name="comm">
		<input type="text" name="cname" value="Your name" onkeyup="commentPreview()" onclick="if(this.value=='Your name')this.value=''" /><br />
		<input type="text" name="curl" value="http://" onkeyup="commentPreview()" /><br />
		<textarea name="ccomment" onkeyup="commentPreview()" onclick="if(this.value=='Your comment')this.value=''" onfocus="if(this.value=='Your comment')this.value=''">Your comment</textarea><br />
		<input type="hidden" name="corderdate" value="">
		<input type="hidden" name="cpwd" value="<?php if(isset($_GET['p'])) echo $_GET['p'];?>">
		<div id="comment-msg"></div>
		</form>
		<button onclick="commentAdd()">submit your comment</button>
		<script type="text/javascript">commentPreview(1)</script>
	</div>
	
</div><!--/comments-->


<script src="codepress/codepress.js" type="text/javascript"></script>


<!-- hidden codes for loading -->
<textarea id="cp-php" class="hidden-code">
&lt;?php
// Very simple implementation of server side script

if(isset($_GET['file'])) {
	$file = basename($_GET['file']);
	$full_file = $path['server'].'/'.$path['webdocs'].'/'.$path['files']."/".$file;
	if(file_exists($full_file)) {
		$code = file_get_contents($full_file);
		$code = preg_replace("/>/","&amp;gt;",$code);
		$code = preg_replace("/</","&amp;lt;",$code);
		$language = getLanguage($file);
	}
}
?&gt;

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
	<title>CodePress - Real Time Syntax Highlighting Editor written in JavaScript</title>
	<link type="text/css" href="languages/codepress-&lt;?=$language?&gt;.css" rel="stylesheet" id="cp-lang-style" />
	<script type="text/javascript" src="codepress.js"></script>
	<script type="text/javascript">
		CodePress.language = '&lt;?=$language?&gt;';
	</script>
</head>
<body id="ffedt"><pre id="ieedt">&lt;?=$code?&gt;</pre></body>
</html>
</textarea>

<textarea id="cp-javascript" class="hidden-code">
CodePress = function(obj) {
	var self = document.createElement('iframe');
	self.textarea = obj;
	self.textarea.disabled = true;
	self.style.height = self.textarea.clientHeight +'px';
	self.style.width = self.textarea.clientWidth +'px';
	
	self.initialize = function() {
		self.editor = self.contentWindow.CodePress;
		self.editor.body = self.contentWindow.document.getElementsByTagName('body')[0];
		self.editor.setCode(self.textarea.value);
		self.editor.syntaxHighlight('init');
	}
	
	self.edit = function(id,language) {
		self.language = (language) ? language : self.textarea.className.replace(/ ?codepress ?/,'');
		self.src = cpPath+'modules/codepress.html?engine='+self.getEngine()+'&language='+self.language;
		if(self.attachEvent) self.attachEvent('onload',self.initialize);
		else self.addEventListener('load',self.initialize,false);
	}
}
</textarea>


<textarea id="cp-java" class="hidden-code">
import java.io.FileFilter;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Project ECCO - File manager class
 * @author Fernando M.A.d.S.
 */
public class FileManager extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private static String login = "feanndor"; // session var should come here
	private static String usersPath = System.getProperty("user.dir")+File.separator+"htdocs"+File.separator+"ecco"+File.separator+"users"+File.separator;
	private static File dir = new File(usersPath+login+File.separator);
	static boolean existDirectories = false;
	static int isDirectory = 0;

	public FileFilter filterFiles(File dir) {
		return (new FileFilter() {
			public boolean accept(File pathname) {
				return !(pathname.isDirectory());
			}
		});
	}
}
</textarea>

<textarea id="cp-perl" class="hidden-code">
#!/usr/bin/perl      
# The first line of the script envokes Perl 

# Scalar variables
$var1 = "Hello World";   
$var2 = 14.6;

# Array variables
@arr1 = ("zero","one","two","three","four");

# Hash variable, or associative array
%hash1 = ("one","Monday","two", "Tuesday","three", "Wednesday","four","Thursday");

# Some simple printing
print $var1; 

# Subroutine
sub test() {
	print "ok";
}
</textarea>

<textarea id="cp-sql" class="hidden-code">
--
-- simple select example
-- 
SELECT * FROM books
	WHERE price > 100.00 and price < 150.00
	ORDER BY title

SELECT books.title, count(*) AS Authors
	FROM books
	JOIN book_authors 
		ON books.book_number = book_authors.book_number
	GROUP BY books.title

-- insert, update and delete examples
	
INSERT INTO my_table (field1, field2, field3) VALUES ('test', 'N', NULL);

BEGIN WORK;
	UPDATE inventory SET quantity = quantity - 3 WHERE item = 'pants';
COMMIT;
</textarea>

<textarea id="cp-html" class="hidden-code">

<html>
<head>
	<title>CodePress - Online Real Time Syntax Highlighting Editor</title>

	<style type="text/css">
	@import url(styles.css);	
	</style>
	
	<script type="text/javascript">
	function getCode() {
		alert(textWithoutHighlighting);
	}
	</script>
</head>
<body>
<div id="container">

<div id="logo">
	<h1><a href="http://codepress.org/">CodePress</a></h1>
	<h2>Online Real Time Syntax Highlighting Editor</h2>
	<img src="testimage.gif" />
</div>


<div id="languages">
	<em>choose language:</em> 
	<button onclick="edit('codepress.php',this)" id="default">PHP</button> 
	<button onclick="edit('FileManager.java',this)">Java</button> 
</div>

</div><!--/container-->
</body>
</html>
</textarea>

<textarea id="cp-css" class="hidden-code">
/* CSS comment */

body {
	color:#000;
	background-color:white;
	font:15px Georgia, "Lucida Grande", Arial, sans-serif; 
	letter-spacing:0.01em;
	margin:15px;
}

p { 
	margin:0 0 15px 0; 
}

a,a:visited {
	color:#7f0055;
}

select {
	background:#ffffe1;
}

h1 {
	color:#7f0055;
	margin:0;
	padding:0;
	font-size:42px;
}
</textarea>


<? include("includes/footer.php"); ?>