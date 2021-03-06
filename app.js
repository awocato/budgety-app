var budgetController = (function() {

    var Income = function(id, description, value) {

        this.id = id;
        this.description = description;
        this.value = value;

    };

    var Expense = function(id, description, value) {

        this.id = id;
        this.description = description;
        this.value = value;

    };


    var data = {
        allItems: {
          exp: [],
          inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        //allows add item to data structure
        addItem: function(type, des, val) {
            var newItem, ID;

            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }


            if (type === 'exp') {
                newItem = new Expense(ID, des, val)
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val)
            }

            data.allItems[type].push(newItem);

            return newItem;
        }
    }

})();


var UIController = (function() {

    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            }
        },

        addListItem : function(object, type) {

            // Create html string with placeholder text
            var html, newHTML, element;

            if (type === 'inc') {
                element = DOMStrings.incomeContainer;

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value"> %value% </div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            else if (type==='exp') {
                element = DOMStrings.expensesContainer;

                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description"> %description% </div><div class="right clearfix"><div class="item__value"> %value% </div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            // Replace placeholder with actual data
            newHTML = html.replace('%id%', object.id);
            newHTML = newHTML.replace('%description%', object.description);
            newHTML = newHTML.replace('%value%', object.value);

            //Insert html into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },

        clearFields: function() {
            var fields, fieldsArray;

            fields = document.querySelectorAll(DOMStrings.inputDescription + ',' +  DOMStrings.inputValue);

            fieldsArray = Array.prototype.slice.call(fields);
            fieldsArray.forEach(function(current, index, array){
                current.value = '';
            });
            
            fieldsArray[0].focus();
        },

        getDOMStrings: function() {
            return DOMStrings;
        }

    }

})();


var appController = (function(ctrlBudget, ctrlUI) {

    var setupEventListeners = function() {

        var DOM = ctrlUI.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener ('keypress', function (e) {
            if (e.code ===13 || e.keyCode === 13) {
                ctrlAddItem();
            }
        });
    };

    var ctrlAddItem = function() {
        var input, newItem;

        //1. get input field from user
        input = ctrlUI.getInput();

        //2. add input do budgetController
        newItem = ctrlBudget.addItem(input.type, input.description, input.value);

        //3. add item to UI
        UIController.addListItem(newItem, input.type);

        //4. clear input fields
        UIController.clearFields();

        //5. calculate budget
        //6. update budget
    };

    return {
        init: function() {
            console.log('project started');
            setupEventListeners();
        }
    }

})(budgetController, UIController);

appController.init();

