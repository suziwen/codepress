<?php
include_once("includes/database.php");

$postname = $_POST['name'];
$posturl = $_POST['url'];
$postdate = date('Y-m-d H:i:s');
$postorder = $_POST['order'];

$postcomment = preg_replace('/&/', '&amp;', $_POST['comment']);
$postcomment = preg_replace('/</', '&lt;', $postcomment);
$postcomment = preg_replace('/>/', '&gt;', $postcomment);
$postcomment = preg_replace('/"/', '&quot;', $postcomment);

if($postorder == "") $postorder = $postdate;

if($posturl=='http://') $posturl = '';

$rst = query('INSERT INTO comments (name, url, datetime, orderdate, comment) VALUES ("'.$postname.'", "'.$posturl.'", "'.$postdate.'", "'.$postorder.'", "'.$postcomment.'")',$dbh);

echo "$postdate";

?>
