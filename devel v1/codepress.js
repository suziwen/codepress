/** 
 * CodePress Core
 * @authors : Fernando Miçalli, Michael Hurni
 * @version : 1.0.0a5
 */
 
CODEPRESS_ENCODED_CONTENT = 1;

Object.prototype.extend = function() {
	for (var property in this)
		if(!arguments[0][property]) 
			arguments[0][property] = this[property];
	return arguments[0];
}

Array.prototype.each = Object.prototype.each = function(fn, bind){
	var array = new Array();
	for (var i = 0, j = this.length; i < j; i++) array[i] = this[i];
	for (var i = 0, j = this.length; i < j; i++) fn.call(bind, array[i], i, this);
}

var browser = {};
var ua = navigator.userAgent;	
if(ua.match('MSIE')) browser.code = 'msie';
else if(ua.match('KHTML')) browser.code = 'khtml'; 
else if(ua.match('Opera')) browser.code = 'opera'; 
else if(ua.match('Gecko')) browser.code = 'gecko';

/**
 * CodePress Core constructor
 */

 CodePress = function(config) {
	var element = config.element || false; // <textarea> for editor OR <code> for readonly
	if(element.type != "textarea" && element.type != "code") return false;
	
	element.config = null;
	element.config = config || {};
	element.config = CodePress.Config.extend(element.config);
	
	element.console = new CodePress.Console(element);
	element.util 	= new CodePress.Util(element);
	element.window 	= new CodePress.Window(element);
	element.editor 	= new CodePress.Editor(element);
	element.event 	= new CodePress.Event(element);
	element.plugin 	= new CodePress.Plugin(element);	
	
	element.plugin.fireLoad(); // when all is loaded, fire the plugins
	return element;
}

/**
 * Native Codepress.Console
 * Usage
 *		[element].console.log(title[,content])
 *		[element].console.info(title[,content])
 *		[element].console.warning(title[,content])
 *		[element].console.error(title[,content])
 * 
 * Only error are alerted if config.debug != true
 */
 
CodePress.Console = function(parent)
{
	this.log = this.info = this.warning = function(title,msg)
	{
		if(parent.config.debug===true) {
			alert(title+(msg?"\n"+msg:""));
		}
	}
	this.error = function(title,msg) {
		alert(title+(msg?"\n"+msg:""));
	}
}

CodePress.Plugins = {}

/**
 * Default CodePress config
 * @var CodePress.Config
 */
CodePress.Config = {
	"plugins_dir" : "plugins/",
	"engines_dir" : "engines/",
	"syntax_languages" : {
		"directory" : "languages/",
		"default" : "php",
		"list" : Array(
			"php",
			"javascript",
			"html",
			"generic"
		)
	},
	"gui_lang" : "en",
	"debug" : false
}

/**
 * Plugin Manager
 */
CodePress.Plugin = function(parent) {
	parent.plugins = new Object;
	parent.config.plugins = parent.config.plugins || new Array;
	
	// plugins loader
	this.load = function (name) {
		if(this.isInclude(name)) 
			return this.register(name);
		var bind = this;
		new parent.util.Loader({
			'file' : parent.config.plugins_dir + name + ".js",
			'onFileMissing' : function() { bind.remove(name); parent.console.error("CodePress error",this.file + " was not found"); },
			'onLoaded' : function() { bind.register(name); }
		}); 
	}
	
	/**
	 * This Method is externe to Codepress.Plugin.Load to allow 
	 * registering of native plugin include (using script tag)
	 */
	this.register = function(name) {
		if(!this.isInclude(name)) return false;
		if(!parent.plugins[name]) 
			parent.plugins[name] = new CodePress.Plugins[name](parent);
		return true;
	}
	
	/**
	 * Test if a plugin is already include
	 * @param name string Name of the plugin
	 * @return boolean Return true if the plugin is allready included
	 */
	this.isInclude = function(name) {
		return (typeof CodePress.Plugins[name]=="function");
	}

	/**
	 * Remove a plugin to the config.plugins list
	 * @param name string Name of the plugin to remove
	 */
	this.remove = function(name) {
		var index = parent.config.plugins.length+1;
		while (index--)
			if (parent.config.plugins[index] == name)
				parent.config.plugins.splice(index,1);
	}

	this.fireLoad = function() {
		var loaded = true;
		parent.config.plugins.each(function(pluginname) {
			if(!parent.plugins[pluginname]) loaded = false;
		},this);
		if(loaded) return this.onpluginsLoad();
		else top.setTimeout(function(){ parent.plugin.fireLoad();},100);
	}
	
	this.onpluginsLoad = function() {
		parent.config.plugins.each(function(pluginname) {
			if(typeof parent.plugins[pluginname].onpluginsLoad == "function")
				parent.plugins[pluginname].onpluginsLoad();
		});
	}

	// this code will load and register all plugins	
	parent.config.plugins.each(function(pluginname) {
		this.load.call(this,pluginname);
	},this);
}

CodePress.Window = function(element) {
	var self = document.createElement('div');

	element.disabled = true;
	element.util.setCSS(element, {
		'overflow'	: 'hidden'
	});
	element.util.setCSS(self, {
		'border'	: '1px solid gray',
		'width'	 	: element.clientWidth + 'px',
		'height'	: element.clientHeight + 'px'
	});
	element.util.setCSS(element, {
		'display'	: 'none'
	});
	element.parentNode.insertBefore(self, element);	
	return self;
}

// Editor class
// It's the iframe element inside Window

CodePress.Editor = function(parent) {
	var self = document.createElement('iframe');

	parent.util.setCSS(self,{
		'width'	 : '100%',
		'height' : '100%',
		'border' : 0
	});
	
	self.frameBorder = 0; // remove IE internal iframe border
	parent.window.appendChild(self);
	
	if(!self.contentDocument) {
		self.contentDocument = self.contentWindow.document;
	}
	self.contentDocument.open();
	self.contentDocument.close();
	self.language = "";
	
	new parent.util.Loader({
		"queue" : [
			parent.config.engines_dir + browser.code + ".js",
			parent.config.engines_dir + "common.css"
		],
		"target" : self.contentDocument,
		"onFileMissing" : function() { 
			parent.console.error("CodePress error",this.file + " was not found");
				// hide cp frame
				// display parent
				// fire all plugin onUnLoad
		},
		"onLoaded" : function() {
			new CodePress.Engine(parent);
			new CodePress.Language(parent);
		}
	});
	
	return self;
}

CodePress.Language = function(parent) {
	parent.language = this;
	var element = parent;
	
	/**
	 * Set the editor language
	 * @param string lanuguage
	 */
	this.set = function(language)
	{
		if(browser.code == "gecko") parent.editor.contentDocument.designMode = "off";
		new parent.util.Loader({
			"queue" : [
				parent.config.syntax_languages.directory + language + ".css",
				parent.config.syntax_languages.directory + language + ".js"
			],
			"target" : parent.editor.contentDocument,
			"onLoaded" : function() {
				parent.language.value = language;
				parent.event.fire("languageChange");
				parent.editor.engine.initialize();
			},
			"onFileMissing" : function() { 
				parent.console.error("CodePress error",this.file + " was not found");
					// hide cp frame
					// display parent
					// fire all plugin onUnLoad
			}
		});
	}
	
	/**
	 * Return the Editor language
	 * @return string value
	 */
	this.get = function() { return this.value; }
	
	this.value = parent.config.syntax_languages['default'];
	
	//search language into element class
	parent.config.syntax_languages.list.each(function(language) {
		if(element.className.match(language)) this.value = language;
	},this);

	this.set(this.value);
	parent.setLanguage = this.set;
	
}

CodePress.Engine = function(parent) {
	parent.engine = this;
	var element = parent;
	parent.editor.engine = new parent.editor.contentWindow.CodePress.Engine(parent);
		
	this.getCode = function() {
		return parent.editor.engine.getCode();
	}
	this.setCode = function(code) {
		return parent.editor.engine.setCode(code);
	}
	
	this.setCode(element.innerHTML,CODEPRESS_ENCODED_CONTENT);
}

CodePress.Util = function(parent) {
	this.setCSS = function(elmt,option) {
		for(var property in option)
			elmt.style[property] = option[property];
	}
	this.Ajax = function()
	{
		if(window.XMLHttpRequest) {
			return new XMLHttpRequest(); 
		}
		else if(window.ActiveXObject) {
			return new ActiveXObject("Microsoft.XMLHTTP"); 
		}
	}
	this.Loader = function(params)
	{
		var loader = this;
		loader.target = params.target || document;
		loader.file = params.file || false;
		loader.queue = params.queue || new Array();
		
		loader.onFileMissing = params.onFileMissing || function() {};
		loader.onLoaded = params.onLoaded || function() {};
		loader.head = loader.target.getElementsByTagName('head')[0];

		if(!loader.file)
		{
			if(params.queue.length == 0) return false;
			loader.file = params.queue[0];
			params.queue.splice(0,1);
			loader.onLoaded = function()
			{
				loader.file = params.queue[0];
				params.queue.splice(0,1);
				if(loader.file) {
					loader.ajaxQuery();
				}
				else if(params.onLoaded) {
					params.onLoaded();
				}
			}
		}
		
		loader.include = function() {
			if(loader.file.substr(loader.file.length-3,3)==".js") {
				var script = loader.target.createElement("script");
				script.type = "text/javascript";
				script.onreadystatechange = function() {
					if (this.readyState == 'complete') 
						loader.onLoaded();
				}
				script.src = loader.file;
				script.onload = loader.onLoaded;
				loader.head.appendChild(script);	
				return true;
			}
			if(loader.file.substr(loader.file.length-4,4)==".css") {
				var style = loader.target.createElement("link");
				style.rel = "stylesheet";
				style.type = "text/css";
				style.media = "screen";
				style.href = loader.file;
				style.src = loader.file;
				loader.head.appendChild(style);
				loader.onLoaded();
				return true;
			}
		}

		loader.ajaxQuery = function() {
			var ajax = new parent.util.Ajax();
			ajax.open("HEAD", this.file, true); 
			
			try {ajax.send(null);}
			catch (error) { ajax.abort(); loader.onFileMissing(); return this; }
			
			if(document.location.toString().substring(0,4) == "http") {
				ajax.onreadystatechange = function() {
					if(ajax.readyState == 4) {
						var code = ajax.status.toString(); ajax.abort();
						if(code.substring(0,1)>3) loader.onFileMissing();
						else loader.include();
					}
				}
			}
			else loader.include();
		}
		
		if(this.file) loader.ajaxQuery();
		return this;
	}

}

CodePress.Event = function(parent) {
	this.name = "Event Manager";
	this.events = new Object();
	
	this.add = function(name,fn,context) {
		fn._context = context;
		if (typeof this.events[name] == "undefined") this.events[name] = new Array();
		this.events[name].push(fn);
	}
	
	this.fire = function(name,evt) {
		var event = evt || {};
		event.stop = function() {
			if(browser.code=="gecko") event.preventDefault();
			if(browser.code=="msie") event.returnValue = false; 
		}
		
		if(this.events[name]) {
			this.events[name].each(
				function(fn){fn.call(fn._context,event);}
			);
		}
	}

}