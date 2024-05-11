import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { capitalizeFirstletter } from "../utils";
import { createDeveloperIcon } from "../createDeveloperIcon";
import { iconsData } from "../iconsData";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const svgDir = path.join(__dirname, "../../");

let exportStatement = "";

iconsData.forEach((icon) => {
  //create exportable icon components
  const iconContent = fs.readFileSync(path.join(svgDir, icon.path), "utf-8");
  const rawIconName = icon.name
    .replace(/#/g, "-sharp")
    .replace(/\+/g, "-plus")
    .split(/[-. ]+/)
    .map((item) => capitalizeFirstletter(item))
    .join("");
  const iconName = rawIconName.includes("Wordmark")
    ? rawIconName
    : `${rawIconName}Icon`;

  const component = createDeveloperIcon(
    iconName,
    iconContent,
    path.join(svgDir, icon.path)
  );
  fs.writeFileSync(
    path.join(__dirname, "../icons", `${iconName}.tsx`),
    component
  );

  exportStatement += `export * from './${iconName}.tsx';`;
});
fs.writeFileSync(path.join(__dirname, "../icons/index.ts"), exportStatement);
