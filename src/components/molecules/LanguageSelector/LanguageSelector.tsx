import React, { useCallback, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import Container from "../../atoms/Container/Container";
import SingleSelectDropdown from "../SingleSelectDropdown/SingleSelectDropdown";
import { StyledSelectButton } from "./LanguageSelector.style";

import type { ComboboxProps } from "../SingleSelectDropdown/SingleSelectDropdown";
import { DropdownOption } from "../DropdownList/DropdownList";

import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import * as colors from "../../../constants/colors";
import { ReactComponent as GlobeIcon } from "../../../assets/icons/globe.svg";

const LanguageButton = ({
  onClickHandler,
  isExpanded,
  ariaControls,
  ariaActiveDescendant,
  handleClick,
  handleKeyDown,
  innerRef,
}: { onClickHandler: () => void } & ComboboxProps) => {
  return (
    <StyledSelectButton
      role="combobox"
      aria-expanded={isExpanded}
      aria-controls={ariaControls}
      aria-activedescendant={
        isExpanded && ariaActiveDescendant ? ariaActiveDescendant : undefined
      }
      aria-haspopup="listbox"
      tabIndex={0}
      onClick={() => {
        onClickHandler();
        handleClick();
      }}
      onKeyDownCapture={handleKeyDown}
      ref={innerRef}
      aria-label="Choose language"
    >
      <GlobeIcon stroke={colors.BLACK} width={24} height={24} />
    </StyledSelectButton>
  );
};

const languages = [
  { id: "en", value: "English" },
  { id: "de", value: "Deutsch" },
  { id: "pl", value: "Polski" },
];

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const triggerButtonRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(triggerButtonRef, () => setIsOpen(false));

  const onClickLanguageChange = useCallback(
    (option: DropdownOption | null) => {
      option && i18n.changeLanguage(option.id);
      setIsOpen(false);
    },
    [i18n]
  );

  const CustomCombobox = useCallback(
    (props: any) => (
      <Container ref={triggerButtonRef}>
        <LanguageButton
          onClickHandler={() => setIsOpen((prev) => !prev)}
          {...props}
        />
      </Container>
    ),
    []
  );

  return (
    <SingleSelectDropdown
      dropdownId="add-filter-key"
      options={languages}
      handleSelectCallback={onClickLanguageChange}
      CustomCombobox={CustomCombobox}
      overrideIsExpanded={isOpen}
    />
  );
};

export default LanguageSelector;
