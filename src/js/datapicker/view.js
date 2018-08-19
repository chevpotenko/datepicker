var createEl = require('./utils');
var viewPrototype = require('./view.prototype');

View.prototype = viewPrototype;

function View(element, model) {

	var yearsList = this.createListYears(model.year, model.years);

	this.root = document.getElementsByClassName(element)[0];
	
	this.root.appendChild(createDatapicker(model.year, model.years, this.templateHeader));

	this.datapicker = this.root.getElementsByClassName('datapicker')[0];
	this.calendar = this.root.getElementsByClassName('datapicker-calendar')[0];
	this.days = this.root.getElementsByTagName('td');
	this.input = this.root.getElementsByTagName('input')[0];
	this.month = this.root.getElementsByClassName('datapicker-month')[0];
	this.year = this.root.getElementsByClassName('datapicker-year')[0];
	this.years = this.root.getElementsByClassName('datapicker-years')[0];
	this.yearsList = this.root.getElementsByClassName('datapicker-years-list')[0];
	this.yearActive = this.root.getElementsByClassName('active')[0];
	this.btnPrevMonth = this.root.getElementsByClassName('datapicker-prev')[0];
	this.btnNextMonth = this.root.getElementsByClassName('datapicker-next')[0];

	function createDatapicker(year, years, template) {
		var datapicker = createEl('div', 'datapicker'),
			calendar = createEl('div', 'datapicker-calendar'),
			datapickerYears = createEl('div', 'datapicker-years');
				
		datapickerYears.appendChild(createEl('div', 'top'));
		datapickerYears.appendChild(createEl('div', 'bottom'));	
		datapickerYears.appendChild(yearsList);
		datapicker.innerHTML = template;
		datapicker.appendChild(datapickerYears);
		datapicker.appendChild(calendar);
		return datapicker;
	}
}

module.exports = View;