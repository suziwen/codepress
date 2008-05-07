/** 
 * CodePress Core
 * @authors : Fernando Miçalli, Michael Hurni
 * @version : 1.0.0a7
 */
 
var CODEPRESS_ENCODED_CONTENT = 1;
var CODEPRESS_KEYCODES = {
	3:"cancel",6:"help", 8:"backspace",9:"tab",12:"clear",13:"return",
	14:"enter",16:"shift",17:"ctrl",18:"alt",19:"pause",20:"capslock",
	27:"escape",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",
	37:"left",38:"up",39:"right",40:"down",44:"printscreen",45:"insert",
	46:"delete",93:"contextmenu",112:"f1",113:"f2",114:"f3",115:"f4",
	116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",
	123:"f12",124:"f13",125:"f14",126:"f15",127:"f16",128:"f17",129:"f18",
	130:"f19",131:"f20",132:"f21",133:"f22",134:"f23",135:"f24",144:"numlock",
	145:"scrolllock"
}

Object.prototype.extend = function() {
	for (var property in arguments[0])
		if(!this[property]) 
			this[property] = arguments[0][property];
	return this;
}

/**
 * Detect the extension of a file url
 * @param compare (optional)
 * @return the extension as string or a boolean if an extension to compare is given in argument
 */
String.prototype.extension = function(compare)
{
	var part = this.split("?")[0].split(".");
	var extension = part[part.length-1];
	return compare?compare==extension:extension;
}

/**
 * Some useful Array prototypes
 */
Array.prototype.each = Object.prototype.each = function(fn, bind){
	for (var i = 0, j = this.length; i < j; i++) fn.call(bind, this[i], i, this);
}

Array.prototype.copy = function(start, length){
	start = start || 0;
	if (start < 0) start = this.length + start;
	length = length || (this.length - start);
	var newArray = [];
	for (var i = 0; i < length; i++) newArray[i] = this[start++];
	return newArray;
}

Array.prototype.remove = function(item){
	for(var i=this.length; i--;) (this[i] === item) && this.splice(i, 1);
	return this;
}

Array.prototype.contains = function(item, from){
	return this.indexOf(item, from) != -1;
}

var browser = {};
var ua = navigator.userAgent;	
if(ua.match('MSIE')) {browser.msie = true; browser.code = "msie"}
else if(ua.match('KHTML')) {browser.khtml = true; browser.code = "khtml"}
else if(ua.match('Opera')) {browser.opera = true; browser.code = "opera"}
else if(ua.match('Gecko')) {browser.gecko = true; browser.code = "gecko"}

/**
 * CodePress Core constructor
 */

CodePress = function(config)
{
	var element = config.element || false; // <textarea> for editor OR <code> for readonly
	if(element.type != "textarea" && element.type != "code") return element;
	
	element.config = null;
	element.config = config || {};
	element.config.extend(CodePress.Config);
	
	element.util 	= new CodePress.Util(element);
	element.window 	= new CodePress.Window(element);
	element.editor 	= new CodePress.Editor(element);
	element.plugin 	= new CodePress.Plugin(element);	
	
	return element;
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
			'onFileMissing' : function() { 
				parent.config.plugins.remove(name);
				parent.console.error("CodePress error",this.file + " was not found");
			},
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
	parent.config.plugins.copy().each(function(pluginname) {
		this.load.call(this,pluginname);
	},this);
	
	this.fireLoad();
}

CodePress.Window = function(element) {
	var self = document.createElement('div');

	element.disabled = true;
	element.style.overflow = 'hidden';
	element.util.css(self,{
		'border' : '1px solid gray',
		'width'	 : element.clientWidth + 'px',
		'height' : element.clientHeight + 'px'
	});
	element.style.display = 'none';
	element.parentNode.insertBefore(self, element);	
	return self;
}

// Editor class
// It's the iframe element inside Window

CodePress.Editor = function(parent) {
	var self = document.createElement('iframe');

	parent.util.css(self,{
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
			parent.kill();
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
				parent.config.syntax_languages.directory + language + ".js",
				parent.config.syntax_languages.directory + language + ".css"
			],
			"target" : parent.editor.contentDocument,
			"onLoaded" : function() {
				parent.language.value = language;
				parent.event.fire("languageChange");
				parent.editor.contentDocument.getElementsByTagName("body")[0].className = language;
				parent.editor.engine.language=language;
				parent.editor.engine.initialize();
				
			},
			"onFileMissing" : function() { 
				parent.console.error("CodePress error",this.file + " was not found");
				if(language==parent.language['default']) parent.kill();
				else parent.language.set(parent.language['default']);
				
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
	
	this['default'] = this.value;

	this.set(this.value);
	parent.setLanguage = this.set;
	
}

CodePress.Engine = function(parent){
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

CodePress.Util = function(parent)
{
	parent.kill = function() {
		var element = parent;
		parent.config.plugins = new Array();
		element.disabled = false;
		element.window.removeChild(element.editor);
		element.parentNode.removeChild(element.window);	
		element.util.css(element,{
			display  : "block",
			overflow : (browser.ie)?"scroll":"auto"
		});
	}

	this.css = function(element,options) {
		for(var property in options)
			element.style[property] = options[property];
	}

	this.Ajax = function()
	{
		try{ return new ActiveXObject("Microsoft.XMLHTTP"); } catch (error) {
			try{ return new ActiveXObject("Msxml2.XMLHTTP"); } catch (error) {
				if(window.XMLHttpRequest) return new XMLHttpRequest(); 
				else return false;
			}
		}
	}
	this.Loader = function(params)
	{
		var loader = this;
		loader.target = params.target || document;
		loader.file = params.file || false;
		loader.queue = params.queue || new Array();
		loader.reload = params.reload || false;
		
		loader.onFileMissing = params.onFileMissing || function() {};
		loader.onLoaded = params.onLoaded || function() {};
		loader.target.head = loader.target.getElementsByTagName('head')[0];

		if(!loader.file)
		{
			if(params.queue.length == 0) return false;
			loader.file = params.queue[0];
			params.queue.splice(0,1);
			loader.onLoaded = function()
			{
				loader.file = params.queue[0];
				params.queue.splice(0,1);
				if(loader.file) loader.ajaxQuery();
				else if(params.onLoaded) {
					params.onLoaded();
				}
			}
		}
		
		loader.include = function() {
			if(loader.file.extension("js")) {
				var script = loader.target.createElement("script");
				script.type = "text/javascript";
				script.onreadystatechange = function() {
					if (this.readyState == 'complete') loader.onLoaded();
				}
				script.src = loader.file;
				script.onload = loader.onLoaded;
				loader.target.head.appendChild(script);	
				return true;
			}
			if(loader.file.extension("css")) {
				var style = loader.target.createElement("link");
				style.rel = "stylesheet";
				style.type = "text/css";
				style.media = "screen";
				style.href = loader.file;
				style.src = loader.file;
				loader.target.head.appendChild(style);
				loader.onLoaded();
				return true;
			}
		}

		loader.ajaxQuery = function()
		{
			if(!this.reload && this.isInclude(this.file)) {
				// file allready include,
				// reload is set to false.
				return this.onLoaded();
			}
			var ajax = new parent.util.Ajax();
			try{ ajax.open("HEAD", this.file, true); }
			catch (e) { 
				parent.console.warning("Cannot verify existence of", this.file);
				return loader.include();
			}
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
		
		loader.isInclude = function(file)
		{
			var ret = false;
			if(file.extension("js")) { 
				var collection = loader.target.getElementsByTagName("script");
				for (var i=0,l=collection.length;i<l;i++) 
					if(collection[i].src.match(new RegExp(file))) ret = true;
			}
			else if(file.extension("css")) {
				var collection = loader.target.getElementsByTagName("link");
				for (var i=0,l=collection.length;i<l;i++)
					if(collection[i].href.match(new RegExp(file))) ret = true;
			}
			return ret;
		}
		
		if(this.file) loader.ajaxQuery();
		return this;
	}

	parent.event = {};
	parent.event.list = new Object();
	parent.event.add = function(name,fn,context)
	{
		fn._context = context;
		if (typeof parent.event.list[name] == "undefined") {
			parent.event.list[name] = new Array();
		}
		parent.event.list[name].push(fn);
	}
	parent.event.fire = function(name,evt)
	{
		var event = evt || {};
		if(parent.event.list[name]) {
			parent.event.list[name].each(
				function(fn){fn.call(fn._context,new CodePress.Event(event));}
			);
		}
	}
	
	/**
	 * Native CodePress.Console
	 * Usage
	 *		[element].console.log(title[,content])
	 *		[element].console.info(title[,content])
	 *		[element].console.warning(title[,content])
	 *		[element].console.error(title[,content])
	 * 
	 * Only error messages are alerted if config.debug != true
	 */	
	parent.console = {}
	parent.console.error = function(title,msg)
	{
		alert(title+(msg?"\n"+msg:""));
	};
	
	/**
	 * Alert if config.debug is true
	 * @param title 
	 * @param msg (optional) 
	 */
	parent.console.log = parent.console.info = parent.console.warning = function(title,msg)
	{
		if(parent.config.debug===true) {
			alert(title+(msg?"\n"+msg:""));
		}
	}
}

/**
 * Event decorator
 */
CodePress.Event = function(event){
	event.stop = function(){
		if(browser.gecko) event.preventDefault();
		if(browser.msie) event.returnValue = false; 
	}
	event.toChar = function(compare){
		var charCode = (browser.msie) ? event.keyCode : event.charCode;
		var toChar = String.fromCharCode(charCode).toLowerCase();
		return (compare) ? compare == toChar : toChar;
	}
	event.shortcut = function(compare){
		var compose = new Array();
		if(event.ctrlKey)  compose.push("ctrl");
		if(event.metaKey)  compose.push("apple");
		if(event.altKey)   compose.push("alt");
		if(event.shiftKey) compose.push("shift");
		if (CODEPRESS_KEYCODES[event.keyCode]) compose.push(CODEPRESS_KEYCODES[event.keyCode]);
		else if(event.toChar()) compose.push(event.toChar());
		
		var shortcut = compose.join("+");
		return (compare) ? compare == shortcut : shortcut;
	}
	return event;
}