var Model = require('./model');
var View = require('./view');
var Controller = require('./controller');
var Scrollbar = require('../lib/scroll');

window.DataPicker = function(element) {	
	this.model = new Model();
	this.view = new View(element, this.model);
	this.controller = new Controller(this.model, this.view);
	this.scrollbar = new Scrollbar('.' + element + ' .datapicker-years');
}