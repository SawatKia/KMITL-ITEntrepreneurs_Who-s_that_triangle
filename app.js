const resultDiv = document.getElementById("result");
const languageToggle = document.getElementById("languageToggle");
const title = document.getElementById("title");
const labelA = document.getElementById("labelA");
const labelB = document.getElementById("labelB");
const labelC = document.getElementById("labelC");
const calculateButton = document.getElementById("calculateButton");
const sideAInput = document.getElementById("sideA");
const sideBInput = document.getElementById("sideB");
const sideCInput = document.getElementById("sideC");

const translations = {
    title: {
        EN: "Who's that triangle",
        TH: "Who's that triangle"
    },
    labelA: {
        EN: "Side A:",
        TH: "ด้าน A:"
    },
    labelB: {
        EN: "Side B:",
        TH: "ด้าน B:"
    },
    labelC: {
        EN: "Side C:",
        TH: "ด้าน C:"
    },
    calculateButton: {
        EN: "Enter/Submit",
        TH: "ยืนยัน"
    },
    languageToggle: {
        EN: "Switch to TH",
        TH: "Switch to EN"
    },
    errors: {
        decimalError: {
            EN: "Error: Decimal numbers must have no more than two decimal places.",
            TH: "ทศนิยมต้องมีไม่เกินสองตำแหน่ง"
        },
        numericError: {
            EN: "Error: Please enter your input.",
            TH: "กรุณากรอกความยาวด้าน"
        },
        positiveError: {
            EN: "Error: Side lengths must be positive numbers.",
            TH: "ความยาวด้านต้องเป็นตัวเลขบวก"
        },
        triangleError: {
            EN: "Error: It's not a triangle.",
            TH: "ไม่ใช่สามเหลี่ยม"
        },
        stringError: {
            EN: "Error. Please enter numeric values.",
            TH: "โปรดกรอกตัวเลข"
        }
     },
    results: {
        equilateral: {
            EN: "Equilateral Triangle",
            TH: "สามเหลี่ยมด้านเท่า"
        },
        isosceles: {
            EN: "Isosceles Triangle",
            TH: "สามเหลี่ยมหน้าจั่ว"
        },
        right: {
            EN: "Right Triangle",
            TH: "สามเหลี่ยมมุมฉาก"
        },
        scalene: {
            EN: "Scalene Triangle",
            TH: "สามเหลี่ยมด้านไม่เท่า"
        }
    }
};

let currentLanguage = "EN";
let currentResult = "";

function updateLanguage(lang) {
    title.textContent = translations.title[lang];
    labelA.textContent = translations.labelA[lang];
    labelB.textContent = translations.labelB[lang];
    labelC.textContent = translations.labelC[lang];
    calculateButton.textContent = translations.calculateButton[lang];
    languageToggle.textContent = translations.languageToggle[lang];

    switch(currentResult){
        case "decimalError":
            resultDiv.textContent = translations.errors.decimalError[lang];
            break;
        case "numericError":
            resultDiv.textContent = translations.errors.numericError[lang];
            break;
        case "positiveError":
            resultDiv.textContent = translations.errors.positiveError[lang];
            break;
        case "triangleError":
            resultDiv.textContent = translations.errors.triangleError[lang];
            break;
        case "stringError":
            resultDiv.textContent = translations.errors.stringError[lang];
            break;
        case "equilateral":
            resultDiv.textContent = translations.results.equilateral[lang];
            break;
        case "isosceles":
            resultDiv.textContent = translations.results.isosceles[lang];
            break;
        case "right":
            resultDiv.textContent = translations.results.right[lang];
            break;
        case "scalene":
            resultDiv.textContent = translations.results.scalene[lang];
            break;
        default:
            resultDiv.textContent = '';
    }
}

languageToggle.addEventListener("click", () => {
    currentLanguage = currentLanguage === "EN" ? "TH" : "EN";
    updateLanguage(currentLanguage);
});


function inputValidate(side1, side2, side3){
    const sideAValue = side1.value.trim();
    const sideBValue = side2.value.trim();
    const sideCValue = side3.value.trim();

    if (sideAValue === '' || sideBValue === '' || sideCValue === '') {
        resultDiv.textContent = translations.errors.numericError[currentLanguage];
        resultDiv.style.color = "red";
        currentResult = "numericError";
        return false;
    }

    if (/[a-zA-Z]/.test(sideAValue) || /[a-zA-Z]/.test(sideBValue) || /[a-zA-Z]/.test(sideCValue)) {
        resultDiv.textContent = translations.errors.stringError[currentLanguage];
        resultDiv.style.color = "red";
        currentResult = "stringError";
        return false;
    }

    let sideA, sideB, sideC;
    
    try {
        sideA = evaluateExpression(sideAValue);
        sideB = evaluateExpression(sideBValue);
        sideC = evaluateExpression(sideCValue);
    } catch (error) {
        resultDiv.textContent = translations.errors.numericError[currentLanguage];
        resultDiv.style.color = "red";
        currentResult = "numericError";
        return false;
    }

    if (isNaN(sideA) || isNaN(sideB) || isNaN(sideC)) {
        resultDiv.textContent = translations.errors.numericError[currentLanguage];
        resultDiv.style.color = "red";
        currentResult = "numericError";
        return false;
    }

    if (!checkDecimalPlaces(sideA) || !checkDecimalPlaces(sideB) || !checkDecimalPlaces(sideC)) {
        resultDiv.textContent = translations.errors.decimalError[currentLanguage];
        resultDiv.style.color = "red";
        currentResult = "decimalError";
        return false;
    }

    if (sideA <= 0 || sideB <= 0 || sideC <= 0) {
        resultDiv.textContent = translations.errors.positiveError[currentLanguage];
        resultDiv.style.color = "red";
        currentResult = "positiveError";
        return false;
    }

    side1.calculatedValue = sideA;
    side2.calculatedValue = sideB;
    side3.calculatedValue = sideC;

    if (sideA === sideB && sideB === sideC) {
        currentResult = "notError";
        return true;
    }

    try {
        const a = BigInt(sideA.replace('.', '').replace(/^0+/, ''));
        const b = BigInt(sideB.replace('.', '').replace(/^0+/, ''));
        const c = BigInt(sideC.replace('.', '').replace(/^0+/, ''));
        
        if (a + b <= c || a + c <= b || b + c <= a) {
            resultDiv.textContent = translations.errors.triangleError[currentLanguage];
            resultDiv.style.color = "red";
            currentResult = "triangleError";
            return false;
        }
    } catch (e) {
        const a = Number(sideA);
        const b = Number(sideB);
        const c = Number(sideC);
        
        if (a === Infinity && b === Infinity && c === Infinity) {
            currentResult = "notError";
            return true;
        } else if (a === Infinity || b === Infinity || c === Infinity) {
            if ((a === Infinity && b === Infinity) || 
                (a === Infinity && c === Infinity) || 
                (b === Infinity && c === Infinity)) {
                currentResult = "notError";
                return true;
            } else {
                resultDiv.textContent = translations.errors.triangleError[currentLanguage];
                resultDiv.style.color = "red";
                currentResult = "triangleError";
                return false;
            }
        } else if (a + b <= c || a + c <= b || b + c <= a) {
            resultDiv.textContent = translations.errors.triangleError[currentLanguage];
            resultDiv.style.color = "red";
            currentResult = "triangleError";
            return false;
        }
    }

    currentResult = "notError";
    return true;
}

function evaluateExpression(expr) {
    expr = expr.replace(/\s+/g, '');
    
    if (/[^0-9+\-*/().]/g.test(expr)) {
        throw new Error("Invalid characters in expression");
    }
    
    try {
        let result;
        if (/^-?\d+(\.\d+)?$/.test(expr)) {
            result = parseFloat(expr);
        } else {
            // Use Function to evaluate the expression.
            result = Function('"use strict"; return (' + expr + ')')();
        }
    
        const matches = expr.match(/(\d*\.\d+)/g);
        let maxDecimals = 0;
        if (matches) {
            for (const m of matches) {
                const decimals = m.split('.')[1].length;
                maxDecimals = Math.max(maxDecimals, decimals);
            }
        }
        
        if (maxDecimals > 0) {
            result = parseFloat(result.toFixed(maxDecimals));
        }
        
        return result;
    } catch (e) {
        throw new Error("Invalid expression");
    }
}

function checkDecimalPlaces(num) {
    const strNum = num.toString();
    if (strNum.includes('.')) {
        const decimalPart = strNum.split('.')[1];
        return decimalPart.length <= 2;
    }
    return true;
}

function calculateTriangle() {
    if(inputValidate(sideAInput, sideBInput, sideCInput)){
        const sideA = sideAInput.calculatedValue;
        const sideB = sideBInput.calculatedValue;
        const sideC = sideCInput.calculatedValue;

        if (sideA === sideB && sideB === sideC) {
            resultDiv.textContent = translations.results.equilateral[currentLanguage];
            currentResult = "equilateral";
        } 
        else if (sideA === sideB || sideB === sideC || sideA === sideC) {
            if (isRightTriangle(sideA, sideB, sideC)) {
                resultDiv.textContent = translations.results.right[currentLanguage];
                currentResult = "right";
            } else {
                resultDiv.textContent = translations.results.isosceles[currentLanguage];
                currentResult = "isosceles";
            }
        } else if (isRightTriangle(sideA, sideB, sideC)) {
            resultDiv.textContent = translations.results.right[currentLanguage];
            currentResult = "right";
        } else {
            resultDiv.textContent = translations.results.scalene[currentLanguage];
            currentResult = "scalene";
        }
    
        resultDiv.style.color = "green";
    }
}

function isRightTriangle(a, b, c) {
    // Sort sides in ascending order
    const sides = [a, b, c].sort((x, y) => x - y);
    const [side1, side2, side3] = sides;
    
    const computedHypotenuse = Math.hypot(side1, side2);
    
    const relativeEpsilon = 1e-10 * side3;
    
    console.log(`Computed hypotenuse: ${computedHypotenuse}`);
    console.log(`Expected hypotenuse: ${side3}`);
    console.log(`Difference: ${Math.abs(computedHypotenuse - side3)}`);
    
    return Math.abs(computedHypotenuse - side3) < relativeEpsilon;
  }

calculateButton.addEventListener("click", calculateTriangle);

sideAInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        calculateTriangle();
    }
});

sideBInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        calculateTriangle();
    }
});

sideCInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        calculateTriangle();
    }
});