<?php	

include_once("includes/database.php");

$rst = query("select * from (select * from comments order by datetime desc limit 25) as smtg order by datetime asc", $dbh);
//$rst = query("select * from comments order by datetime asc",$dbh);
$count = 0;
while ($row = mysql_fetch_assoc($rst)) {
	$count++;
	$me = ($row['url']=='http://fermads.net/') ? ' me' : '';
	if($row['active']==1) {
		echo '<div class="comment'.$me.'">';
		if($row['url']!='') echo '<a href="'.$row['url'].'">';
		echo '<strong class="name">'.$row['name'].'</strong>';
		if($row['url']!='') echo '</a>';
		$comment_lines = preg_split ("/\n/", $row['comment']);
		$comment = '';
		$total_lines = count($comment_lines);
		for($i=0;$i<$total_lines;$i++) {
			$comment .= $comment_lines[$i];
			if($i==2&&$total_lines>7) $comment .= " <a href='javascript:void(0)' onclick=commentExpand('comm".$count."',this)>... expand and read the rest</a><span id='comm".$count."' class=hc>";
			$comment .= "<br />";
		}
		if($total_lines>7) $comment .= "</span>";
		echo ' &raquo; <strong>'.preg_replace("/ .*/","",$row['datetime']).'</strong><p>'. $comment.'</p></div>';
		echo "\n";
	}
}
?>