const clear = document.querySelector('.clear')
const backSpace = document.querySelector('.backspace')
const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.numbers')
const operators = document.querySelectorAll('.operators')
const negativeSign = document.querySelector('#substraction')
const decimal = document.querySelector('.decimal')
const equals = document.querySelector('.equals')
const infinityWarningBox = document.querySelector('.warning-box')
const prevSolution = document.querySelector('.prev-solution');

clear.addEventListener('click', () => {
    display.value = '';
    prevSolution.value = '';
})

backSpace.addEventListener('click', () => {
    const displayValue = display.value.split('');
    displayValue.pop();
    display.value = displayValue.join('');
})

numbers.forEach((number) => {
    number.addEventListener('click', () => {
       if (display.value.length !== 12) {
        if (display.value === '0') {
            display.value = '';
        }
        display.value += number.value
       }
    })
})

decimal.addEventListener('click', () => {
    if (display.value.length !== 12) {
        if (display.value.indexOf('.') === -1) {
            if (display.value === '') {
                display.value = '0'
            }
            display.value += decimal.value
        }
        else if (display.value.search(/[%*\-+/]/g)) {
            console.log(display.value.search(/[%*\-+/]/g));
        }
    }
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        prevSolution.value = solve(display.value)
        if (display.value.length !== 12) {
            if ((display.value.match(/[%*\-+/]/g) === null || display.value.match(/[%*\-+/]/g).length < 1) && display.value !== '') {
                if (!display.value[(display.value.length) - 1].match(/[%*\-+/]/)) {
                    display.value += operator.value
                }
            }
            if (display.value !== '' && display.value[(display.value.length) - 1].match(/[%*\-+/]/) && display.value.length > 1) {
                const displayValue = display.value.split('');
                displayValue.pop();
                displayValue.push(operator.value)
                display.value = displayValue.join('');
            }
        }
    })
})
// negativeSign.addEventListener('click', () => {
//     prevSolution.value = solve(display.value)
//     if (!display.value.match(/[%*\-+/]/)) {
//         display.value += negativeSign.value
//     }
//     else if (display.value.match(/[%*\-+/]/g).length < 2 && display.value.length > 1) {
//         if (!display.value[(display.value.length) - 1].match(/[%*\-+/]/)) {
//             display.value += negativeSign.value
//         }
//     }
//     if (display.value !== '' && display.value[(display.value.length) - 1].match(/[%*\-+/]/) && display.value.length > 1) {
//         const displayValue = display.value.split('');
//         displayValue.pop();
//         displayValue.push(negativeSign.value)
//         display.value = displayValue.join('');
//     }
// })


equals.addEventListener('click', () => {
    prevSolution.value = solve(display.value)
})

function solve (input, prevSolution) {
    let inputArray = input.split(/[%*\-+/]/)
    let operator = input.match(/[%*\-+/]/);
    if (inputArray.length > 1 && inputArray.every((inputValue) => Boolean(inputValue))) {
        inputArray = inputArray.map((inputValue) => parseFloat(inputValue))
    
        if (operator[0] === '+')
            input = inputArray[0] + inputArray[1];
        if (operator[0] === '-')
            input = inputArray[0] - inputArray[1];
        if (operator[0] === '*')
            input = inputArray[0] * inputArray[1];
        if (operator[0] === '/') {
            if (inputArray[1] === 0) {
                infinityWarningBox.style.display = 'block'
                setTimeout(() => {
                    infinityWarningBox.style.display = 'none'
                }, 1000); 
                return ('');
            }
            else
                input = inputArray[0] / inputArray[1];
        }
        if (operator[0] === '%') {
            if (inputArray[1] === 0) {
                infinityWarningBox.style.display = 'block'
                setTimeout(() => {
                    infinityWarningBox.style.display = 'none'
                }, 1000);
                return ('');
            }
            else
                input = inputArray[0] % inputArray[1];
        }
    }
    return (input);
}

