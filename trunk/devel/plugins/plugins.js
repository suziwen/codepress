/*
 * CodePress - Real Time Syntax Highlighting Editor written in JavaScript 
 * 
 * Copyright (C) 2008 Fernando M.A.d.S. <fermads@gmail.com> <codepress.org>
 *
 * This program is free software; you can redistribute it and/or modify it 
 * under the terms of the GNU Lesser General Public License (license.txt).
 */

/**
 * CodePress Plugins
 */
Plugin = {
	
	init : function() {
		// load all plugins here
		for(plugin in iframe.Config.plugins) {
			alert(plugin)
		}
		this.load('complete');
		this.load('shortcuts');
		this.load('snippets');
		
	},
	
	load : function(plugin) {
		document.write('<scr'+'ipt src="../plugins/'+ plugin +'/'+ plugin +'.js"></scr'+'ipt>');
	}

}

Plugin.init();
