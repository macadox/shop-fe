import React, {
  useCallback,
  useRef,
  useState,
  useMemo,
  useEffect,
} from "react";
import { Table, Column } from "@tanstack/react-table";
import { AddFilterSteps } from "../../organisms/FilterPanel/FilterPanel";
import SingleSelectDropdown from "../SingleSelectDropdown/SingleSelectDropdown";
import Button, { buttonThemes } from "../../atoms/Button/Button";
import Container from "../../atoms/Container/Container";
import Input from "../../atoms/Input/Input";
import Popup from "../../molecules/Popup/Popup";
import AddFilterButton from "./AddFilterButton";

import * as colors from "../../../constants/colors";
import { DropdownOption } from "../DropdownList/DropdownList";

export type FilterValuesOpts =
  | string
  | [number | null, number | null]
  | undefined;

type FilterTypeProps = {
  setLocalValue: React.Dispatch<React.SetStateAction<FilterValuesOpts>>;
  initialValue?: FilterValuesOpts;
};

const FilterRange = ({ setLocalValue, initialValue }: FilterTypeProps) => {
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
        onChange={() =>
          setLocalValue((old: FilterValuesOpts) => {
            const inputValue = minRef?.current?.value;
            // Initiate values
            if (typeof old === "string" || typeof old === "undefined") {
              return [inputValue ? Number(inputValue) : null, null];
            }
            // Return old values
            if (Number(inputValue) >= Number(old?.[1])) {
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

const FilterText = ({ setLocalValue, initialValue }: FilterTypeProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      console.log("i set the value to ", initialValue || "");
      inputRef.current.value = (initialValue || "") as string;
    }
  }, [initialValue]);

  return (
    <Input
      placeholder="Type and press enter"
      type="text"
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

  const FilterComp = typeof firstValue === "number" ? FilterRange : FilterText;

  return (
    <FilterComp
      setLocalValue={setLocalValue}
      initialValue={columnFilterValue}
    />
  );
};

type AddValuePopupProps<T> = {
  table: Table<T>;
  column?: Column<T, unknown>;
  setStep: (step: AddFilterSteps) => void;
};

const AddValuePopup = <T,>({
  setStep,
  table,
  column,
}: AddValuePopupProps<T>) => {
  const [localValue, setLocalValue] = useState<FilterValuesOpts>(
    column?.getFilterValue() as FilterValuesOpts
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (localValue) {
        column?.setFilterValue(localValue);
        setStep(0);
      }
    },
    [localValue, setStep, column]
  );

  return (
    <Container
      p={16}
      background={colors.WHITE}
      boxShadow={`0px 4px 12px 0px ${colors.SHADOW}`}
      width="320px"
      as="form"
      onSubmit={handleSubmit}
    >
      <Filter column={column} table={table} setLocalValue={setLocalValue} />
      <Container mt={24} display="flex" alignItems="center" gap="16px">
        <Container flexBasis="33%">
          <Button
            width="100%"
            theme={buttonThemes.transparent}
            text="Cancel"
            onClick={() => setStep(0)}
            type="button"
          />
        </Container>
        <Container flexBasis="67%">
          <Button
            width="100%"
            theme={buttonThemes.default}
            text="Submit"
            type="submit"
          />
        </Container>
      </Container>
    </Container>
  );
};

type AddKeyPopupProps<T> = {
  table: Table<T>;
  column?: Column<T, unknown>;
  filterKeys: { id: string; value: string }[];
  step: AddFilterSteps;
  setStep: (val: AddFilterSteps) => void;
  selectKey: (val: string) => void;
};

const AddKeyPopup = <T,>({
  table,
  column,
  setStep,
  step,
  selectKey,
  filterKeys,
}: AddKeyPopupProps<T>) => {
  const CustomCombobox = useCallback(
    (props: any) => <AddFilterButton setStep={setStep} {...props} />,
    [setStep]
  );

  const handleSelectCallback = useCallback(
    (option: DropdownOption | null) => option && selectKey(option.id),
    [selectKey]
  );

  return (
    <Popup
      TriggerComponent={
        <Container>
          <SingleSelectDropdown
            dropdownId="add-filter-key"
            options={filterKeys}
            handleSelectCallback={handleSelectCallback}
            CustomCombobox={CustomCombobox}
            overrideIsExpanded={step > 0}
            resetStateAfterClose={true}
          />
        </Container>
      }
      PoppedComponent={
        <AddValuePopup table={table} column={column} setStep={setStep} />
      }
      isOpen={step > 1}
      placement="right"
      paddingAlt={40}
    />
  );
};

type AddFilterProps<T> = {
  table: Table<T>;
  columns: Column<T, unknown>[];
  filterKeys: { id: string; value: string }[];
};

const AddFilter = <T,>({ table, columns, filterKeys }: AddFilterProps<T>) => {
  const [step, setStep] = useState<AddFilterSteps>(0);
  const [key, setKey] = useState<string | null>(null);

  const selectKey = useCallback((key: string) => {
    setKey(key);
    setStep(2);
  }, []);

  const displayedColumn = useMemo(
    () => columns.find((column) => column.id === key),
    [key, columns]
  );

  return (
    <Container display="inline-flex">
      <AddKeyPopup
        table={table}
        column={displayedColumn}
        filterKeys={filterKeys}
        step={step}
        setStep={setStep}
        selectKey={selectKey}
      />
    </Container>
  );
};

export default AddFilter;
