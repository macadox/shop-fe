import React, { useMemo, useState, useRef, useCallback } from "react";
import { Table, Column } from "@tanstack/react-table";
import Container from "../../atoms/Container/Container";
import Tag from "../../atoms/Tag/Tag";
import TextBody from "../../atoms/TextBody/TextBody";
import AddFilter, {
  FilterValuesOpts,
} from "../../molecules/AddFilter/AddFilter";
import { getColumnHeaderText } from "./utils";

type TagContentProps = {
  label: string;
  value: FilterValuesOpts;
};

const TagContent = ({ label, value }: TagContentProps) => {
  if (!value) return null;

  if (typeof value === "string") {
    return (
      <>
        <strong>{label}</strong> is <strong>{value}</strong>
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

  return <TextBody>Tag</TextBody>;
};

export type AddFilterSteps = 0 | 1 | 2;

type Props<T> = {
  table: Table<T>;
};

const FilterPanel = <T,>({ table }: Props<T>) => {
  const filterableColumns = useMemo(
    () => table.getAllColumns().filter((column) => column.getCanFilter()),
    [table]
  );

  const filteredColumns = table
    .getAllColumns()
    .filter((column) => column.getIsFiltered());

  const filterOptions = useMemo(
    () =>
      filterableColumns.map((column) => ({
        id: column.id,
        value: getColumnHeaderText(column),
      })),
    [filterableColumns]
  );

  return (
    <Container>
      <Container display="flex" gap="8px">
        {filteredColumns.map((column) => (
          <Tag
            key={column.id}
            content={
              <TagContent
                label={getColumnHeaderText(column)}
                value={column.getFilterValue() as FilterValuesOpts}
              />
            }
            onClear={() => column.setFilterValue(undefined)}
          />
        ))}
      </Container>
      <AddFilter
        table={table}
        columns={filterableColumns}
        filterKeys={filterOptions}
      />
    </Container>
  );
};

export default FilterPanel;
