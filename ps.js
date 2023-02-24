window.onload = function () {
  main();
};

const converter = {
  area: {
    name: "Area",
    units: {
      squareKm: "Square Kilometer",
      squareM: "Square Meter",
      squareMile: "Square Mile",
      squareYard: "Square Yard",
      squareFoot: "Square Foot",
    },
    variants: {
      "squareKm:squareM": {
        formula: "multiply the area value by 1e+6",
        calculation(n) {
          return n * 1e6;
        },
      },
      "squareKm:squareMile": {
        formula: "multiply the area value by 0.386102",
        calculation(n) {
          return n * 0.386102;
        },
      },
      "squareKm:squareYard": {
        formula: "multiply the area value by 1.196e+6",
        calculation(n) {
          return n * 1.196e6;
        },
      },
      "squareKm:squareFoot": {
        formula: "multiply the area value by 1.076e+7",
        calculation(n) {
          return n * 1.076e7;
        },
      },
      "squareM:squareKm": {
        formula: "divide the area value by 1e+6",
        calculation(n) {
          return n / 1e6;
        },
      },
      "squareM:squareMile": {
        formula: "multiply the area value by 3.861e-7",
        calculation(n) {
          return n * 3.861e-7;
        },
      },
      "squareM:squareYard": {
        formula: "multiply the area value by 1.196",
        calculation(n) {
          return n * 1.196;
        },
      },
      "squareM:squareFoot": {
        formula: "multiply the area value by 10.764",
        calculation(n) {
          return n * 10.764;
        },
      },
      "squareMile:squareKm": {
        formula: "multiply the area value by 2.59",
        calculation(n) {
          return n * 2.59;
        },
      },
      "squareMile:squareM": {
        formula: "multiply the area value by 2.59e+6",
        calculation(n) {
          return n * 2.59e6;
        },
      },
      "squareMile:squareYard": {
        formula: "multiply the area value by 3.098e+6",
        calculation(n) {
          return n * 3.098e6;
        },
      },
      "squareMile:squareFoot": {
        formula: "multiply the area value by 2.788e+7",
        calculation(n) {
          return n * 2.788e7;
        },
      },
      "squareYard:squareKm": {
        formula: "divide the area value by 1.196e+6",
        calculation(n) {
          return n / 1.196e6;
        },
      },
      "squareYard:squareM": {
        formula: "divide the area value by 1.196",
        calculation(n) {
          return n / 1.196;
        },
      },
      "squareYard:squareMile": {
        formula: "divide the area value by 3.098e+6",
        calculation(n) {
          return n / 3.098e6;
        },
      },
      "squareYard:squareFoot": {
        formula: "multiply the area value by 9",
        calculation(n) {
          return n * 9;
        },
      },
      "squareFoot:squareKm": {
        formula: "divide the area value by 1.076e+7",
        calculation(n) {
          return n / 1.076e7;
        },
      },
      "squareFoot:squareM": {
        formula: "divide the area value by 10.764",
        calculation(n) {
          return n / 10.764;
        },
      },
      "squareFoot:squareMile": {
        formula: "divide the area value by 2.788e+7",
        calculation(n) {
          return n / 2.788e7;
        },
      },
      "squareFoot:squareYard": {
        formula: "divide the area value by 9",
        calculation(n) {
          return n / 9;
        },
      },
    },
  },
  // mass: {
  //   name: "Mass",
  //   units: {
  //     tonne: "Tonne",
  //     kilogram: "Kilogram",
  //     gram: "Gram",
  //     milligram: "Milligram",
  //   },
  // },
  // length: {
  //   name: "Length",
  //   units: {
  //     kilometer: "Kilometer",
  //     meter: "Meter",
  //     centimeter: "Centimeter",
  //     millimeter: "Millimeter",
  //   },
  // },
  time: {
    name: "Time",
    units: {
      year: "Year",
      month: "Month",
      day: "Day",
      hour: "Hour",
    },

    variants: {
      "year:month": {
        formula: "multiply the time value by 12",
        calculation(n) {
          return n * 12;
        },
      },
      "year:day": {
        formula: "multiply the time value by 365",
        calculation(n) {
          return n * 365;
        },
      },
      "year:hour": {
        formula: "multiply the time value by 8760",
        calculation(n) {
          return n * 8760;
        },
      },
      "month:year": {
        formula: "divide the time value by 12",
        calculation(n) {
          return n / 12;
        },
      },
      "month:day": {
        formula: "multiply the time value by 30",
        calculation(n) {
          return n * 30;
        },
      },
      "month:hour": {
        formula: "multiply the time value by 730",
        calculation(n) {
          return n * 730;
        },
      },
      "day:year": {
        formula: "divide the time value by 365",
        calculation(n) {
          return n / 365;
        },
      },
      "day:month": {
        formula: "divide the time value by 30",
        calculation(n) {
          return n / 30;
        },
      },
      "day:hour": {
        formula: "multiply the time value by 24",
        calculation(n) {
          return n * 24;
        },
      },
      "hour:year": {
        formula: "divide the time value by 8760",
        calculation(n) {
          return n / 8760;
        },
      },
      "hour:month": {
        formula: "divide the time value by 730",
        calculation(n) {
          return n / 730;
        },
      },
      "hour:day": {
        formula: "divide the time value by 24",
        calculation(n) {
          return n / 24;
        },
      },
    },
  },
};

let lastLeftSelectedValue = "";
let lastRightSelectedValue = "";

function main() {
  const categorySelect = document.getElementById("select_category");
  const left_select = document.getElementById("left_unit");
  const right_select = document.getElementById("right_unit");
  const leftInput = document.getElementById("leftInput");
  const rightInput = document.getElementById("rightInput");
  const formula = document.getElementById("fmdetails");
  const convertKeys = Object.keys(converter).sort();

  // showing this in dom for 1 time on page load
  leftInput.value = 1;

  removeAllChild(categorySelect);

  convertKeys.forEach((key) => {
    addOption(categorySelect, { value: key, text: converter[key].name });
  });

  changeUnit(categorySelect, left_select, right_select);

  categorySelect.addEventListener("change", function () {
    changeUnit(categorySelect, left_select, right_select);
  });

  //left select onchange handler
  left_select.addEventListener("change", function (e) {
    const currentLeftValue = e.target.value;
    if (currentLeftValue === right_select.value) {
      right_select.value = lastLeftSelectedValue;
      lastRightSelectedValue = lastLeftSelectedValue;
    }
    lastLeftSelectedValue = currentLeftValue;
    calculateValue(categorySelect, left_select, right_select);
  });

  //right select onchange handler
  right_select.addEventListener("change", function (e) {
    const currentRightValue = e.target.value;
    if (currentRightValue === left_select.value) {
      left_select.value = lastRightSelectedValue;
      lastLeftSelectedValue = lastRightSelectedValue;
    }
    lastRightSelectedValue = currentRightValue;
    calculateValue(categorySelect, left_select, right_select);
  });

  leftInput.addEventListener("keyup", function (e) {
    if (e.target.value) {
      const converterName = categorySelect.value;
      const variantKey = `${left_select.value}:${right_select.value}`;
      const variants = converter[converterName].variants;
      const variant = variants[variantKey];
      formula.innerText = variant.formula;
      leftInput.value = e.target.value;
      rightInput.value = variant.calculation(leftInput.value);
    } else {
      rightInput.value = "";
    }
  });

  rightInput.addEventListener("keyup", function (e) {
    if (e.target.value) {
      const converterName = categorySelect.value;
      const variantKey = `${left_select.value}:${right_select.value}`;
      const variants = converter[converterName].variants;
      const variant = variants[variantKey];
      formula.innerText = variant.formula;
      rightInput.value = e.target.value;
      leftInput.value =
        variant.calculation(rightInput.value) /
        variant.calculation(1) /
        variant.calculation(1);
    } else {
      leftInput.value = "";
    }
  });
}

function addOption(parent, option) {
  const opt = document.createElement("option");
  opt.setAttribute("value", option.value);
  opt.innerText = option.text;

  parent.appendChild(opt);
}

function removeAllChild(parent) {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}

function changeUnit(categorySelect, left_select, right_select) {
  const converterValue = categorySelect.value;
  const units = converter[converterValue].units;

  removeAllChild(left_select);
  removeAllChild(right_select);
  const unit_options = Object.keys(units);
  unit_options.forEach((key) => {
    addOption(left_select, { value: key, text: units[key] });
    addOption(right_select, { value: key, text: units[key] });
  });
  right_select.getElementsByTagName("option")[1].selected = "selected";
  lastLeftSelectedValue = left_select.value;
  lastRightSelectedValue = right_select.value;
  calculateValue(categorySelect, left_select, right_select);
}

function calculateValue(categorySelect, left_select, right_select) {
  const formula = document.getElementById("fmdetails");
  const leftInput = document.getElementById("leftInput");
  const rightInput = document.getElementById("rightInput");
  const converterName = categorySelect.value;
  const variantKey = `${left_select.value}:${right_select.value}`;
  const variants = converter[converterName].variants;
  const variant = variants[variantKey];
  formula.innerText = variant.formula;
  rightInput.value = variant.calculation(leftInput.value);
}
