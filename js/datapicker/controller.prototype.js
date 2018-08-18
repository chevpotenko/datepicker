export default {
	init: function(model, view) {
		model.calendar.days = model.fillDays();
		view.init(model);
		view.setInput(model);
	},	
	changeYear: function(model, view, el) {
		model.year = el.innerHTML;
		model.calendar.days = model.fillDays(model.year, model.month);
		view.changeEl('yearActive', el);
		view.init(model, view);
		view.setInput(model);
		view.toggelClass(view.years, 'active');
	},
	changeDay: function(model, view, el) {
		model.day = el.innerHTML;
		view.changeEl('day', el);
		view.setInput(model);
	},
	changeDate: function(dateStr, model, view) {		
		if(!model.validateDate(dateStr)) return;
		var newDay = null,
			yearsList = null;   
		model.changeCurrentDate(dateStr);
		model.calendar.days = model.fillDays();
		model.years = model.initYears(7, model.year);    
		view.init(model);
		view.setInput(model);
        newDay = view.initDay(model.day);
		view.changeEl('day', newDay);        
        view.yearsList.innerHTML = view.createListYears(model.year, model.years).innerHTML;
	},
	selectElement: function(event, tag) {
	    var target = event.target;
		return target.tagName != tag ? false : target;
	}
}