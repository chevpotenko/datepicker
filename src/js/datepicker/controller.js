var controllerPrototype = require('./controller.prototype');

Controller.prototype = controllerPrototype;

function Controller(model, view, scrollBarCollback) {
    var self = this;   
    self.init(model, view);

    view.btnPrevMonth.addEventListener('click', function() {
        model.decrementMonth();
        self.init(model, view);
    });

    view.btnNextMonth.addEventListener('click', function() {
        model.incrementMonth();
        self.init(model, view);
    });

    view.datapicker.addEventListener('click', function(event) {
        event.stopPropagation();
        var el = self.selectElement(event, 'TD');
        if (el){
            self.changeDay(model, view, el);
        }
    });

    view.years.addEventListener('click', function(event) {
        event.stopPropagation();
        var el = self.selectElement(event, 'LI');
        if (el){
            self.changeYear(model, view, el);
        }
    });

    view.year.addEventListener('click', function(event) {
        event.stopPropagation();
        view.toggelClass(view.years, 'active');
        scrollBarCollback(); 
    });

    view.input.addEventListener('change', function(event) {
        self.changeDate(event.target.value, model, view);        
    });

    view.input.addEventListener('click', function(event) {
        event.stopPropagation();
        view.toggelClass(view.datapicker, 'active');        
    });

    view.input.addEventListener('keyup', function(event) {
        var inputObj = this;
        model.validateSymbols(inputObj, event); 
    });
    
    document.getElementsByTagName('body')[0].addEventListener('click', function() {        
        if(view.datapicker.classList.contains('active')){
            view.toggelClass(view.datapicker, 'active');
        }
    });
}

module.exports = Controller;