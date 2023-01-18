import React from "react";
import { FilterValuesOpts } from "../../types";

type TagContentProps = {
  label: string;
  value: FilterValuesOpts;
};

const FilterTagContent = ({ label, value }: TagContentProps) => {
  const renderTagContent = () => {
    if (typeof value === "string") {
      return (
        <>
          <strong>{label}</strong> matches <strong>{value}</strong>
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
            <strong>{label}</strong> is between <strong>{min}</strong> and{" "}
            <strong>{max}</strong>
          </>
        );
      } else if (max)
        res = (
          <>
            <strong>{label}</strong> is lesser than <strong>{max}</strong>
          </>
        );
      else if (min)
        res = (
          <>
            <strong>{label}</strong> is greater than <strong>{min}</strong>
          </>
        );

      return res;
    }
  };

  return <span data-testid="filter-tag-content">{renderTagContent()}</span>;
};

export default FilterTagContent;
