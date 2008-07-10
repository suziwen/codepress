/**
 * CodePress Actions (undo/redo)
 */
Engine.Actions = {
	
	pos : -1, // current history position
	history : [], // history vector
	
	undo : function() {
		if(Engine.body.innerHTML.indexOf(cc) == -1) {
			window.getSelection().getRangeAt(0).insertNode(document.createTextNode(cc));
		 	this.history[this.pos] = Engine.body.innerHTML;
		}
		
		this.pos--;
		
		if(typeof(this.history[this.pos]) == 'undefined') 
			this.pos++;
		Engine.body.innerHTML = this.history[this.pos];
		Engine.Highlight.findString();
	},
	
	redo : function() {
		this.pos++;
		if(typeof(this.history[this.pos]) == 'undefined') 
			this.pos--;
		Engine.body.innerHTML = this.history[this.pos];
		Engine.Highlight.findString();
	},
	
	next : function() { // get next vector position and clean old ones
		if(this.pos > 20) 
			this.history[this.pos - 21] = undefined;
		return ++this.pos;
	}
}