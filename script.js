'use strict';
const calculatorKeys = document.querySelector('.calculator_keys');
const calculator = document.querySelector('.calculator');
const displayKeys = document.querySelector('.calculator_display');
const buttons = document.querySelectorAll('.btn');

const calcFunc = function (num1, operator, num2) {
  let result;
  if (operator === 'addition') {
    result = num1 + num2;
  }
  if (operator === 'divide') {
    result = num1 / num2;
  }
  if (operator === 'multiply') {
    result = num1 * num2;
  }
  if (operator === 'substract') {
    result = num1 - num2;
  }
  if (operator === 'power') {
    result = num1 ** num2;
  }
  if (operator === 'percent') {
    result = (num1 / 100) * num2;
  }
  return result;
};

calculatorKeys.addEventListener('click', function (e) {
  const clicked = e.target.classList.contains('btn');
  const key = e.target;
  const keyContent = key.textContent;
  const action = key.dataset.action;
  const displayContent = displayKeys.textContent;
  const previousKeyType = calculator.dataset.previousKeyType;
  if (clicked) {
    if (!action) {
      if (displayContent === '0' || previousKeyType === 'operator') {
        displayKeys.textContent = keyContent;
        calculator.dataset.previousKeyType = 'undefined';
      } else {
        displayKeys.textContent = displayKeys.textContent + keyContent;
      }
    }

    if (
      action === 'addition' ||
      action === 'substract' ||
      action === 'multiply' ||
      action === 'divide' ||
      action === 'power' ||
      action === 'percent'
    ) {
      calculator.dataset.previousKeyType = 'operator';
      calculator.dataset.firstValue = displayContent;
      calculator.dataset.keyType = action;
    }

    if (action === 'clear') {
      displayKeys.textContent = 0;
    }
    if (action === 'decimal') {
      if (displayContent.includes('.')) return;
      if (displayKeys.textContent === calculator.dataset.firstValue) {
        console.log('hey');
        displayKeys.textContent = '0';
        console.log(displayKeys.textContent);
      }
      if (!displayContent.includes('.')) {
        displayKeys.textContent = displayKeys.textContent + '.';
      }
    }
    if (action === 'calculate') {
      const firstValue = calculator.dataset.firstValue;

      const operator = calculator.dataset.keyType;

      displayKeys.textContent = calcFunc(
        +firstValue,
        operator,
        +displayContent
      ).toFixed(2);
    }
  }
});
