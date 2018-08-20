var createEl = require('./utils');
var tmpl = require('../lib/templater');

var viewPrototype = {
	templateCalendar: '<table>'+
			'<thead>'+
				'<tr>'+
					'<% for(var k = 0; k < weekdays.length; k++) { %>'+
						'<th><%=weekdays[k]%></th>'+
					'<% } %>'+
				'</tr>'+
			'</thead>'+
			'<tbody>'+
				'<% var day = 0; for(var i = 0; i < Math.ceil(days.length / 7); i++) { %>'+
					'<tr>'+
						'<% for(var j = 0; j < 7; j++) {++day; %>'+
							'<td><%=days[day]%></td>'+
						'<% } %>'+
					'</tr>'+
				'<% } %>'+
			'</tbody>'+
		'</table>',
	templateHeader: '<div class="datapicker-header">'+	
			'<span class="datapicker-prev">&#060;</span>'+
			'<span class="datapicker-month"></span>'+
			'<span class="datapicker-year"></span>'+
			'<span class="datapicker-next">&#062;</span>'+
		'</div>',
	renderCalendar: function (data){
		return tmpl(this.templateCalendar, data);
	},
	initDay: function(day){
	    for(var i = 0, max = this.days.length; i < max; ++i){
			if(this.days[i].innerHTML == day){	
				this.days[i].classList.add('active');
				return this.days[i];
			}
		}
	},	
	init: function(model){
		this.calendar.innerHTML = this.renderCalendar(model.calendar);
		this.year.innerHTML = model.year;
		this.month.innerHTML = model.months[model.month];
		this.day = this.initDay(model.day);
	},
	setInput: function(model) {
		this.input.setAttribute("value", model.dateToStr(model.year, model.month, model.day));
		this.input.value = model.dateToStr(model.year, model.month, model.day);
	},
	changeEl: function(name, newEl){
		this[name].classList.remove('active');
		this[name] = newEl;
		this[name].classList.add('active');
	},
	toggelClass: function(element, name) {
		element.classList.toggle(name);
	},
	createListYears: function(year, years) {
		var list = createEl('ul', 'datapicker-years-list'),
			className;
	
		years.forEach(function(el, index){
			className = el == year ? 'active' : false;
			list.appendChild(createEl('li', className, el));
		});
		return list;
    }
}

module.exports = viewPrototype;