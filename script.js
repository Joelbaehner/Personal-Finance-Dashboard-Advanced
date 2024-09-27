/*      This function adds a new row to the specified card.
        It creates input fields for the source and amount, a delete button, and appends them to the card.
        It also plays a sound if the card is an income or savings card.*/
        function addRow(cardId) {
            /* if i push the add button of income or savings card, the sound will play. Income-card or savings-card stands for the id of the card.*/
            if (cardId === 'income-card' || cardId === 'savings-card') {
                /* This function plays the sound of a cash register.*/
                playCashSound();
            }
            /* This function gets the card with the specified id and creates a new row with input fields for the source and amount, a delete button.*/
            const card = document.getElementById(cardId);
            /* Creates a new row with the class row.*/
            const row = document.createElement('div');
            row.className = 'row';  //Adds the class row to the new row.
            /* Creates a new input field for the source.*/
            const input1 = document.createElement('input');
            input1.type = 'text';  //Sets the type of the input field to text.
            input1.placeholder = 'source';  //Sets the placeholder of the input field to source.
            /* Creates a new input field for the amount.*/
            const input2 = document.createElement('input');
            input2.type = 'number';     //Sets the type of the input field to number.
            input2.placeholder = 'amount';  //Sets the placeholder of the input field to amount.
            input2.step = '0.01';       //Sets the step of the input field to 0.01.
            input2.min = '0';           //Sets the minimum of the input field to 0.
            /* Creates a new delete button.*/
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';   //Adds the class delete-button to the new delete button.
            deleteButton.textContent = 'delete';        //Sets the text content of the delete button to delete. 
            deleteButton.onclick = function() {         //Adds the onclick function to the delete button.
                deleteRow(deleteButton);                //Calls the deleteRow function with the delete button as the argument.  
            };
            /* Appends the input fields and the delete button to the row.*/
            row.appendChild(input1);
            row.appendChild(input2);
            row.appendChild(deleteButton);
            /* Inserts the new row at the beginning of the card.*/
            card.insertBefore(row, card.lastElementChild);
        }

        /* This function deletes the row, where the button is located.*/
        function deleteRow(button) {
            const row = button.parentElement;
            row.remove();
        }

        /* This function plays the sound of a cash register.*/
        function playCashSound() {
            const audio = document.getElementById('cashSound');
            audio.currentTime = 0;  //Audio starts from the beginning
            audio.play();
        }

        /* This function plays the sound of a good result.*/
        function playgoodResultSound() {
            const audio = document.getElementById('goodResult');
            audio.currentTime = 0;      //Audio starts from the beginning
            audio.play();
        }

        function playfailSound() {
            const audio = document.getElementById('failSound');
            audio.currentTime = 0;      //Audio starts from the beginning
            audio.play();
        }

        /* This function calculates the final result.*/
        function calculate() {
            /* This array contains the categories of the card.*/
            const categories = ['income', 'expenses', 'debts', 'savings'];
            /* This object contains the totals of the categories.*/
            const totals = {};
            /* This for loop calculates the total of the categories.*/
            for (let i = 0; i < categories.length; i++) {
                const category = categories[i];
                const card = document.getElementById(`${category}-card`);   //This gets the card with the specified id.
                const inputs = card.querySelectorAll('input[type="number"]');  //This gets all the input fields with the type number.
                let total = 0;  //This initializes the total to 0.
                /* This for loop calculates the total of the category.*/
                for (let j = 0; j < inputs.length; j++) {
                    const input = inputs[j];  //This gets the input field with the specified index. 
                    let value;  
                    if (parseFloat(input.value)) {
                        value = parseFloat(input.value);
                    } else {
                        value = 0;
                    }
                    total += Math.round(value * 100) / 100; 
                }
                /* This for loop adds the total of the category to the totals object.*/
                totals[category] = total;
                document.getElementById(`${category}-total`).textContent = `total ${category}: ${total.toFixed(2)} €`;
            }
            const finalResult = totals.income + totals.savings - totals.debts - totals.expenses;
            document.getElementById('final-result').textContent = `total: ${finalResult.toFixed(2)} €`;
            
            /* Plays a sound of winning or losing depending of the total result.*/
            if (finalResult >= 0) {
                playgoodResultSound();
            } else {
                playfailSound();
            }
        }