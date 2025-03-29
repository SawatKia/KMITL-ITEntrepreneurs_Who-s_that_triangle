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
    TH: "Who's that triangle",
  },
  labelA: {
    EN: "Side A:",
    TH: "ด้าน A:",
  },
  labelB: {
    EN: "Side B:",
    TH: "ด้าน B:",
  },
  labelC: {
    EN: "Side C:",
    TH: "ด้าน C:",
  },
  calculateButton: {
    EN: "Enter/Submit",
    TH: "ยืนยัน",
  },
  languageToggle: {
    EN: "Switch to TH",
    TH: "Switch to EN",
  },
  errors: {
    decimalError: {
      EN: "Error: Decimal numbers must have no more than two decimal places.",
      TH: "ทศนิยมต้องมีไม่เกินสองตำแหน่ง",
    },
    numericError: {
      EN: "Error: Please enter your input.",
      TH: "กรุณากรอกความยาวด้าน",
    },
    positiveError: {
      EN: "Error: Side lengths must be positive numbers.",
      TH: "ความยาวด้านต้องเป็นตัวเลขบวก",
    },
    triangleError: {
      EN: "Error: It's not a triangle.",
      TH: "ไม่ใช่สามเหลี่ยม",
    },
    stringError: {
      EN: "Error. Please enter numeric values.",
      TH: "โปรดกรอกตัวเลข",
    },
  },
  results: {
    equilateral: {
      EN: "Equilateral Triangle",
      TH: "สามเหลี่ยมด้านเท่า",
    },
    isosceles: {
      EN: "Isosceles Triangle",
      TH: "สามเหลี่ยมหน้าจั่ว",
    },
    right: {
      EN: "Right Triangle",
      TH: "สามเหลี่ยมมุมฉาก",
    },
    scalene: {
      EN: "Scalene Triangle",
      TH: "สามเหลี่ยมด้านไม่เท่า",
    },
  },
  recommendations: {
    title: {
      EN: "Recommendations to make a valid triangle:",
      TH: "คำแนะนำในการสร้างสามเหลี่ยมที่ถูกต้อง:",
    },
    equilateral: {
      EN: "To make an Equilateral Triangle: Set all sides to",
      TH: "สร้างสามเหลี่ยมด้านเท่า: ตั้งค่าทุกด้านเป็น",
    },
    isosceles: {
      EN: "To make an Isosceles Triangle: Set two sides to",
      TH: "สร้างสามเหลี่ยมหน้าจั่ว: ตั้งค่าสองด้านเป็น",
    },
    right: {
      EN: "To make a Right Triangle: Set sides to",
      TH: "สร้างสามเหลี่ยมมุมฉาก: ตั้งค่าด้านเป็น",
    },
    scalene: {
      EN: "To make a Scalene Triangle: Set sides to",
      TH: "สร้างสามเหลี่ยมด้านไม่เท่า: ตั้งค่าด้านเป็น",
    },
    applyButton: {
      EN: "Apply",
      TH: "ใช้งาน",
    },
  },
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

  // Update any recommendation buttons that might be present
  const applyButtons = document.querySelectorAll(".apply-recommendation");
  applyButtons.forEach((button) => {
    button.textContent = translations.recommendations.applyButton[lang];
  });

  switch (currentResult) {
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
      updateTriangleErrorWithRecommendations(lang);
      return; // Skip the normal result update since we handle it specially
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
      resultDiv.textContent = "";
  }
}

languageToggle.addEventListener("click", () => {
  currentLanguage = currentLanguage === "EN" ? "TH" : "EN";
  updateLanguage(currentLanguage);
});

function inputValidate(side1, side2, side3) {
  const sideAValue = side1.value.trim();
  const sideBValue = side2.value.trim();
  const sideCValue = side3.value.trim();

  if (sideAValue === "" || sideBValue === "" || sideCValue === "") {
    resultDiv.textContent = translations.errors.numericError[currentLanguage];
    resultDiv.style.color = "red";
    currentResult = "numericError";
    return false;
  }

  if (
    /[a-zA-Z]/.test(sideAValue) ||
    /[a-zA-Z]/.test(sideBValue) ||
    /[a-zA-Z]/.test(sideCValue)
  ) {
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

  if (
    !checkDecimalPlaces(sideA) ||
    !checkDecimalPlaces(sideB) ||
    !checkDecimalPlaces(sideC)
  ) {
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
    const a = BigInt(sideA.toString().replace(".", "").replace(/^0+/, ""));
    const b = BigInt(sideB.toString().replace(".", "").replace(/^0+/, ""));
    const c = BigInt(sideC.toString().replace(".", "").replace(/^0+/, ""));

    if (a + b <= c || a + c <= b || b + c <= a) {
      // Store the values for recommendation feature
      side1.originalValue = sideA;
      side2.originalValue = sideB;
      side3.originalValue = sideC;

      showTriangleRecommendations(sideA, sideB, sideC);

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
      if (
        (a === Infinity && b === Infinity) ||
        (a === Infinity && c === Infinity) ||
        (b === Infinity && c === Infinity)
      ) {
        currentResult = "notError";
        return true;
      } else {
        // Store the values for recommendation feature
        side1.originalValue = sideA;
        side2.originalValue = sideB;
        side3.originalValue = sideC;

        showTriangleRecommendations(sideA, sideB, sideC);

        currentResult = "triangleError";
        return false;
      }
    } else if (a + b <= c || a + c <= b || b + c <= a) {
      // Store the values for recommendation feature
      side1.originalValue = sideA;
      side2.originalValue = sideB;
      side3.originalValue = sideC;

      showTriangleRecommendations(sideA, sideB, sideC);

      currentResult = "triangleError";
      return false;
    }
  }

  currentResult = "notError";
  return true;
}

function evaluateExpression(expr) {
  expr = expr.replace(/\s+/g, "");

  if (/[^0-9+\-*/().]/g.test(expr)) {
    throw new Error("Invalid characters in expression");
  }

  try {
    let result;
    if (/^-?\d+(\.\d+)?$/.test(expr)) {
      result = parseFloat(expr);
    } else {
      // Use Function to evaluate the expression.
      result = Function('"use strict"; return (' + expr + ")")();
    }

    const matches = expr.match(/(\d*\.\d+)/g);
    let maxDecimals = 0;
    if (matches) {
      for (const m of matches) {
        const decimals = m.split(".")[1].length;
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
  if (strNum.includes(".")) {
    const decimalPart = strNum.split(".")[1];
    return decimalPart.length <= 2;
  }
  return true;
}

function calculateTriangle() {
  // Remove any existing recommendation sections
  const recommendationsSection = document.getElementById(
    "recommendations-section"
  );
  if (recommendationsSection) {
    recommendationsSection.remove();
  }

  if (inputValidate(sideAInput, sideBInput, sideCInput)) {
    const sideA = sideAInput.calculatedValue;
    const sideB = sideBInput.calculatedValue;
    const sideC = sideCInput.calculatedValue;

    if (sideA === sideB && sideB === sideC) {
      resultDiv.textContent = translations.results.equilateral[currentLanguage];
      currentResult = "equilateral";
    } else if (sideA === sideB || sideB === sideC || sideA === sideC) {
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

  return Math.abs(computedHypotenuse - side3) < relativeEpsilon;
}

// New functions for recommendation feature
function showTriangleRecommendations(sideA, sideB, sideC) {
  resultDiv.innerHTML = translations.errors.triangleError[currentLanguage];
  resultDiv.style.color = "red";

  // Create a recommendations section after the result div
  const recommendationsSection = document.createElement("div");
  recommendationsSection.id = "recommendations-section";
  recommendationsSection.style.marginTop = "20px";

  const recommendationsTitle = document.createElement("h3");
  recommendationsTitle.textContent =
    translations.recommendations.title[currentLanguage];
  recommendationsSection.appendChild(recommendationsTitle);

  // Calculate the average of the three sides for reference
  const avgSide =
    (parseFloat(sideA) + parseFloat(sideB) + parseFloat(sideC)) / 3;

  // Generate recommendations for different triangle types
  const recommendations = [
    {
      type: "equilateral",
      text: `${
        translations.recommendations.equilateral[currentLanguage]
      } ${avgSide.toFixed(2)}`,
      values: [avgSide, avgSide, avgSide],
    },
    {
      type: "isosceles",
      text: `${
        translations.recommendations.isosceles[currentLanguage]
      } ${Math.max(sideA, sideB, sideC).toFixed(2)}`,
      values: [
        Math.max(sideA, sideB, sideC),
        Math.max(sideA, sideB, sideC),
        Math.min(sideA, sideB, sideC) * 1.1,
      ],
    },
    {
      type: "right",
      text: `${translations.recommendations.right[currentLanguage]} 3, 4, 5`,
      values: [3, 4, 5],
    },
    {
      type: "scalene",
      text: `${
        translations.recommendations.scalene[currentLanguage]
      } ${Math.max(sideA, sideB).toFixed(2)}, ${Math.min(sideA, sideB).toFixed(
        2
      )}, ${(Math.max(sideA, sideB) * 0.8).toFixed(2)}`,
      values: [
        Math.max(sideA, sideB),
        Math.min(sideA, sideB),
        Math.max(sideA, sideB) * 0.8,
      ],
    },
  ];

  // Create recommendation buttons
  recommendations.forEach((rec) => {
    const recDiv = document.createElement("div");
    recDiv.style.margin = "10px 0";

    const recText = document.createElement("span");
    recText.textContent = rec.text;
    recDiv.appendChild(recText);

    const applyButton = document.createElement("button");
    applyButton.textContent =
      translations.recommendations.applyButton[currentLanguage];
    applyButton.className = "apply-recommendation";
    applyButton.style.marginLeft = "10px";
    applyButton.style.padding = "5px 10px";
    applyButton.style.cursor = "pointer";

    applyButton.addEventListener("click", () => {
      sideAInput.value = rec.values[0];
      sideBInput.value = rec.values[1];
      sideCInput.value = rec.values[2];
      calculateTriangle();
    });

    recDiv.appendChild(applyButton);
    recommendationsSection.appendChild(recDiv);
  });

  // Add the recommendations section after the result div
  resultDiv.parentNode.insertBefore(
    recommendationsSection,
    resultDiv.nextSibling
  );
}

function updateTriangleErrorWithRecommendations(lang) {
  resultDiv.textContent = translations.errors.triangleError[lang];

  // Update recommendation title and text if it exists
  const recommendationsSection = document.getElementById(
    "recommendations-section"
  );
  if (recommendationsSection) {
    const title = recommendationsSection.querySelector("h3");
    if (title) {
      title.textContent = translations.recommendations.title[lang];
    }

    // Update text for each recommendation
    const recDivs = recommendationsSection.querySelectorAll("div");
    if (recDivs.length === 4) {
      // Get stored values for calculations
      const sideA = sideAInput.originalValue;
      const sideB = sideBInput.originalValue;
      const sideC = sideCInput.originalValue;
      const avgSide =
        (parseFloat(sideA) + parseFloat(sideB) + parseFloat(sideC)) / 3;

      // Update text for each recommendation type
      recDivs[0].querySelector("span").textContent = `${
        translations.recommendations.equilateral[lang]
      } ${avgSide.toFixed(2)}`;

      recDivs[1].querySelector("span").textContent = `${
        translations.recommendations.isosceles[lang]
      } ${Math.max(sideA, sideB, sideC).toFixed(2)}`;

      recDivs[2].querySelector(
        "span"
      ).textContent = `${translations.recommendations.right[lang]} 3, 4, 5`;

      recDivs[3].querySelector("span").textContent = `${
        translations.recommendations.scalene[lang]
      } ${Math.max(sideA, sideB).toFixed(2)}, ${Math.min(sideA, sideB).toFixed(
        2
      )}, ${(Math.max(sideA, sideB) * 0.8).toFixed(2)}`;

      // Update all apply buttons
      const applyButtons = recommendationsSection.querySelectorAll(
        ".apply-recommendation"
      );
      applyButtons.forEach((button) => {
        button.textContent = translations.recommendations.applyButton[lang];
      });
    }
  }
}

calculateButton.addEventListener("click", calculateTriangle);

sideAInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    calculateTriangle();
  }
});

sideBInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    calculateTriangle();
  }
});

sideCInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    calculateTriangle();
  }
});
