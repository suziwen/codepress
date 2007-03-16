<cfsetting showdebugoutput="no">
<!---
CodePress - Real Time Syntax Highlighting Editor written in JavaScript -  http://codepress.org/

Copyright (C) 2006 Fernando M.A.d.S. <fermads@gmail.com>

This program is free software; you can redistribute it and/or modify it under the terms 
of the GNU Lesser General Public License as published by the Free Software Foundation.

Read the full licence: http://www.opensource.org/licenses/lgpl-license.php

Very simple implementation of server side script to open files and send to CodePress interface

Ported to Cold Fusion by Daemach March 2007 <daemach@gmail.com> http://daemach.blogspot.com
--->

<!---
The only parameter you need to configure is the root directory of files to open/edit from server
there are 2 ways to set the file directory. See examples below, edit and comment/uncomment the appropriate
--->

<!---RELATIVE to codepress directory installation: will open file from [root path of your server]/[codepress directory]/examples/--->

<cfset path = "examples">

<!---ABSOLUTE from your webserver root path: will open files from [root path of your server]/examples/--->
<!--- <cfset path = "/examples"> --->

<!--- ========================= Nothing below this line needs to be modified ========================= --->

<cfparam name="url.language" default="generic">
<cfparam name="url.engine" default="gecko">
<cfparam name="url.action" default="edit">
<cfparam name="url.file" default="codepress.js">

<cfif left(path,1) is "/">
	<!---absolute--->
	<cfset shortcut = ListChangeDelims(cgi.script_name,"\","/")>
	<cfset root = replaceNoCase(GetCurrentTemplatePath(),shortcut,"") & path>
<cfelse>
	<!---relative--->
	<cfset root = replaceNoCase(GetDirectoryFromPath(GetCurrentTemplatePath()),"\modules","") & path>
</cfif>

<cfset fullFilePath = "#root#\#replace(url.file,"../","","ALL")#">

<cfif fileExists(fullFilePath)>
	<cffile action="read" file="#fullFilePath#" variable="code">
<cfelse>
	<cfset code = "I'm sorry, but that file doesn't exist.  Please try another.">
</cfif>

<cfoutput>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
	<title>CodePress - Real Time Syntax Highlighting Editor written in JavaScript</title>
	<meta name="description" content="CodePress source code editor window" />
	<link type="text/css" href="../themes/default/codepress.css?timestamp=#GetHttpTimeString(now())#" rel="stylesheet" />
	<link type="text/css" href="../languages/#url.language#.css?timestamp=#GetHttpTimeString(now())#" rel="stylesheet" id="cp-lang-style" />
	<script type="text/javascript" src="../engines/#url.engine#.js?timestamp=#GetHttpTimeString(now())#"></script>
	<script type="text/javascript" src="../languages/#url.language#.js?timestamp=#GetHttpTimeString(now())#"></script>
</head>
<cfif url.engine is "gecko">
	<body id='code'>This is a ColdFusion backend!<hr />#htmlEditFormat(code)#</body>
<cfelse>
	<body><pre id='code'>This is a ColdFusion backend!<hr />#htmlEditFormat(code)#</pre></body>
</cfif>
</html>
</cfoutput>