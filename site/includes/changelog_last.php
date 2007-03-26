<?php

$changelog = array(
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