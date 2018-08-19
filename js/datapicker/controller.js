import controllerPrototype from './controller.prototype.js';

Controller.prototype = controllerPrototype;

export default  function Controller(model, view) {
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
        var el = self.selectElement(event, 'TD');
        if (el){
            self.changeDay(model, view, el);
        }
    });

    view.years.addEventListener('click', function(event) {
        var el = self.selectElement(event, 'LI');
        if (el){
            self.changeYear(model, view, el);
        }
    });

    view.year.addEventListener('click', function() {
        view.toggelClass(view.years, 'active');
    });

    view.input.addEventListener('change', function(event) {
        self.changeDate(event.target.value, model, view);
    });

    view.input.addEventListener('keyup', function(event) {                
        model.validateSymbols(this);
    }); 
}