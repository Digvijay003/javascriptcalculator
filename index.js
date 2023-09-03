class Calculator{
  constructor(previousElementValue,currentElementValue){
    this.previousElementValue=previousElementValue
    this.currentElementValue=currentElementValue
    this.clear()

  }
  appendNumbers(number){
    if(number === '.' && this.currentOpearnd.includes('.')){
      return
    }
    if(number === '0' && this.currentOpearnd === '0'){
      return
    }
    this.currentOpearnd=this.currentOpearnd.toString() + number.toString()


  }
  deleteNumber(){
    if(this.currentOpearnd.length === 0){
      return
    }
    this.currentOpearnd=this.currentOpearnd.toString().slice(0,-1)

  }
  evaluate(){
    let result
    const prev=parseFloat(this.previousOperand)
    const current=parseFloat(this.currentOpearnd)
    if(isNaN(prev) || isNaN(current))
    {
      return
    }
    switch(this.operation){
      case "+":
        result=prev+current
        break
      case "-":
        result=prev-current
        break
      case "*":
        result=prev*current
        break
      case "/":
        result=prev/current
        break
      default:
        return
    }
    this.currentOpearnd=result
    this.operation=''
    this.previousOperand=''

  }
  clear(){
    this.previousOperand=''
    this.currentOpearnd=''
    this.operation=''

  }
  chooseOperation(operation){
    if(this.currentOpearnd === ''){
      return
    }
    if(this.previousOperand!==''){
      this.evaluate()
    }
 
    this.operation=operation
    this.previousOperand=this.currentOpearnd
    this.currentOpearnd=''


  }
  formatNumbers(number){
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }

  }
  updateDisplay(){
    this.currentElementValue.innerText=this.formatNumbers(this.currentOpearnd)
    if(this.operation !== '' ){
      this.previousElementValue.innerText=`${this.formatNumbers(this.previousOperand)}${this.operation}`
    }
    else{
      this.previousElementValue.innerText=''
    }

  }

}


const previousElementValue=document.querySelector('[data-previous-operand]')
const currentElementValue=document.querySelector('[data-current-operand]')
const allNumbers=document.querySelectorAll('[data-number]')
const allOperations=document.querySelectorAll('[data-operation]')
const allClearButton=document.querySelector('[data-all-clear]')
const deleteButton=document.querySelector('[data-delete]')
const equalButton=document.querySelector('[data-equals]')

const mycalculator = new Calculator(previousElementValue,currentElementValue)

allNumbers.forEach(item=>{item.addEventListener("click",()=>{
  mycalculator.appendNumbers(item.innerText)
  mycalculator.updateDisplay()
})
})

allOperations.forEach(item=>{
  item.addEventListener("click",()=>{
  mycalculator.chooseOperation(item.innerText)
  mycalculator.updateDisplay()
})
})

allClearButton.addEventListener("click",()=>{
  mycalculator.clear()
  mycalculator.updateDisplay()
})

deleteButton.addEventListener("click",()=>{
  mycalculator.deleteNumber()
  mycalculator.updateDisplay()
})

equalButton.addEventListener("click",()=>{
  mycalculator.evaluate()
  mycalculator.updateDisplay()
})