import numeral from "numeral";
const { validationResult } = require("express-validator");
var normalizeEmail = require("normalize-email");
var validateEmail = require("email-validator");

let exports = {};

exports.formatEIN = (ein) => {
  ein = new String(ein);
  if (ein.length === 9) {
    ein = ein.substring(0, 2) + "-" + ein.substring(2, 9);
  }
  return ein;
};

exports.formatDollars = (amt) => {
  let formattedString = "";
  if (amt > 1000000000) formattedString = `${numeral(amt / 1000000000).format("$#,#.#")} billion`;
  if (amt > 1000000 && amt < 1000000000) formattedString = `${numeral(amt / 1000000).format("$#,#.#")} million`;
  if (amt > 1000 && amt < 1000000) formattedString = `${numeral(amt / 1000).format("$#,#.#")}k`;
  if (amt > 0 && amt < 1000) formattedString = amt;
  if (amt === 0 || amt === null) formattedString = `None Listed`;

  return formattedString;
};

exports.formatNumbers = (amt) => {
  let formattedString = "";
  if (amt > 1000000000) formattedString = `${numeral(amt / 1000000000).format("#,#.#")} billion`;
  if (amt > 1000000 && amt < 1000000000) formattedString = `${numeral(amt / 1000000).format("#,#.#")} million`;
  if (amt > 1000 && amt < 1000000) formattedString = `${numeral(amt / 1000).format("#,#.#")}k`;
  if (amt > 0 && amt < 1000) formattedString = amt;
  if (amt === 0 || amt === null) formattedString = `None Listed`;

  return formattedString;
};

exports.formatPhoneNumber = (str) => {
  if (str === "xxxxxxxxxx") {
    return "X (XXX) XXX-XXXX";
  } else {
    //Filter only numbers from the input
    let cleaned = ("" + str).replace(/\D/g, "");

    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
  }

  return null;
};

exports.formatAddress = (address) => {
  let street = address.street1;
  if (address.street2) street += " " + address.street2;

  let addy = `${street} ${address.city}, ${address.state} ${address.zip}`;
  return addy;
};

exports.toTitleCase = (str) => {
  if (str) {
    const adjustCasing = (str) => {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };

    let adjustedString = adjustCasing(str);

    //Replace common All Caps terms
    adjustedString = adjustedString.replace("Vp", "VP");
    adjustedString = adjustedString.replace("Ceo", "CEO");
    adjustedString = adjustedString.replace("Cfo", "CFO");
    // adjustedString = adjustedString.replace("Coo", "COO");
    adjustedString = adjustedString.replace("Pllc", "PLLC");
    adjustedString = adjustedString.replace("Cpa", "CPA");
    adjustedString = adjustedString.replace("Cfa", "CFA");
    adjustedString = adjustedString.replace("Cfp", "CFP");
    adjustedString = adjustedString.replace("Mba", "MBA");
    adjustedString = adjustedString.replace("Llc", "LLC");
    adjustedString = adjustedString.replace("Llp", "LLP");
    adjustedString = adjustedString.replace("Usa", "USA");

    return adjustedString;
  } else {
    return "";
  }
};

exports.stateNames = {
  US: "United States",
  AL: "Alabama",
  AK: "Alaska",
  // AS: "American Samoa",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  DC: "District Of Columbia",
  // FM: "Federated States Of Micronesia",
  FL: "Florida",
  GA: "Georgia",
  // GU: "Guam",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  // MH: "Marshall Islands",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  // MP: "Northern Mariana Islands",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  // PW: "Palau",
  PA: "Pennsylvania",
  PR: "Puerto Rico",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  // VI: "Virgin Islands",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

exports.validateAndNormalizeEmail = (string) => {
  if (validateEmail.validate(string)) {
    return normalizeEmail(string);
  } else {
    return false;
  }
};

exports.checkPasswordValidity = (password1, password2) => {
  if (password1 !== password2) {
    return { passwordValid: false, errMsg: "Passwords do not match" };
  } else if (password1.length < 7) {
    return { passwordValid: false, errMsg: "Password must be atleast 7 characters" };
  } else {
    return { passwordValid: true, errMsg: null };
  }
};

export default exports;
