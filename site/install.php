<? include("includes/header.php"); ?>

<body>
<style>#adsense {display:none;}</style>
<? include("includes/top.php"); ?>


<? include("includes/menu.php"); ?>


<h3>Installation</h3>
<ol>
	<li>
		<p>
			<a href="http://codepress.org/">Download</a> and uncompress CodePress under a directory inside your webserver.<br>
			Example:<strong> http://yourserver/codepress/</strong><br />
			Since CodePress is pure JavaScript and HTML, you can also test it without a webserver.
		</p>
	</li>
	<li>
		<p>
			Insert CodePress script somewhere in your page inside the <code>&lt;head&gt;</code> or above the <code>&lt;/body&gt;</code> tag.
		</p>
	
		<p class="copycode">
			&lt;script src="/codepress/codepress.js" type="text/javascript"&gt;&lt;/script&gt;
		</p>
	</li>
	
	<li>
		<p>
			Add the <code>&lt;textarea&gt;</code> tag to the place on your page you want CodePress to appear. CodePress will inherit the width and height of your textarea.
			When the page loads, it will automatically replace your textarea with a CodePress window.
		</p>
		<p class="copycode">
			&lt;textarea id="myCpWindow" class="codepress javascript"&gt;<br />
			&nbsp;&nbsp;&nbsp;// your JavaScript code here<br />
			&lt;/textarea&gt;
		</p>
		<ul>
			<li>
				The <code>javascript</code> portion of the class="" means that the language being edited is JavaScript.
			</li>
			<li>
				The <code>codepress</code> portion of the class="" is mandatory and indicates a textarea to be replaced for a CodePress window.
			</li>
			<li>
				Careful not to use the same id for two different CodePress windows (<code>&lt;textarea id="<strong>xx</strong>"...&gt;</code>)
			</li>
		</ul>
	</li>
</ol>

<h3>You also can...</h3>
<ol>
	<li>
		Open/edit code from a different textarea.<br />
		Example: <code>textarea_id.edit('other_textarea_id','language')</code><br>
	</li>
	<li>
		Get code from CodePress window.<br />
		Example: <code>textarea_id.getCode()</code><br>
	</li>
	<li>
		Turn on/off CodePress editor and return to the regular textarea.<br />
		Example: <code>textarea_id.toogleEditor()</code><br>
	</li>
	<li>
		Turn on/off line numbers.<br />
		Example: <code>textarea_id.toogleLineNumbers()</code><br>
	</li>
</ol>

<? include("includes/footer.php"); ?>