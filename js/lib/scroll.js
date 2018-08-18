Scrollbar.prototype.view = {
	getHeight : function(element) {
		return element.offsetHeight;
	}
}

function Scrollbar(element) {

	View.prototype = this.view;

	var model = new Model();
	var view = new View(model, element);
	var controller = new Controller(model, view);

	function Model() {
		this.paddingY = 0;
		this.allowedToMove = false;
		this.positionY = - this.paddingY;
		this.mouseY = 0;
		this.track = 0;
		this.limitTop = 0;
		this.limitBottom = 0;
		this.coeffContentPos = 1;
	};

	function View(model, element) {
		this.root = document.getElementsByClassName(element)[0];
		this.scrollbar = createScrollbar();
		this.root.appendChild(this.scrollbar);
		this.top = document.getElementsByClassName('top')[0];
		this.bottom = document.getElementsByClassName('bottom')[0];
		this.years = document.getElementsByClassName('datapicker-years-list')[0];

		function createScrollbar() {
			return createEl('div', 'scroll-bar');
		}

		function createEl(tag, className) {
		    var el = document.createElement(tag);

			if (className){
				el.classList.add(className);
			}
			return el;
		}
	};

	function Controller(model, view) {
		calcParams();

		view.scrollbar.addEventListener('mousedown', detectMouseDownOnScrollbar);
		document.addEventListener('mouseup', detectMouseUp);
		view.years.addEventListener('wheel', moveWheel);
		document.addEventListener('mousemove', move);

		function detectMouseDownOnScrollbar(event) {
			model.allowedToMove = true;
			model.mouseY = event.pageY + model.positionY;
		}

		function detectMouseUp() {
			model.allowedToMove = false;
		}

		function moveWheel(event) {
			model.allowedToMove = true;
			move(event);
			model.allowedToMove = false;
		}

		function move(event) {
			if (model.allowedToMove &&
				model.positionY <= model.limitTop &&
				model.positionY >= (model.limitBottom + view.getHeight(view.scrollbar))){

				calcScrollbarPos(event);
				checkScrollbarPos();
				setPositionOfElements();
			}

			function calcScrollbarPos(event) {
				if (event.deltaY){
					model.positionY = model.positionY - (event.deltaY / 50);
				}else{
					model.positionY = model.mouseY - event.pageY;
				}
			}

			function checkScrollbarPos() {
			    var limitBottom = model.limitBottom + view.getHeight(view.scrollbar);

				if(model.positionY >= model.limitTop){
					model.positionY = - model.paddingY;
				}
				if(model.positionY <= limitBottom){
					model.positionY = limitBottom;
				}
			}

			function setPositionOfElements() {
				view.scrollbar.style.top = - model.positionY + 'px';
				view.years.style.top = calcContentPos() + 'px';
			}

			function calcContentPos() {
				return ((model.positionY + model.paddingY)* model.coeff) + model.paddingY;
			}
		}

		function calcParams() {
			calcSrollParam();
			showLimits();
			calcCoeffContentPos();

			function calcSrollParam() {
				model.track = view.getHeight(view.root) - (model.paddingY*2);
				model.limitTop = - model.paddingY;
				model.limitBottom = - model.track;
			}

			function calcCoeffContentPos() {
				var frameHeight = model.track - (view.getHeight(view.scrollbar)) - model.paddingY;
				model.coeff = (view.getHeight(view.years) - model.track) / frameHeight;
			}

			function showLimits() {
				view.top.style.top = - model.limitTop + 'px';
				view.bottom.style.top = - model.limitBottom + 'px';
			}
		}
	}
}