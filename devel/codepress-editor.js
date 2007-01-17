/*
 * CodePress - Real Time Syntax Highlighting Editor written in JavaScript - http://codepress.fermads.net/
 * 
 * Copyright (C) 2006 Fernando M.A.d.S. <fermads@gmail.com>
 *
 * This program is free software; you can redistribute it and/or modify it under the terms of the 
 * GNU Lesser General Public License as published by the Free Software Foundation.
 * 
 * Read the full licence: http://www.opensource.org/licenses/lgpl-license.php
 */

$ = function() { return document.getElementById(arguments[0]); }

config = {}
config.language = { 
	perl       : { name : 'Perl',       extensions : 'pl,cgi'         },
	java       : { name : 'Java',       extensions : 'java'           },
	javascript : { name : 'JavaScript', extensions : 'js'             },	
	text       : { name : 'Plain Text', extensions : 'txt'   	      },	
	html       : { name : 'HTML',       extensions : 'html,htm,xhtml' },
	css        : { name : 'CSS',        extensions : 'css'			  },
	generic    : { name : 'Generic',    extensions : '' 			  },
	php        : { name : 'PHP',        extensions : 'php,phtml'      }
}

config.message =  {
	browserNotSupported : 'Your browser is not supported.\nSyntax highlighting is turned off\nand some features are disabled.'
}

config.menu = {
	untitledFile : 'Untitle source code',
	options      : 'Options',
	languages    : 'Languages',
	autoComplete : 'Auto complete',
	fullScreen   : 'Full screen',
	lineNumbers  : 'Line numbers'
}

/*
 * tools
 * 
 */
CodePress = {}; // del? 
 
CodePress.tools = {

	initialize : function() {
//		this.printHTML();
		this.detect();
		cpWindow = $('cp-window');
		cpEditor = $('cp-editor');
		cpTools = $('cp-tools');
		cpLanguages = $('cp-languages-menu');
		cpOptions = $('cp-options-menu');
		cpBody = cpEditor.contentWindow;
		pgBody = document.getElementsByTagName('body')[0];
//		this.edit(CodePress.loadFrom);
		this.edit('FileManager.java');
	},
	
	addEvent : function (element, type, func, capture) {
		if (element.addEventListener) element.addEventListener(type, func, capture);
		else if (element.attachEvent) element.attachEvent('on'+type, func);
	},
	
	detect : function() {
		browser = { ie:false, ff:false, sa:false, hasFind:false, hasFindText:false, supported:true };
		if(navigator.appName.indexOf('Microsoft') != -1) browser.ie = true;
		else if(navigator.userAgent.indexOf('Safari')!=-1) browser.sa = true;
		else if(navigator.appName == 'Netscape') browser.ff = true;
		
		browser.ff = true;
//		alert(document.designMode)
		
//		if(!self.find && !self.document.body.createTextRange &&'
//		else browser.supported = false;
		if(!browser.supported) {
			$('cp-autocomplete').disabled = true;
			if(browser.sa) {
				$('cp-fullscreen').disabled = true;
				$('cp-linenumbers').disabled = true;			
			}
		//alert(config.message.browserNotSupported)
		}
	},
	
	setFileName : function() {
		$('cp-filename').innerHTML = this.fileName = (arguments[0]) ? arguments[0] : config.menu.untitledFile;
	},

	getLanguage : function() {
		var extension = this.fileName.replace(/.*\.([^\.]+)$/,'$1');
		for(lang in config.language) {
			extensions = ','+config.language[lang].extensions+',';
			if(extensions.indexOf(','+extension+',')!=-1) return lang;
		}
		return 'generic';
	},
	
	setLanguage : function() {
		this.language = (typeof(config.language[arguments[0]])!='undefined') ? arguments[0] : this.getLanguage();
		$('cp-language-name').innerHTML = config.language[this.language].name;
		$('language-'+this.language).checked = true;
		this.hideAllMenu();
		if(arguments[0]) {
			if(cpBody.document.designMode=='on') cpBody.document.designMode = 'off';
		   	var head = cpBody.document.getElementsByTagName('head')[0];
		   	var script = cpBody.document.createElement('script');
		   	script.type = 'text/javascript';
		   	script.src = 'languages/codepress-'+this.language+'.js';
			head.appendChild(script)
			cpBody.document.getElementById('cp-lang-style').href = 'languages/codepress-'+this.language+'.css';
		}
	},
	
	hideAllMenu : function() {
		cpOptions.className = cpLanguages.className = 'hide';
	},
	
	toogleMenu : function(item) {
		$('cp-'+item+'-menu').className = ($('cp-'+item+'-menu').className=='show') ? 'hide' : 'show' ;
		$('cp-arrow-'+item).src = ($('cp-'+item+'-menu').className=='show') ? 'images/arrow-down.gif' : 'images/arrow-up.gif' ;
	},
	
	toggleAutoComplete : function() {
		// To do
		alert( ($('cp-autocomplete').checked) ? 'on' : 'off' );
		this.hideAllMenu();
	},

	toggleLineNumbers : function() {
	    cpBody.document.getElementsByTagName('body')[0].className = ($('cp-linenumbers').checked) ? 'show-line-numbers' : 'hide-line-numbers';
//		if(!browser.supported) {
//			cpBody.document.getElementById('editor').className = ($('cp-linenumbers').checked) ? 'show-line-numbers' : 'hide-line-numbers';
//			cpBody.document.getElementById('editor').style.width = '100%';
//		}
		this.hideAllMenu();
	},
	
	toggleFullScreen : function() {
	    if($('cp-fullscreen').checked) {
			cpWindow.className = 'fullscreen-on'; 
			pgBody.style.height = pgBody.style.width = '100px';
			pgBody.style.overflow = 'hidden';

			cH = self.innerHeight ? self.innerHeight : document.documentElement.clientHeight ;
			cW = self.innerWidth ? self.innerWidth : document.documentElement.clientWidth ;
			cpEditor.style.height = cH-22 +'px';
			cpWindow.style.height = cH-2 + 'px';
			cpWindow.style.width = cW-2 + 'px';

//			if(!browser.supported) cpBody.document.getElementById('editor').style.height = cH-37 +'px';
	    }
	    else {
			cpWindow.className = 'fullscreen-off';
			pgBody.style.height = pgBody.style.width = pgBody.style.overflow = 'auto';
			cpWindow.style.width = '100%';
			cpWindow.style.height = cpEditorHeight+'px';
			cpEditor.style.height = cpEditorHeight-20 +'px';
	//		if(!browser.supported) cpBody.document.getElementById('editor').style.height = cpEditorHeight-37 +'px';
	    }
		this.hideAllMenu();
	},

	edit : function() {
		this.setFileName();
		if($(arguments[0])) {
			this.setLanguage(arguments[1]);
			CodePress.tools.setCode($(arguments[0]).value); // id name of the source code
		}
		else if(arguments[0].length>100||arguments[0].match(/[\|&\\\/\{\(\[\<]/)) { // text of the source code
			this.setLanguage(arguments[1]);
			CodePress.tools.setCode(arguments[0]); 
		}
		else if(typeof(arguments[0])=='Object') { // object of the source code
			this.setLanguage(arguments[1]);
			CodePress.tools.setCode(arguments[0].value);
		}
		else { // file name of the source code
			this.setFileName(arguments[0]);
			this.setLanguage();
			cpEditor.src = 'codepress.php?action=edit&file='+this.fileName+'&language='+this.language+'&supported='+browser.supported; 
		}
	},

	printHTML : function() {
		var allLanguages = '';
		for(lang in config.language) allLanguages += '<input type=radio name=lang id="language-'+lang+'" onclick="CodePress.tools.setLanguage(\''+lang+'\')"><label for="language-'+lang+'">'+config.language[lang].name+'</label><br />';

		document.write('<style type="text/css"> @import url(codepress-editor.css); </style>');
		cpEditorHeight = $('codepress1').clientHeight;
		$('codepress1').innerHTML = '<div id="cp-window">'+
			'<iframe id="cp-editor" src="codepress.php" style="height:'+ (cpEditorHeight-20) +'px"></iframe>'+
			'<div id="cp-tools">'+
				'<em id="cp-filename"></em><span id="cp-options" onclick="CodePress.tools.toogleMenu(\'options\')"><img src=images/menu-icon-options.gif align=top /> '+config.menu.options+' <img src=images/menu-arrow-up.gif align=top id="cp-arrow-options" /></span><span id="cp-language" onclick="CodePress.tools.toogleMenu(\'languages\')"><img src=images/menu-icon-languages.gif align=top /> <span id="cp-language-name">'+config.language.generic.name+'</span> <img src=images/menu-arrow-up.gif align=top id="cp-arrow-languages" /></span>'+
			'</div>'+
			'<div id="cp-options-menu" class="hide">'+
    			'<input type=checkbox id="cp-fullscreen" onclick="CodePress.tools.toggleFullScreen()"><label for="cp-fullscreen">'+config.menu.fullScreen+'</label><br><input type=checkbox id="cp-linenumbers" onclick="CodePress.tools.toggleLineNumbers()" checked="checked"><label for="cp-linenumbers">'+config.menu.lineNumbers+'</label><br><input type=checkbox id="cp-autocomplete" onclick="CodePress.tools.toggleAutoComplete()" checked="checked"><label for="cp-autocomplete">'+config.menu.autoComplete+'</label>'+
			'</div>'+
			'<div id="cp-languages-menu" class="hide">'+allLanguages+'</div>'+
		'</div>';
	},

	// transform syntax highlighted code to original code
	getCode : function() {
		var code = cpBody.editor.innerHTML;
		code = code.replace(/<br>/g,'\n');
		code = code.replace(/<\/p>/gi,'\r');
		code = code.replace(/<p>/i,''); // IE first line fix
		code = code.replace(/<p>/gi,'\n');
		code = code.replace(/&nbsp;/gi,'');
		code = code.replace(/\u2009/g,'');
		code = code.replace(/<.*?>/g,'');
		code = code.replace(/&lt;/g,'<');
		code = code.replace(/&gt;/g,'>');
		code = code.replace(/&amp;/gi,'&');
		return code;
	},

	// put some code inside editor
	setCode : function() {
		var code = arguments[0];
		code = code.replace(/\u2009/gi,'');
		code = code.replace(/&/gi,'&amp;');		
       	code = code.replace(/</g,'&lt;');
        code = code.replace(/>/g,'&gt;');
		cpBody.editor.innerHTML = "<pre>"+code+"</pre>";
//		CodePress.tools.setLanguage(language,'new');
//		CodePress.initialize('new');
	}
}

/*
 * Store various CodePress window configurations
 * 
 */

CodePress.config = {
	
	configs : [],
	id : 0,
	
	startNew : function() {
		this.configs[this.id] = {
			language : CodePress.language,
			editorHeight : CodePress.editorHeight,
			editorWidth : CodePress.editorWidth,
			lineNumbers : CodePress.lineNumbers,
			fullScreen : CodePress.fullScreen
		}
		this.id++;
	}
}

CodePress.tools.addEvent(window,'load',function () { CodePress.tools.initialize() },true);
//window.addEventListener('load', function bla(){CodePress.tools.initialize()}, false);

//onload = function() {
//	CodePress.tools.initialize();
//	cpWindow = top.document.getElementById('codepress');


//	cpOnload = top.document.getElementById(top.CodePress.loadFrom);
//
//	top.CodePress.getCode = CodePress.getCode;
//	top.CodePress.setCode = CodePress.setCode;
//	top.CodePress.edit = CodePress.edit;
//
//	top.CodePress.tools.setLanguage(CodePress.language,'init');
//	CodePress.initialize('new');
//	cpOndemand = top.document.getElementById('codepress-ondemand');

//	if(cpOnload!=null) {
//		cpOnload.style.display = 'none';
//		cpOnload.id = 'codepress-loaded';
//		CodePress.setCode(cpOnload,'javascript');
//	}
//	if(cpOndemand!=null) cpOndemand.style.display = 'none';
//}
CodePress.tools.printHTML();