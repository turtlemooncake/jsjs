import fs from "node:fs";

function readFile(filename) {
  try {
    const data = fs.readFileSync(filename, { encoding: "utf-8" });
    const stripped = data.replace(/\s/g, ""); // remove whitespace stuff first. ok to change the key names for this
    return stripped;
  } catch (error) {
    console.error(error);
    return "";
  }
}

function convertToJSONObject(jsonString) {
  let idx = 0;

  const ans = converter();
  return ans;

  function converter() {
    switch (jsonString[idx]) {
      case '"':
        return convertString();
      case "{":
        return convertObject();
      case "[":
        return convertArray();
      case "t":
      case "f":
      case "n":
        return convertLiteral();
      default:
        return convertNumber();
    }
  }

  function convertString() {
    let res = "";
    idx++;

    while (idx < jsonString.length && jsonString[idx] !== '"') {
      res += jsonString[idx];
      idx++;
    }

    idx++;
    return res;
  }

  function convertObject() {
    idx++;
    let res = {};

    while (idx < jsonString.length && jsonString[idx] !== "}") {
      const key = convertString();

      skipForChar(jsonString[idx]);

      const value = converter();

      res[key] = value;
      if (jsonString[idx] === ",") {
        idx++;
      }
    }

    idx++;
    return res;
  }

  function convertArray() {
    idx++;
    const res = [];

    while (idx < jsonString.length && jsonString[idx] !== "]") {
      const value = converter();
      res.push(value);

      if (jsonString[idx] === ",") {
        idx++;
      }
    }

    idx++;
    return res;
  }

  function convertLiteral() {
    if (jsonString.startsWith("true", idx)) {
      idx += 4;
      return true;
    } else if (jsonString.startsWith("false", idx)) {
      idx += 5;
      return false;
    } else if (jsonString.startsWith("null", idx)) {
      idx += 4;
      return null;
    }

    throw new Error(`Unexpected token at ${idx}`);
  }

  function convertNumber() {
    let start = idx;

    if (jsonString[idx] === "-") {
      idx++;
    }

    while (idx < jsonString.length && isDigitOrDot(jsonString[idx])) {
      idx++;
    }

    return Number(jsonString.slice(start, idx));
  }

  function isDigitOrDot(char) {
    return (char >= "0" && char <= "9") || char === ".";
  }

  function skipForChar(char) {
    if (char !== ":") {
      throw new Error(`Expected : but found ${char} at index ${idx}`);
    }
    idx++;
  }
}

function main() {
  const str = readFile("example.json");
  console.log(str);
  const json = convertToJSONObject(str);
  console.log(json);
}

main();
