export default {
	weekdayNames: [
		'Пн',
		'Вт',
		'Ср',
		'Чт',
		'Пт',
		'Сб',
		'Вс'
	],
	months: [
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь'
	],
	dateToStr: function (){
		return new Date(this.year, this.month, this.day)
			.toLocaleDateString();
	},
	fillDays: function() {
	    var days = [],
            amountDays = new Date(this.year, this.month + 1, 0).getDate(),
            weekday = new Date(this.year, this.month, 1).getDay() - 1;

		weekday = weekday == -1 ? 6 : weekday;
		for (var i = 0; i <= weekday; ++i){
			days.push('');
		}
		for (var i = 1; i <= amountDays; ++i){
			days.push(i);
		}
		return days;
	},
	incrementMonth: function() {
		if (this.month <= 10){
			++this.month;
		}else{
			++this.year;
			this.month = 0;
		}
	},
	decrementMonth: function() {
		if (this.month >= 1){
			--this.month;
		}else{
			--this.year;
			this.month = 11;
		}
	},
	changeCurrentDate(date) {
		var date = date.split('.');			                
        this.day = parseInt(date[0]);
        this.month = parseInt(date[1]) - 1;
        this.year = parseInt(date[2]);
	},
	initYears: function(amount, year) {
		var ratioForYears = [],
			middleIndexOfArray = amount % 2 ? Math.ceil(amount / 2) : amount / 2;
		for (var i = 0; i < amount; ++i){
			ratioForYears.push((--middleIndexOfArray));
		}
		ratioForYears.reverse();
		return ratioForYears.map(function(value){
			return year + value
		});
    },
	validateSymbols: function(inputObj, event){
		var patterns = [
				/[1-3]/,
				/[0-9]/,
				/./,
				/[0-1]/,
				/[0-9]/,
				/./,
				/[1-2]/,
				/[09]/,
				/[0-9]/,
				/[0-9]/
			],
			dateStr = null,			
			dateArr = ['_', '_', '.','_', '_', '.','_', '_', '_','_'],
			selectionStart = inputObj.selectionStart,
			selectionEnd = inputObj.selectionEnd;		
			console.log( inputObj.selectionStart)

		if ( inputObj.selectionStart > 9 || !patterns[inputObj.selectionStart].test(event.key) ){
			selectionStart = selectionStart - 1;		
		}

		if(patterns[inputObj.selectionStart].test(event.key)) {
			dateArr[inputObj.selectionStart] = event.key
		}
		
		// dateStr = patterns.map(function(rgx, index) {
		// 	console.log(index)            
		// 	if (index != 2 && index != 5) {
		// 		if(rgx.test(parseInt(dateArr[index]))) {					
		// 			return dateArr[index];
		// 		} else {
		// 			return '_';
		// 		}
		// 	} else {
		// 		return '.';
		// 	}            
		// }).join('');

		dateStr = dateArr.join('');

		inputObj.value = dateStr;		
		inputObj.selectionStart = selectionStart;
		inputObj.selectionEnd = selectionEnd;
		console.log(dateStr)
	},
	validateDate: function(dateStr) {
		var pattern = /(0[1-9]|[12]\d|3[01]).(0[1-9]|1[0-2]).([12]\d{3})/;
		return pattern.test(dateStr);
	}
}
