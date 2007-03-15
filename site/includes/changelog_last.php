<?php

$changelog = array(
/*	array(
		'v' => '0.9.2',
		'd' => '14 mar 07',
		'i' => array(
			'CSS fixes',
			'Better examples added to the distribution package',
			'Beginning of themes and modules configuration',
			'Fix to horizontal scroll problem for IE which deleted all code',
			'Fix to the "forward and back" problem on IE'
		)
	),*/
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

function getLastChangeLog($changelog){
//	echo '<h5>'. $changelog[0]['v'] .' / '. $changelog[0]['d'] .'</h5>';
	echo '<ul>';
	for($n=0;$n<count($changelog[0]['i']);$n++) {
		echo '<li>'. $changelog[0]['i'][$n] .'</li>';		
	}
	echo '</ul>';
}

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