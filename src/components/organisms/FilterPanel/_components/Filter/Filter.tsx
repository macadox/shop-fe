import React, { useRef, useEffect } from "react";
import { Table, Column } from "@tanstack/react-table";
import Container from "../../../../atoms/Container/Container";
import Input from "../../../../atoms/Input/Input";
import { FilterValuesOpts } from "../../types";
import { getColumnHeaderText } from "../../utils";

type FilterTypeProps = {
  setLocalValue: React.Dispatch<React.SetStateAction<FilterValuesOpts>>;
  initialValue?: FilterValuesOpts;
  label?: string;
};

export const FilterRange = ({
  setLocalValue,
  initialValue,
  label,
}: FilterTypeProps) => {
  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialValue) {
      const [min, max] = initialValue as [number | null, number | null];

      if (minRef.current) {
        minRef.current.value = min ? min.toString() : "";
      }

      if (maxRef.current) {
        maxRef.current.value = !max ? "" : max.toString();
      }
    }
  }, [initialValue]);

  return (
    <Container display="flex" gap="12px">
      <Input
        placeholder="min"
        type="number"
        innerRef={minRef}
        aria-label={`filter minimum ${label}`}
        onChange={() =>
          setLocalValue((old: FilterValuesOpts) => {
            const inputValue = minRef?.current?.value;
            // Initiate values
            if (typeof old === "string" || typeof old === "undefined") {
              return [inputValue ? Number(inputValue) : null, null];
            }
            // Return old values
            if (old?.[1] && Number(inputValue) >= Number(old?.[1])) {
              return [old?.[0], old?.[1]];
            }
            // Return new values
            return [inputValue ? Number(inputValue) : null, old?.[1]];
          })
        }
      />
      <Input
        placeholder="max"
        type="number"
        innerRef={maxRef}
        aria-label={`filter maximum ${label}`}
        onChange={() =>
          setLocalValue((old: FilterValuesOpts) => {
            const inputValue = maxRef?.current?.value;
            // Initiate values
            if (typeof old === "string" || typeof old === "undefined") {
              return [null, inputValue ? Number(inputValue) : null];
            }
            // Return old values
            if (Number(inputValue) <= Number(old?.[0])) {
              return [old?.[0], old?.[1]];
            }
            // Return new values
            return [old?.[0], inputValue ? Number(inputValue) : null];
          })
        }
      />
    </Container>
  );
};

export const FilterText = ({
  setLocalValue,
  initialValue,
  label,
}: FilterTypeProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = (initialValue || "") as string;
    }
  }, [initialValue]);

  return (
    <Input
      placeholder="Type and press enter"
      type="text"
      aria-label={`filter ${label}`}
      innerRef={inputRef}
      onChange={() => setLocalValue(inputRef.current?.value.trim())}
    />
  );
};

type FilterProps<T> = {
  table: Table<T>;
  column?: Column<T, unknown>;
  setLocalValue: React.Dispatch<React.SetStateAction<FilterValuesOpts>>;
};

const Filter = <T,>({ column, table, setLocalValue }: FilterProps<T>) => {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column?.id || "");

  const columnFilterValue = column?.getFilterValue() as FilterValuesOpts;

  const columnHeader = column && getColumnHeaderText(column);

  const FilterComp = typeof firstValue === "number" ? FilterRange : FilterText;

  return (
    <FilterComp
      setLocalValue={setLocalValue}
      initialValue={columnFilterValue}
      label={columnHeader}
    />
  );
};

export default Filter;
