<?php
include_once("includes/database.php");

$epw = "\$1\$rf/.Yp4.\$wxThggPMHiOT7w8.yP9Ki.";

$postname = $_POST['name'];
$posturl = $_POST['url'];
$postdate = date('Y-m-d H:i:s');
$postorder = $_POST['order'];
$pwd = $_POST['pwd'];

$postcomment = preg_replace('/&/', '&amp;', $_POST['comment']);
$postcomment = preg_replace('/</', '&lt;', $postcomment);
$postcomment = preg_replace('/>/', '&gt;', $postcomment);
$postcomment = preg_replace('/"/', '&quot;', $postcomment);

if($postorder == "") $postorder = $postdate;

if($posturl=='http://') $posturl = '';

if (crypt($pwd, $epw) != $epw && $postname == "fermads") {
	$postname = "Anonymous";
	$posturl = "";
}

$rst = query('INSERT INTO comments (name, url, datetime, orderdate, comment) VALUES ("'.$postname.'", "'.$posturl.'", "'.$postdate.'", "'.$postorder.'", "'.$postcomment.'")',$dbh);
echo "$postdate";
	

?>
