<? include("includes/header.php"); ?>

<body>
<style>#adsense {display:none;}</style>
<? include("includes/top.php"); ?>


<? include("includes/menu.php"); ?>

<h3>How to use it</h3>

<p>
Considering you already have a PHP capable webserver (http://yourserver/)</p>
<ol>
<li>Uncompress CodePress under the root directory of your webserver so it can be accessed through <strong>http://yourserver/codepress/</strong></li>
<li>Edit <strong>codepress/modules/codepress.php</strong> and change <code>$path['files'] = "[directory]";</code> to the root directory of the files you want to edit.

	Examples:<br><br>
	<p>
	<code>$path['files'] = "/files";</code> will open files from <strong>[yourserver root path]/files/</strong><br>
	<code>$path['files'] = "files";</code> will open files from <strong>[yourserver root path]/codepress/files/</strong>
	</p>
</li>
<li>Insert CodePress script at the bottom of your page, above the <code>&lt;/body&gt;</code> tag.<br><br>

<p>
<code>&lt;script src="/codepress/codepress.js" type="text/javascript" id="cp-script" lang="en-us"&gt; &lt;/script&gt;</code>
</p>
<p>
The "en-us" part can be changed to a language available on <strong>codepress/content/</strong>
</p>
</li>

<li>Add the <code>&lt;code&gt;</code> tag to the place on your page you want CodePress to appear. There are several ways to do that.
<a href="codepress/examples.html"><strong>See all examples here</strong></a>.<br><br>

<!-- [options here] class below = any or all of the following: hideMenu, hideFileName, hideLanguage, hideOptions -->
<!-- 
<strong>Method 1: Load code from server (on page load)</strong><br />
<p id="serveronload">
<code>&lt;code id="cp1" title="example.pl" class="cp hideFileName"&gt;&lt;/code&gt;</code><br>
The above will open example.pl from server (if it exists) not displaying its filename on status bar/menu<br>
</p>

<strong>Method 2: <a href="javascript:versionExpand('pageonload')">Load code from same page (on page load)</a></strong>&darr;<br />
<p class="ns" id="pageonload">
<code>&lt;code id="cp2" title="test.js" class="cp hideMenu"&gt;<br>
&nbsp;&nbsp;&nbsp;&nbsp;document.write("test");<br>
&lt;/code&gt;</code><br>
The above will open a new file named test.js getting its content from inside <code>&lt;code&gt;</code> tag and not showing the status bar/menu<br>
</p>

<strong>Method 3: <a href="javascript:versionExpand('serverondemand')">Load code from server (on demand)</a></strong>&darr;<br />
<p class="ns" id="serverondemand">
<code>&lt;code id="cp3" class="cp hideMenu"&gt;&lt;/code&gt;</code><br>
Call <code>cp1.edit('[filename]')</code> somewhere in your page. Note that cp3 is the id of the &lt;code&gt; tag. Example:<br>
<code>&lt;button onclick="cp3.edit('myfile.js')&gt;Edit&lt;/button&gt;</code><br>

</p>

<strong>Method 4: <a href="javascript:versionExpand('pageondemand')">Load code from same page (on demand)</a></strong>&darr;<br />
<p class="ns" id="pageondemand">
<code>&lt;code id="cp4" class="cp"&gt;&lt;/code&gt;</code><br>
Call <code>cp4.edit('[filename]','[id of the element containing the code]')</code> somewhere in your page. Note that cp4 is the id of the &lt;code&gt; tag. Example:<br>
<code>&lt;button onclick="cp4.edit('myfile.js','hiddencode')&gt;Edit&lt;/button&gt;</code>
</p>
-->
</ol>
<strong>Things to consider:</strong>
<ul>
<li>Be careful not to use the same id for two different CodePress windows (&lt;code id="<strong>xx</strong>" ...&gt;)</li>
<li>Options (class) allowed to <code>class="cp ..."</code> are <strong>hideMenu</strong>, <strong>hideFileName</strong>, <strong>hideLanguage</strong>, <strong>hideOptions</strong>. The "<strong>cp</strong>" class is mandatory.</li>
<li>If file does not exist on server, CodePress will open a new file with the name specified</li>
<li>You can change CodePress window width/height and other attributes overwriting the css properties. Example: <code>code.cp { width:500px;height:800px }</code></li>
</ul>
</li>


<br />

<strong>Getting code from CodePress window</strong><br />
<p>
Considering you have done the steps above and have CodePress up and running.
</p>

<ol>
	<li>Just call [id of the &lt;code&gt; tag].getCode()<br>
	Example 1: <code>alert(cp1.getCode())</code><br>
	Example 2: <code>var myCode = codepress.getCode()</code><br>
	Example 3: <code>document.getElementById('MyTextArea').value = cp2.getCode()</code></li>	
	</li>
</ol>
You may want to use CodePress.getCode() to get the content code from CodePress window and save it to your server since CodePress only open/edit files and do not save them.

<!-- 
<h3>FAQ</h3>

<br />
-->




<? include("includes/footer.php"); ?>