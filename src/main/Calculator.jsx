import React, {Component} from 'react'
import './Calculator.css'

import Button from '../Components/button'
import Display from '../Components/display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0,0],
    current: 0
}

export default class Calculator extends Component{

    constructor(props){
        super(props)

        this.state = {...initialState}

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory(){
        this.setState({...initialState})
    }

    setOperation(op){

        console.log(op)
        
        if(this.state.current === 0){
            this.setState({operation: op, current: 1, clearDisplay: true})
        }else{

            const equals = op==='='
            const operation = this.state.operation

            const values = [...this.state.values]
            let num1 = values[0]
            let num2 = values[1]
            console.log(num1, num2)
            if(operation==='/'){
                values[0] = num1/num2
            }
            if(operation==='*'){
                values[0] = num1*num2
            }
            if(operation==='-'){
                values[0] = num1-num2
            }
            if(operation==='+'){
                values[0] = num1+num2
                
            }
            
            values[1] = 0
            let valorFinal = values[0]*100

            if(valorFinal%100===0){
                valorFinal = values[0]
            }else{
                valorFinal = values[0].toFixed(1)
            }
            
            this.setState({
                displayValue: valorFinal,
                operation: equals ? null : op,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values: values
            })
        }
        
    }

    addDigit(n){
        if(n==='.' && this.state.displayValue.includes('.')){
            return
        }
        
        const clearDisplay = (this.state.displayValue === '0'|| this.state.clearDisplay) && n!=='.'

        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n

        this.setState({displayValue, clearDisplay:false})
       

        if(n!=='.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]

            values[i] = newValue
            this.setState({values})
            console.log(values)
        }
    }

    render(){
        return(
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation} operation/>
                
            </div>
        )
    }
}