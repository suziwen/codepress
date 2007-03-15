<? include("includes/header.php"); ?>

<body>
<style>#adsense {display:none;}</style>
<? include("includes/top.php"); ?>


<? include("includes/menu.php"); ?>

<h3>Installation</h3>

<p>
Considering you already have a PHP capable webserver (http://yourserver/)
</p>
<ol>
	<li>
		<p>
			<a href="index.php">Download</a> and uncompress CodePress under a directory inside your webserver.<br>
			Example:<strong> http://yourserver/codepress/</strong>
		</p>
	</li>
	<li>
		<p>
			Edit <strong>codepress/modules/codepress.php</strong> and change <code>$path['files'] = "[directory]";</code> to the root directory of the files you want to edit.
			Examples:
		</p>
		
		<p>
			<code>$path['files'] = "/files";</code> will open files from <strong>[yourserver root path]/files/</strong><br>
			<code>$path['files'] = "files";</code> will open files from <strong>[yourserver root path]/codepress/files/</strong>
		</p>
	</li>
	<li>
		<p>
			Insert CodePress script at the bottom of your page, above the <code>&lt;/body&gt;</code> tag.
		</p>
	
		<p>
			<code>&lt;script src="/codepress/codepress.js" type="text/javascript" id="cp-script" lang="en-us"&gt; &lt;/script&gt;</code>
		</p>
	
		<p>
			The "en-us" part can be changed to a language available on <strong>codepress/content/</strong>
		</p>
	</li>
	
	<li>
		<p>
			Add the <code>&lt;code&gt;</code> tag to the place on your page you want CodePress to appear. There are several ways to do that like loading code embeded in your page and loading files from server.<br>
			<a href="codepress/examples.html"><strong>See examples you can copy here</strong></a>.
		</p>
	</li>
</ol>

<h3>Things to consider</h3>
<ul>
	<li>
		Be careful not to use the same id for two different CodePress windows (&lt;code id="<strong>xx</strong>" ...&gt;)
	</li>
	<li>
		Options (class) allowed to <code>class="cp ..."</code> are <strong>hideMenu</strong>, <strong>hideFileName</strong>, <strong>hideLanguage</strong>, <strong>hideOptions</strong>. The "<strong>cp</strong>" class is mandatory.
	</li>
	<li>
		If file does not exist on server, CodePress will open a new file with the name specified
	</li>
	<li>
		You can change CodePress window width/height and other attributes overwriting the css properties. Example: <code>.cp { width:500px;height:800px }</code>
	</li>
</ul>


<h3>Getting code from CodePress window</h3>
<ol>
	<li>
		Do the steps above and get CodePress up and running :)
	</li>
	<li>
		Just call <strong>[id of the &lt;code&gt; tag].getCode()</strong><br>
		Example 1: <code>alert(cp1.getCode())</code><br>
		Example 2: <code>var myCode = codepress.getCode()</code><br>
		Example 3: <code>document.getElementById('MyTextArea').value = cp2.getCode()</code>
	</li>
</ol>
You may want to use CodePress.getCode() to get the content code from CodePress window and save it to your server since CodePress only open/edit files and do not save them.


<? include("includes/footer.php"); ?>