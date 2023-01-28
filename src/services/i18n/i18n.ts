import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";

// eslint-disable-next-line import/no-named-as-default-member
i18next
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    lng: "en",
    defaultNS: "translation",
    backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" },
  });

export default i18next;
