import { env } from "../../../config/env.js";

export function buildProductUrl(
  productName: string,
  productNumber: string,
): string {
  const baseUrl = env.url;
  const cleanProductName = replaceIllegal(productName);

  return `${baseUrl}/${cleanProductName}/${productNumber}`;
}

interface SearchAndReplace {
  search: string;
  replace: string;
}

const illegalChars: SearchAndReplace[] = [
  { search: ",", replace: "" },
  { search: " ", replace: "-" },
];

function replaceIllegal(text: string) {
  let cleanName = text;
  illegalChars.forEach((element) => {
    cleanName = cleanName.replaceAll(element.search, element.replace);
  });

  return cleanName;
}
