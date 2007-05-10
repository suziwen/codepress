<?php

$changelog = array(
	array(
		'v' => '0.9.5',
		'd' => '01 may 07',
		'i' => array(
			'Added ASP and VBScript syntax highlighting. Thanks to Martin',
			'Added C# syntax highlighting.'
		)
	),
	array(
		'v' => '0.9.4',
		'd' => '01 may 07',
		'i' => array(
			'Fix to a security problem with codepress.html and eval(). Thanks to Dustin Spicuzza',
			'Fix to toggleReadOnly for IE. Now working with the first click',
			'Fix to iframe IE frameborder',
			'Initial support for ruby highlighting',
			'Some changes made so codepress.html can be used without codepress.js. <a href=javascript:showContent(\'nocodepresshtml\')>What does this mean?</a>&darr; <div id="nocodepresshtml" class="h">Means that you can access http://yourserver/codepress/codepress.html and have a clean CodePress windows outside the iframe. Also means that you can create your own iframe/frame window with CodePress inside and not using the automated iframe creation of codepress.js</div>'
		)
	),
	array(
		'v' => '0.9.3',
		'd' => '03 apr 07',
		'i' => array(
			'Added option to load editor without line numbers (besides de <code>toggleLineNumbers</code> method)',
			'Added option to load editor without auto-complete and a <code>toggleAutoComplete</code> method',
			'Added option to load editor as read only and a <code>toggleReadOnly</code> method',
			'Fix for the $$ Firefix bug. Reported by AJ',
			'Fix for the select all (ctrl+a) bug with IE',
			'Fix for IE undo/redo',
			'Some methods name changes and code cleaning',
		)
	),
	array(
		'v' => '0.9.2',
		'd' => '24 mar 07',
		'i' => array(
			'CodePress package remade. No more server side scripts. Lots of simplifications',
			'codepress.js remade. No more menu. Only methods to be called from outside',
			'CodePress tag \'code\' changed to \'textarea\'',
			'Not using the $ anymore (conflicts with so many other js libs)'
		)
	),
	array(	
		'v' => '0.9.1',		
		'd' => '11 mar 07',
		'i' => array(
			'Added multiple CodePress windows support',
			'&lt;? changed to &lt;?php',
			'Fix for IE\'s problem of losing line breaks with load code on demand',	
			'Fix to horizontal scroll problem for IE which deleted all code',
			'Fix to the "forward and back" problem on IE',
		)
	)
);

function getAllChangeLog($changelog) {
	for($i=0;$i<count($changelog);$i++) {
		echo '<h5>'. $changelog[$i]['v'] .' / '. $changelog[$i]['d'] .'</h5><ul>';
		for($n=0;$n<count($changelog[$i]['i']);$n++) {
			echo '<li>'. $changelog[$i]['i'][$n] .'</li>';
		}
	echo '</ul>';
	}
}

?>