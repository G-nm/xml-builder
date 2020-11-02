//101833 Mwaniki George Ng'ang'a - ICS 4A
const { create, convert } = require("xmlbuilder2");

const obj = {
  note: {
    from: "Jani",
    to: "Tove",
    message: "Remember me this weekend",
  },
};

const doc = create(obj);
const xml = doc.end({ prettyPrint: true });
console.log(xml);

//Deserialization of the same xml
console.log("JAVASCRIPT OBJECT");
const xmldeserialized = convert(xml, { format: "object" });
console.log(xmldeserialized);
