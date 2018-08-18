import Model from './model.js';
import View from './view.js';
import Controller from './controller.js';

function DataPicker(element) {	
	this.model = new Model();
	this.view = new View(element, this.model);
	this.controller = new Controller(this.model, this.view);
	console.log(this);		
}	

export { DataPicker };