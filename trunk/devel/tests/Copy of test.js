/**
 * @author feanndor
 */


CodePress.Test = {
	
	init : function() {
		this.log = '<table style="border:1px solid gray;padding:0;">';
		this.log += '<tr style="background:silver;"><td>id</td><td>time</td><td>expected</td><td>result</td></tr>';
	},
	
	test : function(id, expected, result) {
		try {
			var ini = arguments[3] || (new Date()).getTime();
			var result = result.call();
			var end = (new Date()).getTime();
	
			if(result===expected)
				this.message('success', id, end-ini, expected, result);
			else 
				this.message('error', id, end-ini, expected, result);
		} 
		catch (e) {
			this.message('error', id, '?', expected, e);
		}
	},
	
	message : function(type, id, time, expected, result) {
		this.log += '<tr style="background:'+( type=='error' ? 'red' : 'lightgreen' )+';">';
		this.log += '<td>'+id+'</td><td>'+time+'</td>';
		this.log += '<td>'+expected+'</td>';
		this.log += '<td>'+result+'</td></tr>';		
	},
	
	end : function() {
		this.log += '</table>';
		var testResult = document.getElementById('test-result');
		testResult.innerHTML = this.log;
	}
	
}

CodePress.Test.run = function(cp) {
	
	CodePress.Test.init();
	
	// textarea ///////////////////////////////////////////////
	CodePress.Test.test('textarea.id','cp2', function() {
		return cp.textarea.id;
	});

	CodePress.Test.test('textarea.style.backgroundColor','gold', function() {
		cp.textarea.style.backgroundColor = 'gold';
		return cp.textarea.style.backgroundColor;
	});

	// iframe /////////////////////////////////////////////////
	CodePress.Test.test('iframe.style.width', cp.textarea.style.width, function() {
		return cp.iframe.style.width;
	});

	CodePress.Test.test('iframe.style.border', '1px solid red', function() {
		cp.iframe.style.border = '1px solid red'
		return cp.iframe.style.border;
	});

	// code ///////////////////////////////////////////////////
	CodePress.Test.test('Editor.code set/get','tessssssst', function() {
		cp.Editor.code('tessssssst');
		return cp.Editor.code();
	});

	// enable /////////////////////////////////////////////////
	CodePress.Test.test('Editor.active false',false, function() {
		cp.Editor.active(true);
		cp.Editor.active(false);		
		return cp.Editor.active();
	});

	CodePress.Test.test('Editor.active true',true, function() {
		cp.Editor.active(false);
		cp.Editor.active(true);		
		return cp.Editor.active();
	});

	// readonly /////////////////////////////////////////////////
	CodePress.Test.test('Editor.editable true',true, function() {
		cp.Editor.editable(false);
		cp.Editor.editable(true);		
		return cp.Editor.editable();
	});

	CodePress.Test.test('Editor.editable false',false, function() {
		cp.Editor.editable(true);
		cp.Editor.editable(false);		
		return cp.Editor.editable();
	});

	// TO-DO : test if document.getElementById('cp1a').innerHTML == cp.Editor.code() == cp.textarea.value;

	// language ////////////////////////////////////////////////
	var iniTime = (new Date()).getTime(); // since we are doing something on a callback, we need the real initial time
	cp.Editor.language('javascript', function(){ // set language to javascript and call Test on callback
		CodePress.Test.test('Language.id + Editor.language set', 'javascript', function() {
			///
			var iniTime = (new Date()).getTime(); 
			cp.Editor.language('generic', function() { 	// can only start a new language test after the first one
				CodePress.Test.test('Editor.language set/get', 'generic', function() {
					
					///
					var iniTime = (new Date()).getTime();
					cp.Editor.open({language:'generic',code:'cp1a',callback:function() { 	// can only start a new language test after the first one
						CodePress.Test.test('Editor.open id', true, function() {
							return cp.Editor.language()=='generic' && document.getElementById('cp1a').innerHTML == cp.textarea.value;
						}, iniTime);
						CodePress.Test.end(); // end tests after callbacks
					}});
					///

					return cp.Editor.language();
				}, iniTime);
			});
			///
			return cp.Language.id;	
		}, iniTime)	// real initial time
	}); 


}


//onload = setTimeout(function(){
//	CodePress.Test.run(CodePress['cp2']);
//},1000)
