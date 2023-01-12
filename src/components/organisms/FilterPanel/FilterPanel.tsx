import React, { useMemo, useState, useRef, useCallback } from "react";
import { Table as ReactTableInterface } from "@tanstack/react-table";
import { FilterFuncs } from "../../templates/List/List";
import Button, { buttonThemes } from "../../atoms/Button/Button";
import Container from "../../atoms/Container/Container";
import Tag from "../../atoms/Tag/Tag";
import Input from "../../atoms/Input/Input";
import Popup from "../../molecules/Popup/Popup";
import SingleSelectDropdown, {
  ComboboxProps,
} from "../../molecules/SingleSelectDropdown/SingleSelectDropdown";

import { ReactComponent as CircleAdd } from "../../../assets/icons/add-circle.svg";
import * as colors from "../../../constants/colors";

const filterDropdownValues = [
  { id: "equals", value: "is" },
  { id: "includesString", value: "matches" },
];

type AddFilterSteps = 0 | 1 | 2;

type AddFilterButtonProps = {
  setStep: (val: AddFilterSteps) => void;
};

const AddFilterButton = ({
  setStep,
  isExpanded,
  ariaControls,
  ariaActiveDescendant,
  ariaLabelledBy,
  handleClick,
  handleKeyDown,
  innerRef,
}: AddFilterButtonProps & ComboboxProps) => (
  <Container
    ref={innerRef}
    onClick={() => {
      setStep(1);
      handleClick();
    }}
    onKeyDownCapture={handleKeyDown}
    tabIndex={0}
    role="combobox"
    aria-expanded={isExpanded}
    aria-controls={ariaControls}
    aria-activedescendant={
      isExpanded && ariaActiveDescendant ? ariaActiveDescendant : undefined
    }
    aria-haspopup="listbox"
    aria-labelledby={ariaLabelledBy}
  >
    <Button
      theme={buttonThemes.light}
      icon={<CircleAdd stroke={colors.GRAY} height="18px" width="18px" />}
      hasStroke={true}
      text="Add Filter"
      as="div"
    />
  </Container>
);

type AddValuePopupProps = {
  onSubmit: (value: string) => void;
};

const AddValuePopup = ({ onSubmit }: AddValuePopupProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(() => {
    const value = inputRef.current?.value.trim();

    if (value) {
      onSubmit(value);
    }
  }, [onSubmit]);

  return (
    <Container
      p={16}
      background={colors.WHITE}
      boxShadow={`0px 4px 12px 0px ${colors.SHADOW}`}
      width="320px"
    >
      <Container display="flex" gap="16px">
        <Container flexBasis="33%">
          <SingleSelectDropdown
            dropdownId="add-filter-value"
            options={filterDropdownValues}
            handleSelectCallback={(option) => option && console.log("")}
            initialSelectedId={FilterFuncs.equals}
          />
        </Container>
        <Container flexBasis="67%">
          <Input innerRef={inputRef} />
        </Container>
      </Container>
      <Container mt={24} display="flex" alignItems="center" gap="16px">
        <Container flexBasis="33%">
          <Button width="100%" theme={buttonThemes.transparent} text="Cancel" />
        </Container>
        <Container flexBasis="67%">
          <Button
            width="100%"
            theme={buttonThemes.default}
            text="Submit"
            onClick={handleSubmit}
          />
        </Container>
      </Container>
    </Container>
  );
};

type AddKeyPopupProps = {
  filterKeys: { id: string; value: string }[];
  step: AddFilterSteps;
  setStep: (val: AddFilterSteps) => void;
  selectKey: (val: string) => void;
  onSubmit: (value: string) => void;
};

const AddKeyPopup = ({
  setStep,
  step,
  selectKey,
  onSubmit,
  filterKeys,
}: AddKeyPopupProps) => (
  <Popup
    TriggerComponent={
      <Container>
        <SingleSelectDropdown
          dropdownId="add-filter-key"
          options={filterKeys}
          handleSelectCallback={(option) => option && selectKey(option.id)}
          overrideIsExpanded={step > 0}
          comboboxType="button"
        />
      </Container>
    }
    PoppedComponent={<AddValuePopup onSubmit={onSubmit} />}
    isOpen={step > 1}
    placement="right"
    paddingAlt={40}
  />
);

type AddFilterProps = {
  filterKeys: { id: string; value: string }[];
  onApplyFilter: (key: string, value: string) => void;
};

const AddFilter = ({ filterKeys, onApplyFilter }: AddFilterProps) => {
  const [step, setStep] = useState<AddFilterSteps>(0);
  const [key, setKey] = useState<string | null>(null);

  const selectKey = (key: string) => {
    setKey(key);
    setStep(2);
  };

  console.log(step);

  const onSubmit = useCallback(
    (value: string) => {
      console.log(key, value);
      if (key && value) {
        onApplyFilter(key, value);
        setStep(0);
        setKey(null);
      }
    },
    [key, onApplyFilter]
  );

  return (
    <Container display="inline-flex">
      <AddKeyPopup
        filterKeys={filterKeys}
        step={step}
        setStep={setStep}
        selectKey={selectKey}
        onSubmit={onSubmit}
      />
    </Container>
  );
};

type Props<T> = {
  table: ReactTableInterface<T>;
};

const FilterPanel = <T,>({ table }: Props<T>) => {
  const filterableColumns = useMemo(() => {
    return table.getAllColumns().filter((column) => column.getCanFilter());
  }, [table]);

  const filterOptions = useMemo(
    () =>
      filterableColumns.map((column) => ({ id: column.id, value: column.id })),
    [filterableColumns]
  );

  const applyFilter = useCallback(
    (key: string, value: string) => {
      table.setColumnFilters((prev) => [...prev, { id: key, value }]);
    },
    [table]
  );

  return (
    <Container>
      <Container></Container>
      <Container ml="200px">
        <AddFilter filterKeys={filterOptions} onApplyFilter={applyFilter} />
      </Container>
    </Container>
  );
};

export default FilterPanel;
