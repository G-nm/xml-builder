const convert = require("xml-js");

const obj = {
  _declaration: { _attributes: { version: "1.0", encoding: "utf-8" } },
  note: { from: "Jani", to: "Tove", message: "Remember me this weekend" },
};

function deserializexmldata(xmlData) {
  const jsobject = convert.xml2js(xmlData, { compact: true });
  return jsobject;
}

function serializexmldata(obj) {
  const xml = convert.js2xml(obj, { compact: true, spaces: 4 });
  return xml;
}

let xmlData = serializexmldata(obj);
console.log(`XML Data -->\n`, xmlData);

let jsobject = deserializexmldata(xmlData);
console.log(`Javascript Object -->\n`, jsobject);
