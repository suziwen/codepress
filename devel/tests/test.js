/**
 * CodePress tests
 */

/* TESTS
 
// codepress creation
CodePress creation via class + cp.onload
CodePress creation via javascript + cp.onload

// textarea
cp.textarea.id get
cp.textarea.style set/get

// iframe
cp.iframe.style set/get

// snippets
cp.Engine.snippets set false + get
cp.Engine.snippets set true + get
cp.Engine.snippets set wrong value + get

// complete
cp.Engine.complete set false + get
cp.Engine.complete set true + get
cp.Engine.complete set wrong value + get

// highlight
cp.Engine.highlight set false + get
cp.Engine.highlight set true + get
cp.Engine.highlight set wrong value + get

// shortucuts
cp.Engine.shortcuts set false + get
cp.Engine.shortcuts set true + get
cp.Engine.shortcuts set wrong value + get

// active
cp.Editor.active set false + get
cp.Editor.active set true + get
cp.Editor.active set wrong value + get

// editable
cp.Editor.editable set false + get
cp.Editor.editable set true + get
cp.Editor.editable set wrong value + get

// language
cp.Editor.language set
cp.Editor.language get
cp.Editor.language set + callback
cp.Editor.language set wrong language + get

// code
cp.Editor.code set
cp.Editor.code get CP
cp.Editor.code get textarea

// Engine
cp.Engine.name get
cp.Engine.body.style set/get

// open
cp.Editor.open options arguments
cp.Editor.open options className
cp.Editor.open options className + arguments
cp.Editor.open options arguments + code via getEbyId
cp.Editor.open options arguments + code via innerHTML
cp.Editor.open options arguments + code via string

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
		title = 'CodePress creation via class + cp.onload';
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
		cp.options = {
			onload : function () { 
				$.stopTimer();
				result = (cp.Engine.snippets() && cp.Engine.complete() && cp.Editor.active() && 
						  cp.Engine.shortcuts() && cp.Engine.highlight() &&
						  cp.Editor.editable() && cp.Editor.language() == 'text')
				$.next();
			}
		}	
	},

	function() {
		title = 'CodePress reload via cp.options + callback';
		expected = true;
		$.startTimer();
		cp.options = {
			code:'function () { alert("test3"); }', 
			snippets:false,
			complete:false,
			active:false,
			shortcuts:false,
			highlight:false,
			editable:false,			
			language:'javascript',
			callback:function () { 
				$.stopTimer();
				result = ((!cp.Engine.snippets() && !cp.Engine.complete() && !cp.Editor.active() && 
						  !cp.Engine.shortcuts() && !cp.Engine.highlight() &&
						  !cp.Editor.editable()) && cp.Editor.language() == 'javascript')
				$.next();
			}
		}

		cp.Editor.open();
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
		title = 'cp.Engine.snippets set false + get';
		expected = false;
		cp.Engine.snippets(true);
		$.startTimer();
		cp.Engine.snippets(false);
		$.stopTimer();
		result = cp.Engine.snippets();
		$.next();
	},
	
	function() {
		title = 'cp.Engine.snippets set true + get';
		expected = true;
		cp.Engine.snippets(false);
		$.startTimer();
		cp.Engine.snippets(true);
		$.stopTimer();
		result = cp.Engine.snippets();
		$.next();
	},	

	function() {
		title = 'cp.Engine.complete set false + get';
		expected = false;
		cp.Engine.complete(true);
		$.startTimer();
		cp.Engine.complete(false);
		$.stopTimer();
		result = cp.Engine.complete();
		$.next();
	},
	
	function() {
		title = 'cp.Engine.complete set true + get';
		expected = true;
		cp.Engine.complete(false);
		$.startTimer();
		cp.Engine.complete(true);
		$.stopTimer();
		result = cp.Engine.complete();
		$.next();
	},	

	function() {
		title = 'cp.Engine.highlight set false + get';
		expected = false;
		cp.Engine.highlight(true);
		$.startTimer();
		cp.Engine.highlight(false);
		$.stopTimer();
		result = cp.Engine.highlight();
		$.next();
	},
	
	function() {
		title = 'cp.Engine.highlight set true + get';
		expected = true;
		cp.Engine.highlight(false);
		$.startTimer();
		cp.Engine.highlight(true);
		$.stopTimer();
		result = cp.Engine.highlight();
		$.next();
	},	

	function() {
		title = 'cp.Engine.shortcuts set false + get';
		expected = false;
		cp.Engine.shortcuts(true);
		$.startTimer();
		cp.Engine.shortcuts(false);
		$.stopTimer();
		result = cp.Engine.shortcuts();
		$.next();
	},
	
	function() {
		title = 'cp.Engine.shortcuts set true + get';
		expected = true;
		cp.Engine.shortcuts(false);
		$.startTimer();
		cp.Engine.shortcuts(true);
		$.stopTimer();
		result = cp.Engine.shortcuts();
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
		title = 'cp.Editor.language set/get wrong language';
		expected = 'generic';
		$.startTimer();
		cp.Editor.language('ajdfklajdd', function() {
			result = cp.Editor.language();
			$.stopTimer();
			$.next();
		});
	},

	function() {
		title = 'cp.Editor.code codepress set/get';
		expected = 'function teste() { alert("test codepress"); }';
		cp.Editor.code('');
		$.startTimer();
		cp.Editor.code('function teste() { alert("test codepress"); }');
		result = cp.Editor.code();
		$.stopTimer();
		$.next();
	},

	function() {
		title = 'cp.Editor.code textarea set/get';
		expected = 'function teste() { alert("test textarea"); }';
		cp.Editor.active(false);
		cp.Editor.code('');
		$.startTimer();
		cp.Editor.code('function teste() { alert("test textarea"); }');
		result = cp.Editor.code();
		$.stopTimer();
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
		title = 'cp.Engine.name get';
		expected = 'gecko';
		$.startTimer();
		result = cp.Engine.name;
		$.stopTimer();
		$.next();
	},
	
	function() {
		title = 'cp.Editor.open options arguments';
		expected = true;
		$.startTimer();
		
		cp.Editor.open({language:'javascript', 
						code:'function () { alert("test2"); }', 
						snippets:false,
						complete:false,
						active:false,
						shortcuts:false,
						highlight:false,
						editable:false,
						callback:function() {
			$.stopTimer();

			result = (!cp.Engine.snippets() && !cp.Engine.complete() && !cp.Editor.active() && 
					  !cp.Engine.shortcuts() && !cp.Engine.highlight() &&
					  !cp.Editor.editable() && cp.Editor.language() == 'javascript')

			$.next();
		}});
	},

	function() {
		title = 'cp.Editor.open options className';
		expected = true;
		$.startTimer();

		cp.textarea.className = 'codepress language:text snippets:true complete:true active:true shortcuts:true highlight:true editable:true';
		cp.Editor.open({callback:function() {
			$.stopTimer();
			
			result = (cp.Engine.snippets() && cp.Engine.complete() && cp.Editor.active() && 
					  cp.Engine.shortcuts() && cp.Engine.highlight() &&
					  cp.Editor.editable() && cp.Editor.language() == 'text')

			$.next();
		}});
	},
	
	function() {
		title = 'cp.Editor.open options className + arguments';
		expected = true;
		$.startTimer();

		cp.textarea.className = 'codepress language:text complete:false shortcuts:false highlight:false editable:false';
		cp.Editor.open({snippets:true,active:true,callback:function() {
			$.stopTimer();
			
			result = (cp.Engine.snippets() && !cp.Engine.complete() && cp.Editor.active() && 
					  !cp.Engine.shortcuts() && !cp.Engine.highlight() &&
					  !cp.Editor.editable() && cp.Editor.language() == 'text')

			$.next();
		}});
	},

	function() {
		title = 'cp.Editor.open options arguments + code via string';
		expected = '1234';
		$.startTimer();

		cp.Editor.open({code:'1234', callback:function() {
			$.stopTimer();
			
			result = cp.Editor.code();

			$.next();
		}});
	},
	
	function() {
		title = 'cp.Editor.open options arguments + code via getElemById';
		expected = 'CodePressTest = function() {	document.write(\'testing\'); }';
		$.startTimer();

		cp.Editor.open({code:document.getElementById('hidden-code'), callback:function() {
			$.stopTimer();
			
			result = cp.Editor.code();

			$.next();
		}});
	},

	function() {
		title = 'cp.Editor.open options arguments + code via string id';
		expected = 'CodePressTest = function() {	document.write(\'testing\'); }';
		$.startTimer();

		cp.Editor.open({editable:true, highlight:true, language:'javascript', code:'hidden-code', callback:function() {
			$.stopTimer();
			
			result = cp.Editor.code();

			$.next();
		}});
	}	
]
	
})();	


function bla() {
	alert(3)
}
