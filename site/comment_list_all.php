<? include("includes/header.php"); ?>

<body>
<style>#adsense {display:none;}</style>
<? include("includes/top.php"); ?>

<? include("includes/menu.php"); ?>


<h3>Comments <span style="color:black;">(<a href="javascript:scrollBottom()" style="color:black;">add new comment</a>)</span></h3>

<div id="comments">
	
<?php	

include_once("includes/database.php");

$rst = query("select * from comments order by datetime asc",$dbh);
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
		echo ' :: <strong>'.preg_replace("/ .*/","",$row['datetime']).'</strong><p>'. $comment.'</p></div>';
		echo "\n";
	}
}
?>

	<div id="newcomments"></div>
    <div id="yourcomment" class="comment">
		<a href="http://" id="yoururl"><strong id="yourname" class="name">Your name</strong></a> :: <strong id="yourdate"><?= date('Y-m-d') ?></strong>
	    <p id="yourtext">Your comment</p>
	</div>
</div><!--/comments-->

<!-- 
	<h3>Post a comment</h3>
	<div id="postcomment">
		<img src=images/preview.gif id="previewimg">
		<form name="comm">
		<input type="text" name="cname" value="Your name" onkeyup="commentPreview()" onclick="if(this.value=='Your name')this.value=''" /><br />
		<input type="text" name="curl" value="http://" onkeyup="commentPreview()" /><br />
		<textarea name="ccomment" onkeyup="commentPreview()" onclick="if(this.value=='Your comment')this.value=''" onfocus="if(this.value=='Your comment')this.value=''">Your comment</textarea><br />
		<div id="comment-msg"></div>
		</form>
		<button onclick="commentAdd()">submit your comment</button>
		<script type="text/javascript">commentPreview(1)</script>
	</div>
-->

<? include("includes/footer.php"); ?>
