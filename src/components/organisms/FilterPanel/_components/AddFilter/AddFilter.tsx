import React, { useCallback, useState, useMemo, useRef } from "react";
import { Table, Column } from "@tanstack/react-table";
import SingleSelectDropdown from "../../../../molecules/SingleSelectDropdown/SingleSelectDropdown";
import { DropdownOption } from "../../../../molecules/DropdownList/DropdownList";
import Popup from "../../../../molecules/Popup/Popup";
import Button, { buttonThemes } from "../../../../atoms/Button/Button";
import Container from "../../../../atoms/Container/Container";
import AddFilterButton from "../AddFilterButton/AddFilterButton";
import Filter from "../Filter/Filter";
import { useOnClickOutside } from "../../../../../hooks/useOnClickOutside";

import { AddFilterSteps, FilterValuesOpts } from "../../types";
import * as colors from "../../../../../constants/colors";

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
      <Container mt={24} display="flex" $alignItems="center" gap="16px">
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
  const filterRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(filterRef, () => setStep(0));

  const selectKey = useCallback((key: string) => {
    setKey(key);
    setStep(2);
  }, []);

  const displayedColumn = useMemo(
    () => columns.find((column) => column.id === key),
    [key, columns]
  );

  return (
    <Container display="inline-flex" ref={filterRef}>
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
