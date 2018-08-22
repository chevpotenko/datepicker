var Model = require('./model');
var View = require('./view');
var Controller = require('./controller');
var Scrollbar = require('../lib/scrollbar');

var DatePicker = function(element) {
	
	var scrollbar = function() {
		if ( typeof scrollbar === 'object' ) return;
		scrollbar = new Scrollbar('.' + element + ' .datapicker-years');
	};

	this.model = new Model();
	this.view = new View(element, this.model);	
	this.controller = new Controller(this.model, this.view, scrollbar);		
};

module.exports = DatePicker;