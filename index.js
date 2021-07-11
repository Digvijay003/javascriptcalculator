class Calculator {
    constructor(previousinput, currntinput) {
      this.previousinput=previousinput
      this.currntinput = currntinput
      this.all_clr()
    }
  
    all_clr() {
      this.currntinputelement = ''
      this.previousinputelement = ''
      this.opts = undefined
    }
  
    del_onebyone() {
      this.currntinputelement = this.currntinputelement.toString().slice(0, -1)
    }
  
    appendNumber(number) {
      if (number === '.' && this.currntinputelement.includes('.')) return
      this.currntinputelement = this.currntinputelement.toString() + number.toString()
    }
  
    chooseopts(opts) {
      if (this.currntinputelement === '') return
      if (this.previousinputelement !== '') {
        this.compute()
      }
      this.opts = opts
      this.previousinputelement = this.currntinputelement
      this.currntinputelement = ''
    }
  
    compute() {
      let computation
      const prev = parseFloat(this.previousinputelement)
      const current = parseFloat(this.currntinputelement)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.opts) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        default:
          return
      }
      this.currntinputelement = computation
      this.opts = undefined
      this.previousinputelement = ''
    }
  
   
  
    updateDisplay() {
      this.currntinput.innerText =
        this.currntinputelement
      if (this.opts != null) {
        this.previousinput.innerText =
          `${this.previousinputelement} ${this.opts}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }
  
  
  const numberButtons = document.querySelectorAll('[data-number]')
  const opts_buttons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const del_buttons = document.querySelector('.del')
  const all_clr_buttons = document.querySelector('#all_clr')
  const previousinput = document.querySelector('[data-previous-operand]')
  const currntinput = document.querySelector('[data-current-operand]')
  
  const calculator = new Calculator(previousinput, currntinput)
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  opts_buttons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseopts(button.innerText)
      calculator.updateDisplay()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  all_clr_buttons.addEventListener('click', button => {
    calculator.all_clr()
    calculator.updateDisplay()
  })
  
  del_buttons.addEventListener('click', button => {
    calculator.del_onebyone()
    calculator.updateDisplay()
  })
  