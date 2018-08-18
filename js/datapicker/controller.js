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

    view.input.addEventListener('keypress', function(event) {
        var inputObj = this;
        model.validateSymbols(inputObj, event); 
    });   
   

    function applyDataMask(field) {
        var mask = field.dataset.mask.split('');
        
        // For now, this just strips everything that's not a number
        function stripMask(maskedData) {
            function isDigit(char) {
                return /\d/.test(char);
            }
            return maskedData.split('').filter(isDigit);
        }
        
        // Replace `_` characters with characters from `data`
        function applyMask(data) {
            return mask.map(function(char) {
                if (char != '_') return char;
                if (data.length == 0) return char;
                return data.shift();
            }).join('')
        }
        
        function reapplyMask(data) {
            return applyMask(stripMask(data));
        }
        
        function changed() {   
            var oldStart = field.selectionStart;
            var oldEnd = field.selectionEnd;
            
            field.value = reapplyMask(field.value);
            
            field.selectionStart = oldStart;
            field.selectionEnd = oldEnd;
        }
        
        field.addEventListener('click', changed)
        field.addEventListener('keyup', changed)
    }
}