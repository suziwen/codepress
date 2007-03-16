// common ////
function $(id) {
	return document.getElementById(id);
}

function showContent(id) {
	$(id).style.display = ($(id).style.display =='block') ? 'none' : 'block' ;

}

// ajax ////
AJAX = {
	xmlDoc : Object,

	get : function(url, options) {
		var parameters = options.parameters || false;
		var method = options.method || 'get';
	  	var async = options.async || true;
	  	var onStart = options.onStart || false;
	  	var onEnd = options.onEnd || false;
	  	var onError = options.onError || false;
		var request;
		
	  	if(window.XMLHttpRequest) {
	  		request = new XMLHttpRequest();
		}
	  	else if(window.ActiveXObject) {
	  		request = new ActiveXObject('Microsoft.XMLHTTP');
		}
	  	else { 
			alert('Your browser is not supported'); 
			return false; 
		}
	
	  	if(onStart) {
			eval(onStart);
		}
		
	  	request.open(method, url + (method=='get'&&parameters ? '?'+parameters : ''), async);
	  	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	  	request.onreadystatechange = function() {
		    if (request.readyState == 4) {
				if (request.status == 200) {
					xmlDoc = request.responseText;
		          	if(onEnd) {
		          		eval(onEnd);
					}
		        	return true;
		        }
				else {
		         	if(onError) {
		         		eval(onError);
					}
		          	return false;
		        }
			}
	  	};

	  	request.send(method=='post' ? parameters.replace(/\+/g,'%2B') : null);
	}
}

// expand changelog items
function versionExpand(id) {
	$(id).style.display = ($(id).style.display=='block') ? 'none' : 'block' ;
}


// blog comments ////
function commentPreview() {
	$('comment-msg').style.display = 'none';
	$('yourcomment').style.display = $('previewimg').style.display = 'block';
	$('yoururl').href = document.comm.curl.value.replace(/[<>]/g,'');
	$('yourname').innerHTML = document.comm.cname.value.replace(/[<>]/g,'');
	commtxt = document.comm.ccomment.value;
	commtxt = commtxt.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
	commtxt = commtxt.replace(/\n/g,'<br>');
	$('yourtext').innerHTML = commtxt;
	//if(arguments[0]!=1)scrollBottom();
}

function commentMsg(msg,type) {
	$('comment-msg').style.backgroundColor = (type=='error') ? 'red' : 'darkgreen';
	$('comment-msg').innerHTML = msg;
	$('comment-msg').style.display = 'block';
}

function commentAdd() {
	cName = document.comm.cname.value;
	cUrl = document.comm.curl.value;
	cComment = document.comm.ccomment.value;
	cOrder = document.comm.corderdate.value;	
	if(cName==''||cName=='Your name') commentMsg('Name is a required','error');
	else if(cComment==''||cComment=='Your comment') commentMsg('Comment is a required','error');
	else {
		AJAX.get('comment_add.php', { 
			parameters: 'name='+cName+'&url='+cUrl+'&order='+cOrder+'&comment='+ encodeURIComponent(cComment),
			method:'post',
			onEnd:'commentMsg("Comment posted","info");commentUpdate(xmlDoc);', 
			onError:'commentMsg("Error posting comment, try again","error");'
			});
	document.comm.cname.value = 'Your name';
	document.comm.curl.value = 'http://';
	document.comm.ccomment.value = 'Your comment';
	}
	return false;
}

var z = 0;
var d = '';
function reply(n) {
	if (z==0) z = document.getElementById('n1');
	d = n.nextSibling;
	if(d.innerHTML == '') {
		document.getElementById('postnewcomment').style.display = (arguments[1]!='') ? 'block' : 'none';
		document.comm.corderdate.value = arguments[1];
		d.innerHTML = document.getElementById('n1').innerHTML;
		d.style.marginLeft = (arguments[1]!='') ? '25px' : '0';
		document.getElementById('n1').innerHTML = '';
		document.getElementById('n1').id = '';
		d.id = 'n1';
	}
}

function commentUpdate(x) {
	newCommentAdded = $('yourcomment').innerHTML.replace(/id=\"your.*?\"/g,'');
	if(newCommentAdded.indexOf('"http:\/\/"')!=-1)  newCommentAdded = newCommentAdded.replace(/<a.*?>/,'');
	$('newcomments').innerHTML = $('newcomments').innerHTML + '<div class="comment">'+newCommentAdded+'</div>';
	$('yourcomment').style.display = 'none';
	$('previewimg').style.display = 'none';

	d.id = '';
	z.id = 'n1';
	
	d.innerHTML = $('newcomments').innerHTML;
	$('newcomments').innerHTML ='';

	$('yourname').innerHTML = 'Your name';
	$('yoururl').href = 'http://';
	$('yourtext').innerHTML = 'Your comment';

	
}

function commentExpand(id,obj) {
	$(id).style.display = 'inline' ;
	obj.style.display = 'none';	
}

function scrollBottom() {
   scrollBy(0,document.body.scrollHeight);
}
