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

$dbh=mysql_connect ("mysql4-c", "c186981rw", "sfmysqlrw") or die ('I cannot connect to the database because: ' . mysql_error());
mysql_select_db ("c186981_site");
?>