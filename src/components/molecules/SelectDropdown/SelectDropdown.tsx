import React, {
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
  useMemo,
} from "react";
import Container from "../../atoms/Container/Container";
import TextBody from "../../atoms/TextBody/TextBody";
import DefaultBox from "../../atoms/DefaultBox/DefaultBox";
import { StyledList, StyledListItem } from "./SelectDropdown.style";

import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { handleRotate } from "../../../utils/styleUtils";
import * as colors from "../../../constants/colors";
import { KeyboardCodes } from "../../../constants/events";
import { ReactComponent as CaretDown } from "../../../assets/icons/caret-down.svg";

type ComboboxProps = {
  isExpanded: boolean;
  ariaControls: string;
  ariaLabelledBy: string;
  ariaActiveDescendant: string | null;
  selectedItem: DropdownOption | null;
  defaultPlaceholder: string;
  innerRef: React.RefObject<HTMLDivElement>;
  handleClick?: () => void;
  handleKeyDown?: (e: React.KeyboardEvent) => void;
};

const Combobox = ({
  isExpanded,
  ariaControls,
  ariaLabelledBy,
  ariaActiveDescendant,
  selectedItem,
  defaultPlaceholder,
  innerRef,
  handleClick,
  handleKeyDown,
}: ComboboxProps) => {
  const hasItem = !!selectedItem;

  return (
    <DefaultBox
      role="combobox"
      aria-expanded={isExpanded}
      aria-controls={ariaControls}
      aria-activedescendant={
        isExpanded && ariaActiveDescendant ? ariaActiveDescendant : undefined
      }
      aria-haspopup="listbox"
      aria-labelledby={ariaLabelledBy}
      hasFocus={isExpanded}
      as="div"
      tabIndex={0}
      onClick={handleClick}
      onKeyDownCapture={handleKeyDown}
      ref={innerRef}
    >
      <Container cursor="pointer" display="flex" justifyContent="space-between">
        <TextBody {...(!hasItem && { opacity: 0.5 })}>
          {hasItem ? selectedItem.value : defaultPlaceholder}
        </TextBody>
        <Container>
          <CaretDown
            transform={`${handleRotate(isExpanded ? 180 : 0)}`}
            style={{ marginBottom: `${isExpanded ? 2 : 0}px` }}
            fill={colors.BLACK}
            data-testid="caret-svg"
          />
        </Container>
      </Container>
    </DefaultBox>
  );
};

type DropdownOption = {
  id: string;
  value: string;
};

type Props = {
  options: DropdownOption[];
  handleSelectCallback: (option: DropdownOption | null) => void;
  initialOptionId?: string;
  defaultPlaceholder?: string;
  dropdownId: string;
};

const SelectDropdown = ({
  options,
  handleSelectCallback,
  initialOptionId,
  defaultPlaceholder = "Select Item",
  dropdownId,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(
    initialOptionId ?? null
  );
  const selectedOption = useMemo<DropdownOption | null>(
    () => options.find((option) => option.id === selectedId) || null,
    [selectedId, options]
  );

  const closeDropdown = () => setIsExpanded(false);
  const toggleDropdown = () => setIsExpanded((prev) => !prev);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const comboboxRef = useRef<HTMLDivElement>(null);
  const firstUpdateRef = useRef(true);

  useOnClickOutside(dropdownRef, () => {
    setIsExpanded(false);
  });

  const selectOption = (id: string) => setSelectedId(id);

  const focusCombobox = () => comboboxRef.current?.focus();

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const currentOptionIndex = options.findIndex(
        (option) => option.id === selectedId
      );

      switch (e.code) {
        case KeyboardCodes.Enter:
        case KeyboardCodes.Space: {
          toggleDropdown();
          break;
        }
        case KeyboardCodes.Escape: {
          closeDropdown();
          break;
        }
        case KeyboardCodes.Home: {
          selectOption(options[0].id);
          break;
        }
        case KeyboardCodes.End: {
          selectOption(options[options.length - 1].id);
          break;
        }
        case KeyboardCodes.ArrowUp:
        case KeyboardCodes.ArrowLeft: {
          const prevOptionIndex = Math.max(0, currentOptionIndex - 1);
          selectOption(options[prevOptionIndex].id);
          break;
        }
        case KeyboardCodes.ArrowDown:
        case KeyboardCodes.ArrowRight: {
          const nextOptionIndex = Math.min(
            options.length - 1,
            currentOptionIndex + 1
          );
          selectOption(options[nextOptionIndex].id);
          break;
        }
      }
    },
    [options, selectedId]
  );

  const handleClick = (optionId: string) => {
    selectOption(optionId);
    closeDropdown();
    focusCombobox();
  };

  useLayoutEffect(() => {
    if (firstUpdateRef.current) {
      firstUpdateRef.current = false;
      return;
    }

    handleSelectCallback(selectedOption);
  }, [selectedOption, handleSelectCallback]);

  return (
    <Container ref={dropdownRef} position="relative">
      <Combobox
        isExpanded={isExpanded}
        ariaControls={`${dropdownId}--listbox`}
        ariaLabelledBy={`${dropdownId}--label`}
        ariaActiveDescendant={selectedId}
        selectedItem={selectedOption}
        defaultPlaceholder={defaultPlaceholder}
        innerRef={comboboxRef}
        handleClick={toggleDropdown}
        handleKeyDown={handleKeyDown}
      />
      {isExpanded && (
        <StyledList
          role="listbox"
          id={`${dropdownId}--listbox`}
          aria-labelledby={`${dropdownId}--label`}
        >
          {options &&
            options.map((option) => {
              const isSelected = selectedId === option.id;

              return (
                <StyledListItem
                  role="option"
                  key={option.id}
                  aria-selected={isSelected}
                  isSelected={isSelected}
                  onClick={() => handleClick(option.id)}
                >
                  {option.value}
                </StyledListItem>
              );
            })}
        </StyledList>
      )}
    </Container>
  );
};

export default SelectDropdown;
