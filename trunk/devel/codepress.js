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
	browserNotSupported : 'Your browser is not supported\nSyntax highlighting is turned off'
}

config.menu = {
	untitledSource : 'Untitle source code',
	options        : 'Options',
	languages      : 'Languages',
	fullScreen     : 'Full screen',
	lineNumbers    : 'Line numbers'
}

/*
 * tools
 * 
 */
CodePress = {}; // del? 
 
CodePress.tools = {

	initialize : function() {
//		this.printHTML();
		language = {};
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
	
	setFileName : function() {
		$('cp-filename').innerHTML = this.fileName = (arguments[0]) ? arguments[0] : 'untitled';
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
	
	languagesMenu : function() {
		this.hideAllMenu();
		cpLanguages.className = 'show';
	},
	
	optionsMenu : function(){
		this.hideAllMenu();
		cpOptions.className = 'show';
	},

	toggleLineNumbers : function() {
	    cpBody.document.getElementsByTagName('body')[0].className = ($('cp-linenumbers').checked) ? 'show-line-numbers' : 'hide-line-numbers';
		this.hideAllMenu();
	},
	
	toggleFullScreen : function() {
	    if($('cp-fullscreen').checked) {
			cpWindow.className = 'fullscreen-on'; 
			pgBody.style.height = pgBody.style.width = '100px';
			pgBody.style.overflow = 'hidden';
			cpEditor.style.height = document.documentElement.clientHeight-22 +'px';
			cpWindow.style.height = document.documentElement.clientHeight-2 + 'px';
			cpWindow.style.width = document.documentElement.clientWidth-2 + 'px';
	    }
	    else {
			cpWindow.className = 'fullscreen-off';
			pgBody.style.height = pgBody.style.width = pgBody.style.overflow = 'auto';
			cpWindow.style.width = '100%';
			cpWindow.style.height = cpEditorHeight+'px';
			cpEditor.style.height = cpEditorHeight-20 +'px';
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
			cpEditor.src = 'codepress.php?action=edit&file='+this.fileName+'&language='+this.language; 
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
				'<em id="cp-filename"></em><span id="cp-options" onclick="CodePress.tools.optionsMenu()"><img src=images/dropdown-options.gif align=top /> Options <img src=images/arrow-up.gif align=top /></span><span id="cp-language" onclick="CodePress.tools.languagesMenu()"><img src=images/dropdown-languages.gif align=top /> <span id="cp-language-name">[undefined]</span> <img src=images/arrow-up.gif align=top /></span>'+
			'</div>'+
			'<div id="cp-options-menu" class="hide">'+
    			'<input type=checkbox id="cp-fullscreen" onclick="CodePress.tools.toggleFullScreen()"><label for="cp-fullscreen">Full screen</label><br><input type=checkbox id="cp-linenumbers" onclick="CodePress.tools.toggleLineNumbers()" checked="checked"><label for="cp-linenumbers">Line numbers</label>'+
			'</div>'+
			'<div id="cp-languages-menu" class="hide">'+allLanguages+'</div>'+
		'</div>';
	},

	// transform syntax highlighted code to original code
	getCode : function() {
		var code = cpBody.editor.innerHTML;
		code = code.replace(/<br>/gi,'\n');
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

onload = function() {
	CodePress.tools.initialize();
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
}
CodePress.tools.printHTML();