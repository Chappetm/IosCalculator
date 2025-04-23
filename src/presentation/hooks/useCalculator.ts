import { useRef, useState } from "react"

enum Operator {
    add,
    subtract,
    multiply,
    divide
}

export const useCalculator = () => {

    const [number, setNumber] = useState('0')
    const [prevNumber, setPrevNumber] = useState('0')

    const lastOperation = useRef<Operator | null>(null)

    const clean = () => {
        setNumber('0')
        setPrevNumber('0')
    }

    const deleteOperation = () => {
        let currentSign = '';
        let temporalNumber = number;

        if (number.includes('-')) {
            currentSign = '-'
            temporalNumber = number.replace('-', '')
        }

        if (temporalNumber.length > 1) {
            return setNumber(currentSign + temporalNumber.slice(0, - 1))
        }

        return setNumber('0')

    }

    const toggleSign = () => {
        if (number.includes('-')) {
            return setNumber(number.replace('-', ''))
        }

        return setNumber('-' + number)
    }

    const buildNumber = (numberString: string) => {

        if (number.includes('.') && numberString === '.') return

        if (number.startsWith('0') || number.startsWith('-0')) {
            // Punto decimal
            if (numberString === '.') {
                return setNumber(number + numberString)
            }

            // Evaluar si es otro 0 y no hay .
            if (numberString === '0' && number.includes('.')) {
                return setNumber(number + numberString)
            }

            // Evaluar si es diferente de 0, no hay punto y es el primer numero
            if (numberString !== '0' && !number.includes('.')) {
                return setNumber(numberString)
            }

            // Evitar el 0000
            if (numberString === '0' && !number.includes('.')) {
                return
            }

            return setNumber(number + numberString)
        }

        setNumber(number + numberString)

    }

    const setLastNumber = () => {
        if (number.endsWith('.')) {
            setPrevNumber(number.slice(0, -1))
        } else {
            setPrevNumber(number)
        }

        setNumber('0')
    }

    const divideOperation = () => {
        setLastNumber()
        lastOperation.current = Operator.divide
    }

    const multiplyOperation = () => {
        setLastNumber()
        lastOperation.current = Operator.multiply
    }

    const subtractOperation = () => {
        setLastNumber()
        lastOperation.current = Operator.subtract
    }

    const addOperation = () => {
        setLastNumber()
        lastOperation.current = Operator.add
    }


    return {
        // Properties
        number,
        prevNumber,

        // Methods
        buildNumber,
        clean,
        deleteOperation,
        toggleSign,
        addOperation,
        subtractOperation,
        multiplyOperation,
        divideOperation
    }
}
