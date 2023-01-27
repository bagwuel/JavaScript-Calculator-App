const clear = document.querySelector('.clear')
const backSpace = document.querySelector('.backspace')
const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.numbers')
const operators = document.querySelectorAll('.operators')
const negativeSign = document.querySelector('#substraction')
const decimal = document.querySelector('.decimal')
const equals = document.querySelector('.equals')
const infinityWarningBox = document.querySelector('.warning-box')
const minus = document.querySelector('.minus')
const buttons = document.querySelectorAll('button')
let minusSign = '';

buttons.forEach(button => {
    button.addEventListener('mousedown', () => {
        button.style.boxShadow = 'none';
        button.style.transform = `translate(${3}px, ${3}px)`
        // button.style.transition = '50ms';
    })
})

buttons.forEach(button => {
    button.addEventListener('mouseup', () => {
        button.style.boxShadow = '2px 2px 2px 2px black';
        button.style.transform = `translate(${-3}px, ${-3}px)`
        button.style.transition = '50ms';
    })
})

clear.addEventListener('click', () => {
    display.value = '';
    display.value = '';
})

backSpace.addEventListener('click', () => {
    const displayValue = display.value.split('');
    displayValue.pop();
    display.value = displayValue.join('');
})

numbers.forEach((number) => {
    number.addEventListener('click', () => {
       if (display.value.length !== 20) {
        if (display.value === '0') {
            display.value = '';
        }
        display.value += number.value
       }
    })
})

decimal.addEventListener('click', () => {
    let checker = display.value.length - 1
    if (display.value.length !== 20) {
        if (display.value.indexOf('.') === -1) {
            if (display.value === '') {
                display.value = '0'
            }
            display.value += decimal.value
        }
        else {
            if (display.value.match(/[%*\-+/]/g)) {
                if (display.value.indexOf(display.value.match(/[%*\-+/]/g)) > display.value.indexOf('.')) {
                    if (display.value.match(/\./g).length < 2) {
                        display.value += decimal.value
                    }
                };
            }

        }
    }
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        display.value = solve(display.value)
        if (display.value.length !== 20) {
            if ((display.value.match(/[%*\-+/]/g) === null) && display.value !== '') {
                display.value += operator.value
            }
            if (display.value !== '' && display.value[(display.value.length) - 1].match(/[%*\-+/]/) && display.value.length > 1) {
                const displayValue = display.value.split('');
                displayValue.pop();
                displayValue.push(operator.value)
                display.value = displayValue.join('');
            }
            if (display.value.startsWith('-') && (display.value.match(/[%*+/]/g) === null)) {
                if (operator.value === '-') {
                    if (display.value.match(/\-/g).length < 2) {
                        display.value += operator.value
                    }
                }else {
                    display.value += operator.value
                }
            }
        }
    })
})

negativeSign.addEventListener('click', () => {
    if (display.value === '') {
        minusSign = '-'
        minus.style.display = 'block';
    }
})

equals.addEventListener('click', () => {
    display.value = solve(display.value)
})

function solve (input) {
   
    let inputArray = input.split(/[%*\-+/]/)
    let operator = input.match(/[%*\-+/]/g);
    if( input.startsWith('-')) {
        inputArray.shift()
        minusSign = '-'
        minus.style.display = 'block';
    }
    if (minusSign) {
        inputArray[0] = `-${inputArray[0]}`
        minusSign = ''
        minus.style.display = 'none';
    }
    if (inputArray.length > 1 && inputArray.every((inputValue) => Boolean(inputValue))) {
        inputArray = inputArray.map((inputValue) => parseFloat(inputValue))
    
        if (operator[operator.length - 1] === '+')
            input = (inputArray[0] * 1000 + inputArray[1] * 1000) / 1000;
        if (operator[operator.length - 1] === '-')
            input = (inputArray[0] - inputArray[1]);
        if (operator[operator.length - 1] === '*')
            input = (inputArray[0] * inputArray[1]);
        if (operator[operator.length - 1] === '/') {
            if (inputArray[1] === 0) {
                infinityWarningBox.style.display = 'block'
                setTimeout(() => {
                    infinityWarningBox.style.display = 'none'
                }, 1500);
                return ('');
            }
            else
                input = (inputArray[0] / inputArray[1]);
        }
        if (operator[operator.length - 1] === '%') {
            if (inputArray[1] === 0) {
                infinityWarningBox.style.display = 'block'
                setTimeout(() => {
                    infinityWarningBox.style.display = 'none'
                }, 1500);
                return ('');
            }
            else
                input = (inputArray[0] % inputArray[1]);
        }
    }
    return (input);
}

