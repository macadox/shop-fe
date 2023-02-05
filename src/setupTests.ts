import "@testing-library/jest-dom";
import engTranslation from "../public/locales/en/translation.json";
import engHome from "../public/locales/en/home.json";
import engProduct from "../public/locales/en/product.json";

type Namespace = "translation" | "product" | "home";

const nameSpaceMap: Record<Namespace, any> = {
  translation: engTranslation,
  home: engHome,
  product: engProduct,
};

jest.mock("react-i18next", () => ({
  useTranslation: (ns?: Namespace | Namespace[]) => {
    if (!ns) {
      return {
        t: (val: keyof typeof engTranslation) => engTranslation[val] || val,
      };
    }

    if (typeof ns === "string") {
      return {
        t: (val: any) => nameSpaceMap[ns][val],
      };
    }

    // If we are left with array of strings, try to match values for namespaces from left to right
    return {
      t: (val: any) => {
        for (let i = 0; i < ns.length; i++) {
          const currentNs = ns[i];
          if (nameSpaceMap[currentNs][val]) {
            return nameSpaceMap[currentNs][val];
          }
        }

        return val;
      },
    };
  },
}));
