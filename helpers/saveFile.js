import fs from "fs";
const directory = "./db";
const fileName = "data.json";
const file = `${directory}/${fileName}`;
const saveDB = (data) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
  fs.writeFileSync(file, JSON.stringify(data));
};

const readDB = () => {
  if (!fs.existsSync(file)) {
    return null;
  }
  const info = fs.readFileSync(file, { encoding: "utf-8" });
  const data = JSON.parse(info);
  return data;
};

export { saveDB, readDB };
