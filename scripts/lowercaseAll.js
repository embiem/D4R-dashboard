let snapshot = require("../snapshot.json");

let lowercased = snapshot.map((addr) => addr.toLowerCase());

let fs = require("fs");

fs.writeFileSync("snapshot_lowercased.json", JSON.stringify(lowercased));
