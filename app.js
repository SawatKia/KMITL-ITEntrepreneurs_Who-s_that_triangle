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
console.log(sideAInput.val == undefined);

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
            EN: "Error: Please enter length.",
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
    console.log(currentResult);
    // calculateTriangle();
}

languageToggle.addEventListener("click", () => {
    currentLanguage = currentLanguage === "EN" ? "TH" : "EN";
    updateLanguage(currentLanguage);
});

function inputValidate(side1, side2, side3){
    // console.log("hello");
    // console.log(side1.val == undefined);
    const sideAValue = side1.value;
    const sideBValue = side2.value;
    const sideCValue = side3.value;

    const sideA = parseFloat(sideAValue);
    const sideB = parseFloat(sideBValue);
    const sideC = parseFloat(sideCValue); 

    const decimalCheck = /^\d+(\.\d{1,2})?$/;
    if (!decimalCheck.test(sideAValue) || !decimalCheck.test(sideBValue) || !decimalCheck.test(sideCValue)) {
        if (isNaN(sideA) || isNaN(sideB) || isNaN(sideC)) {
            resultDiv.textContent = translations.errors.numericError[currentLanguage];
            resultDiv.style.color = "red";
            currentResult = "numericError";
            return;
        }
        
        resultDiv.textContent = translations.errors.decimalError[currentLanguage];
        resultDiv.style.color = "red";
        currentResult = "decimalError";
        console.log("here");
        return;
    }

    // if (!decimalCheck.test(sideAValue) || !decimalCheck.test(sideBValue) || !decimalCheck.test(sideCValue)) {
    //     resultDiv.textContent = translations.errors.decimalError[currentLanguage];
    //     resultDiv.style.color = "red";
    //     currentResult = "decimalError";
    //     return;
    // }

    if (sideA <= 0 || sideB <= 0 || sideC <= 0) {
        resultDiv.textContent = translations.errors.positiveError[currentLanguage];
        resultDiv.style.color = "red";
        currentResult = "positiveError";
        return;
    }

    if (sideA + sideB <= sideC || sideA + sideC <= sideB || sideB + sideC <= sideA) {
        resultDiv.textContent = translations.errors.triangleError[currentLanguage];
        resultDiv.style.color = "red";
        currentResult = "triangleError";
        return;
    }

    currentResult = "notError";
}

function calculateTriangle() {
    inputValidate(sideAInput, sideBInput, sideCInput);

    if(currentResult == "notError"){
        const sideA = parseFloat(sideAInput.value);
        const sideB = parseFloat(sideBInput.value);
        const sideC = parseFloat(sideCInput.value);

        if (sideA === sideB && sideB === sideC) {
            resultDiv.textContent = translations.results.equilateral[currentLanguage];
            currentResult = "equilateral";
        } else if (sideA === sideB || sideB === sideC || sideA === sideC) {
            resultDiv.textContent = translations.results.isosceles[currentLanguage];
            currentResult = "isosceles";
        } else if (sideA ** 2 + sideB ** 2 === sideC ** 2 || sideA ** 2 + sideC ** 2 === sideB ** 2 || sideB ** 2 + sideC ** 2 === sideA ** 2) {
            resultDiv.textContent = translations.results.right[currentLanguage];
            currentResult = "right";
        } else {
            resultDiv.textContent = translations.results.scalene[currentLanguage];
            currentResult = "scalene";
        }
    
        resultDiv.style.color = "green";
    }
}

calculateButton.addEventListener("click", calculateTriangle);