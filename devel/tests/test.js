/**
 * @author feanndor
 */

(function(){

var expected = [];
var result = [];
var actual = 0;
var title = '';
var ini, end, cp, log;

CodePress.Test = {
	
	run : function() {
		actual = 0;
		//cp = arguments[0];
		log = '<table style="border:1px solid gray;padding:0;">';
		log += '<tr style="background:silver;"><td>id</td><td>time</td>';
		log += '<td>expected</td><td>result</td></tr>';

		CodePress.Test.tests[actual++].call();
	},
	
	next : function() {
		result===expected ?
			this.message('success') : 
			this.message('error');
		
		result = undefined;
		actual < CodePress.Test.tests.length ?
			CodePress.Test.tests[actual++].call() :
			this.end();
	}, 

	startTimer : function() {
		ini = (new Date()).getTime();	
	},
	
	stopTimer : function() {
		end = (new Date()).getTime();
	},
	
	message : function(type) {
		log += '<tr style="background:'+(type=='error' ? 'red' : 'lightgreen')+'">';
		log += '<td>'+title+'</td><td>'+( end-ini )+'</td>';
		log += '<td>'+expected+'</td>';
		log += '<td>'+result+'</td></tr>';		
	},
	
	end : function() {
		log += '</table>';
		document.getElementById('test-result').innerHTML = log;
	}
	
}

var $ = CodePress.Test; // shortcut

CodePress.Test.tests = [
	
	function() {
		title = 'CodePress Creation + cp.onload';
		expected = true;
		$.startTimer();

		var container = document.getElementById('dyn-codepress');
		container.innerHTML = '';
		var textarea = document.createElement('textarea');
		textarea.id = 'cp3'
		textarea.style.width = '100%'
		textarea.style.height = '100%'
		textarea.className = 'codepress language:text snippets:true complete:true active:true shortcuts:true highlight:true editable:true';
		container.appendChild(textarea);
		cp = new CodePress.instance(textarea);
		cp.onload = function () { 
			$.stopTimer();
			result = true;
			$.next();
		};		
	},

	function() {
		title = 'cp.textarea.id';
		expected = 'cp3';
		$.startTimer();
		result = cp.textarea.id;
		$.stopTimer();
		$.next();
	},

	function() {
		title = 'cp.textarea.style';
		expected = 'white';
		cp.textarea.style.backgroundColor = 'red';
		$.startTimer();
		cp.textarea.style.backgroundColor = 'white';
		$.stopTimer();
		result = cp.textarea.style.backgroundColor;
		$.next();
	},
	
	function() {
		title = 'cp.iframe.style';
		expected = '1px solid black';
		cp.iframe.style.border = '1px solid red';
		$.startTimer();
		cp.iframe.style.border = '1px solid black';
		$.stopTimer();
		result = cp.iframe.style.border;
		$.next();
	},

	function() {
		title = 'cp.Engine.body.style';
		expected = 'white';
		cp.Engine.body.style.backgroundColor = 'red'
		$.startTimer();
		cp.Engine.body.style.backgroundColor = 'white'
		$.stopTimer();
		result = cp.Engine.body.style.backgroundColor;
		$.next();
	},
	
	function() {
		title = 'cp.Editor.language set/get + callback';
		expected = 'javascript';
		$.startTimer();
		cp.Editor.language('javascript', function() {
			result = cp.Editor.language();
			$.stopTimer();
			$.next();
		});
	},
	
	function() {
		title = 'cp.Editor.code set/get';
		expected = 'function teste() { alert("test"); }';
		cp.Editor.code('');
		$.startTimer();
		cp.Editor.code('function teste() { alert("test"); }');
		result = cp.Editor.code();
		$.stopTimer();
		$.next();
	},
	
	function() {
		title = 'cp.Editor.snippets set false + get';
		expected = false;
		cp.Editor.snippets(true);
		$.startTimer();
		cp.Editor.snippets(false);
		$.stopTimer();
		result = cp.Editor.snippets();
		$.next();
	},
	
	function() {
		title = 'cp.Editor.snippets set true + get';
		expected = true;
		cp.Editor.snippets(false);
		$.startTimer();
		cp.Editor.snippets(true);
		$.stopTimer();
		result = cp.Editor.snippets();
		$.next();
	},	

	function() {
		title = 'cp.Editor.complete set false + get';
		expected = false;
		cp.Editor.complete(true);
		$.startTimer();
		cp.Editor.complete(false);
		$.stopTimer();
		result = cp.Editor.complete();
		$.next();
	},
	
	function() {
		title = 'cp.Editor.complete set true + get';
		expected = true;
		cp.Editor.complete(false);
		$.startTimer();
		cp.Editor.complete(true);
		$.stopTimer();
		result = cp.Editor.complete();
		$.next();
	},	

	function() {
		title = 'cp.Editor.highlight set false + get';
		expected = false;
		cp.Editor.highlight(true);
		$.startTimer();
		cp.Editor.highlight(false);
		$.stopTimer();
		result = cp.Editor.highlight();
		$.next();
	},
	
	function() {
		title = 'cp.Editor.highlight set true + get';
		expected = true;
		cp.Editor.highlight(false);
		$.startTimer();
		cp.Editor.highlight(true);
		$.stopTimer();
		result = cp.Editor.highlight();
		$.next();
	},	

	function() {
		title = 'cp.Editor.shortcuts set false + get';
		expected = false;
		cp.Editor.shortcuts(true);
		$.startTimer();
		cp.Editor.shortcuts(false);
		$.stopTimer();
		result = cp.Editor.shortcuts();
		$.next();
	},
	
	function() {
		title = 'cp.Editor.shortcuts set true + get';
		expected = true;
		cp.Editor.shortcuts(false);
		$.startTimer();
		cp.Editor.shortcuts(true);
		$.stopTimer();
		result = cp.Editor.shortcuts();
		$.next();
	},	

	function() {
		title = 'cp.Editor.active set false + get';
		expected = false;
		cp.Editor.active(true);
		$.startTimer();
		cp.Editor.active(false);
		$.stopTimer();
		result = cp.Editor.active();
		$.next();
	},

	function() {
		title = 'cp.Editor.active set true + get';
		expected = true;
		cp.Editor.active(false);
		$.startTimer();
		cp.Editor.active(true);
		$.stopTimer();
		result = cp.Editor.active();
		$.next();
	},
	
	function() {
		title = 'cp.Editor.editable set false + get';
		expected = false;
		cp.Editor.editable(true);
		$.startTimer();
		cp.Editor.editable(false);
		$.stopTimer();
		result = cp.Editor.editable();
		$.next();
	},

	function() {
		title = 'cp.Editor.editable set true + get';
		expected = true;
		cp.Editor.editable(false);
		$.startTimer();
		cp.Editor.editable(true);
		$.stopTimer();
		result = cp.Editor.editable();
		$.next();
	},
	
	function() {
		title = 'cp.Editor.engine get';
		expected = 'gecko';
		$.startTimer();
		result = cp.Editor.engine();
		$.stopTimer();
		$.next();
	},
	
	function() {
		title = 'cp.Editor.open options arguments';
		expected = true;
		$.startTimer();
		
		cp.Editor.open({language:'generic', 
						code:'function () { alert("test2"); }', 
						snippets:false,
						complete:false,
						active:false,
						shortcuts:false,
						highlight:false,
						editable:false,
						callback:function() {
			$.stopTimer();
			
			result = (! (cp.Editor.snippets() || cp.Editor.complete() || cp.Editor.active() || 
					  cp.Editor.shortcuts() || cp.Editor.highlight() ||
					  cp.Editor.editable()) && cp.Editor.language() == 'generic')

			$.next();
		}});
	},

	function() {
		title = 'cp.Editor.open options className';
		expected = true;
		$.startTimer();
		
		cp.Editor.open({callback:function() {
			$.stopTimer();

			result = ((cp.Editor.snippets() || cp.Editor.complete() || cp.Editor.active() || 
					  cp.Editor.shortcuts() || cp.Editor.highlight() ||
					  cp.Editor.editable()) && cp.Editor.language() == 'text')

			$.next();
		}});
	},
	
		function() {
		title = 'cp.Editor.open options className + arguments';
		expected = true;
		$.startTimer();
		
		cp.Editor.open({language:'javascript', callback:function() {
			$.stopTimer();

			result = ((cp.Editor.snippets() || cp.Editor.complete() || cp.Editor.active() || 
					  cp.Editor.shortcuts() || cp.Editor.highlight() ||
					  cp.Editor.editable()) && cp.Editor.language() == 'javascript')

			$.next();
		}});
	}
]
	
})();	

