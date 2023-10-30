
        const display = document.getElementById("display");
        let currentInput = "";
        let currentOperator = "";
        let firstOperand = null;
        let waitingForSecondOperand = false;

        function updateDisplay() {
            display.value = currentInput;
        }

        document.getElementById("buttons").addEventListener("click", (event) => {
            const buttonValue = event.target.textContent;

            if (event.target.className === "button") {
                if (buttonValue === "C") {
                    currentInput = "";
                    firstOperand = null;
                    currentOperator = "";
                    waitingForSecondOperand = false;
                } else if (buttonValue === "←") {
                    // Handle backspace
                    currentInput = currentInput.slice(0, -1);
                } else if (!isNaN(buttonValue) || buttonValue === ".") {
                    currentInput += buttonValue;
                } else if (["+", "-", "*", "/"].includes(buttonValue)) {
                    if (currentOperator !== "" && !waitingForSecondOperand) {
                        calculate();
                    }
                    currentInput += ` ${buttonValue} `;
                    currentOperator = buttonValue;
                    waitingForSecondOperand = true;
                } else if (buttonValue === "=") {
                    calculate();
                    currentOperator = "";
                }
                updateDisplay();
            }
        });

        function calculate() {
            const expression = currentInput.split(" ");
            if (expression.length === 3) {
                const [num1, operator, num2] = expression;
                const operand1 = parseFloat(num1);
                const operand2 = parseFloat(num2);

                switch (operator) {
                    case "+":
                        currentInput = (operand1 + operand2).toString();
                        break;
                    case "-":
                        currentInput = (operand1 - operand2).toString();
                        break;
                    case "*":
                        currentInput = (operand1 * operand2).toString();
                        break;
                    case "/":
                        if (operand2 === 0) {
                            currentInput = "Error";
                        } else {
                            currentInput = (operand1 / operand2).toString();
                        }
                        break;
                    default:
                        break;
                }
            }
            waitingForSecondOperand = false;
            firstOperand = parseFloat(currentInput);
        }
