<?php
function query($sql,$dbh) {
	$result = array();
	if ($resource = mysql_query($sql, $dbh)) {
		return $resource;
	}
	else {
		trigger_error('Query error: ' . mysql_error($dbh) . ' SQL: ' . $sql);
		return false;
	}
}


if($_SERVER['HTTP_HOST']!="localhost") { 
	$dbh=mysql_connect ("mysql4-c", "c186981rw", "[hiddenvalue]") or die ('I cannot connect to the database because: ' . mysql_error());
	mysql_select_db ("c186981_site");
}
else {
	$dbh=mysql_connect ("localhost", "root", "") or die ('I cannot connect to the database because: ' . mysql_error());
	mysql_select_db ("codepress");
}


?>