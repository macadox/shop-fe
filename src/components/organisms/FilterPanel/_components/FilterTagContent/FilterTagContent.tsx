import React from "react";
import { useTranslation } from "react-i18next";
import { FilterValuesOpts } from "../../types";

type TagContentProps = {
  label: string;
  value: FilterValuesOpts;
};

const FilterTagContent = ({ label, value }: TagContentProps) => {
  const { t } = useTranslation();

  const renderTagContent = () => {
    if (typeof value === "string") {
      return (
        <>
          <strong>{label}</strong> {t("filterMatches")} <strong>{value}</strong>
        </>
      );
    }

    if (value instanceof Array && value.length === 2) {
      const min = value?.[0];
      const max = value?.[1];
      let res = null;

      if (min && max) {
        res = (
          <>
            <strong>{label}</strong> {t("filterIsBetween")}{" "}
            <strong>{min}</strong> {t("filterAnd")} <strong>{max}</strong>
          </>
        );
      } else if (max)
        res = (
          <>
            <strong>{label}</strong> {t("filterIsLesser")}{" "}
            <strong>{max}</strong>
          </>
        );
      else if (min)
        res = (
          <>
            <strong>{label}</strong> {t("filterIsGreater")}{" "}
            <strong>{min}</strong>
          </>
        );

      return res;
    }
  };

  return <span data-testid="filter-tag-content">{renderTagContent()}</span>;
};

export default FilterTagContent;
