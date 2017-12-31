
// adding click event listener to every button 
window.addEventListener('load', function() {
  var buttons = document.getElementsByTagName('button');
  for ( var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', operationListener);
  }
});

// this object used to keep the state of the calculator
var calculator = {
  currentNum: '',
  echoText: '',
  result: '0',
  operateor: '',
  activeValue: ''
};

// update number that is displayed on the screen
function updateScreenContent(contentTxt, elementId) {
  document.getElementById(elementId).innerHTML = contentTxt;
};

// reset calculator
function resetCalculator() {
  calculator.echoText = '';
  calculator.result = '0';
  calculator.activeValue = '';
  calculator.currentNum = '';
  updateScreenContent(calculator.echoText, 'echo');
  updateScreenContent(calculator.activeValue, 'result');
}

// clear error number
function clearErrNum() {
  calculator.echoText = calculator.echoText.slice(0, calculator.echoText.length - calculator.currentNum.length);
  calculator.currentNum = '';
  updateScreenContent(calculator.echoText, 'echo');
  updateScreenContent(calculator.currentNum, 'result');
}

// clear a digit each time
function clearOneDigit() {
  calculator.echoText = calculator.echoText.slice(0, calculator.echoText.length - 1);
  calculator.currentNum = calculator.currentNum.slice(0, calculator.currentNum.length - 1);
  updateScreenContent(calculator.echoText, 'echo');
  updateScreenContent(calculator.currentNum, 'result');
}

//listen and response button press
var operationListener = function(event) {

  calculator.activeValue = event.target.value;
  var theLastChar = '';
  
  if (calculator.activeValue === 'ac') {
    // reset calculator
    resetCalculator();

  } else if (calculator.activeValue === 'ce') {
    // clear error number
    clearErrNum();

  } else if (calculator.activeValue === 'bkn' && calculator.currentNum !== '') {
    // clear a digit each press
    clearOneDigit();

  } else if (!isNaN(calculator.activeValue) || calculator.activeValue === ".") {

    if (calculator.currentNum === '' && calculator.activeValue === ".") {
      calculator.activeValue = '0.';
    }
    calculator.echoText += calculator.activeValue;
    calculator.currentNum += calculator.activeValue;
    
    updateScreenContent(calculator.echoText, 'echo');
    updateScreenContent(calculator.currentNum, 'result');
    
  } else if (calculator.activeValue === '+' || calculator.activeValue === '-' || calculator.activeValue === '*' || calculator.activeValue === '/') {

    theLastChar = calculator.echoText.charAt(calculator.echoText.length - 1);
    // prevent entry math operators continuely
    if (theLastChar === '+' || theLastChar === '-' || theLastChar === '*' || theLastChar === '/') {
      calculator.echoText = calculator.echoText.slice(0, calculator.echoText.length - 1) + calculator.activeValue;
      calculator.operateor = calculator.activeValue;
      updateScreenContent(calculator.echoText, 'echo');
    } else {
      calculator.echoText += calculator.activeValue;
      updateScreenContent(calculator.echoText, 'echo');

      if (calculator.operateor === '' || calculator.operateor === undefined) {
        calculator.result = calculator.currentNum;
        calculator.operateor = calculator.activeValue;
        calculator.currentNum = '';
      } else {
        calculator.result = eval(calculator.result + calculator.operateor + calculator.currentNum).toString();
        calculator.operateor = calculator.activeValue;
        updateScreenContent(calculator.result, 'result');
        calculator.currentNum = '';
      }
    }
    
  } else if (calculator.activeValue === '=') {

    calculator.echoText += calculator.activeValue;
    calculator.result = eval(calculator.result + calculator.operateor + calculator.currentNum).toString();
    updateScreenContent(calculator.echoText + calculator.result, 'echo');
    updateScreenContent(calculator.result, 'result');
    calculator.currentNum = '';
    calculator.echoText = '';
    calculator.result = '0';
    calculator.operateor = '';
    calculator.activeValue = '';
  }
};
