<?php
/*
 * CodePress - Real Time Syntax Highlighting Editor written in JavaScript -  http://codepress.fermads.net/
 *
 * Copyright (C) 2006 Fernando M.A.d.S. <fermads@gmail.com>
 *
 * This program is free software; you can redistribute it and/or modify it under the terms 
 * of the GNU Lesser General Public License as published by the Free Software Foundation.
 *
 * Read the full licence: http://www.opensource.org/licenses/lgpl-license.php
 *
 *
 * Very simple implementation of server side script
 * to open files and send to CodePress interface
 */

$path['files'] = "examples";  // directory of files to edit

// no need to change below ////////////////////////////////////////////////////
$path['webdocs'] = dirname($_SERVER['SCRIPT_NAME']);
$path['server'] = $_SERVER['DOCUMENT_ROOT'];

$code = "";
$language = "generic";
$supported = ($_GET['supported']=="true") ? true : false ;


if(isset($_GET['file'])) {
    $file = basename($_GET['file']);
	$full_file = $path['server'].'/'.$path['webdocs'].'/'.$path['files']."/".$file;
	if(file_exists($full_file)) {
	    $code = file_get_contents($full_file);
	    $code = preg_replace("/&/","&amp;",$code);
	    $code = preg_replace("/</","&lt;",$code);
	    $code = preg_replace("/>/","&gt;",$code);
		if(!$supported)$code = preg_replace("/\r\n/","<br>",$code);
		if(isset($_GET['language'])) $language = $_GET['language'];
	}
}

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
	<title>CodePress - Real Time Syntax Highlighting Editor written in JavaScript</title>
	<meta name="description" content="CodePress source code editor window" />

	<link type="text/css" href="codepress.css?timestamp=<?=time()?>" rel="stylesheet" />
	<link type="text/css" href="languages/<?=$language?>.css?timestamp=<?=time()?>" rel="stylesheet" id="cp-lang-style" />

	<? if($supported) { ?>
		<script type="text/javascript" src="codepress.js?timestamp=<?=time()?>"></script>
		<script type="text/javascript" src="languages/<?=$language?>.js?timestamp=<?=time()?>"></script>
		<script type="text/javascript">
			parent.cpBody = parent.document.getElementById('cp-editor').contentWindow;
			parent.CodePress.addEvent(window,'load',function() { CodePress.initialize('new'); },true);
		</script>
	</head>
	<body id="ffedt"><pre id="ieedt"><?=$code?></pre></body>
	<? } else { ?>
		<script type="text/javascript">parent.CodePress.addEvent(window,'load',function() { 
				document.getElementById('ffedt').contentEditable = true; 
				parent.cpBody = parent.document.getElementById('cp-editor').contentWindow;
				editor = document.getElementById('ffedt'); 
			},true);
		</script>
	</head>
	<body id="ffedt"><?=$code?></body>
	<? } ?>
</html>