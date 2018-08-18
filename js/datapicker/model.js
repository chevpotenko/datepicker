import modelPrototype from './model.prototype.js';

Model.prototype = modelPrototype;

export default function Model() {
    
    var date = new Date();  
    this.day = date.getDate();
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.years = this.initYears(7, date.getFullYear());
    this.calendar = {
        weekdays: this.weekdayNames,
        days: []
    }  
}