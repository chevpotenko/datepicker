var modelPrototype = require('./model.prototype');

Model.prototype = modelPrototype;

function Model() {
    
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

module.exports = Model;