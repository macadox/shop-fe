import React, {
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
  useMemo,
  useEffect,
} from "react";
import Container from "../../atoms/Container/Container";
import TextBody from "../../atoms/TextBody/TextBody";
import DefaultBox from "../../atoms/DefaultBox/DefaultBox";
import DropdownList, { DropdownOption } from "../DropdownList/DropdownList";

import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { handleRotate } from "../../../utils/styleUtils";
import * as colors from "../../../constants/colors";
import { KeyboardCodes } from "../../../constants/events";
import { ReactComponent as CaretDown } from "../../../assets/icons/caret-down.svg";

export type ComboboxProps = {
  isExpanded: boolean;
  ariaControls: string;
  ariaLabelledBy: string;
  ariaActiveDescendant: string | null;
  selectedItem: DropdownOption | null;
  defaultPlaceholder: string;
  innerRef: React.RefObject<HTMLDivElement>;
  handleClick: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
};

const DefaultCombobox = ({
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
            fill={colors.GRAY}
            data-testid="caret-svg"
          />
        </Container>
      </Container>
    </DefaultBox>
  );
};

type Props = {
  options: DropdownOption[];
  handleSelectCallback: (option: DropdownOption | null) => void;
  initialSelectedId?: string;
  defaultPlaceholder?: string;
  dropdownId: string;
  CustomCombobox?: React.FC<ComboboxProps>;
  overrideIsExpanded?: boolean;
  resetStateAfterClose?: boolean;
};

const SingleSelectDropdown = ({
  options,
  handleSelectCallback,
  initialSelectedId,
  defaultPlaceholder = "Select Item",
  dropdownId,
  CustomCombobox,
  overrideIsExpanded = false,
  resetStateAfterClose = false,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(
    overrideIsExpanded ? overrideIsExpanded : false
  );
  const [selectedId, setSelectedId] = useState<string | null>(
    initialSelectedId ?? null
  );
  const selectedOption = useMemo<DropdownOption | null>(
    () => options.find((option) => option.id === selectedId) || null,
    [selectedId, options]
  );

  const closeDropdown = useCallback(() => {
    setIsExpanded(false);
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const comboboxRef = useRef<HTMLDivElement>(null);
  const firstUpdateRef = useRef(true);

  useOnClickOutside(dropdownRef, () => !overrideIsExpanded && closeDropdown());

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
          e.preventDefault();
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
          e.preventDefault();
          const prevOptionIndex = Math.max(0, currentOptionIndex - 1);
          selectOption(options[prevOptionIndex].id);
          break;
        }
        case KeyboardCodes.ArrowDown:
        case KeyboardCodes.ArrowRight: {
          e.preventDefault();
          const nextOptionIndex = Math.min(
            options.length - 1,
            currentOptionIndex + 1
          );
          selectOption(options[nextOptionIndex].id);
          break;
        }
      }
    },
    [options, selectedId, closeDropdown, toggleDropdown]
  );

  const handleClick = (optionId: string) => {
    selectOption(optionId);
    !overrideIsExpanded && closeDropdown();
    focusCombobox();
  };

  useEffect(() => {
    setIsExpanded(overrideIsExpanded);
    if (overrideIsExpanded && resetStateAfterClose) {
      setSelectedId(null);
    }
  }, [overrideIsExpanded, resetStateAfterClose]);

  useLayoutEffect(() => {
    if (firstUpdateRef.current) {
      firstUpdateRef.current = false;
      return;
    }

    handleSelectCallback(selectedOption);
  }, [selectedOption, handleSelectCallback]);

  const RenderedCombobox = useMemo(
    () => (CustomCombobox ? CustomCombobox : DefaultCombobox),
    [CustomCombobox]
  );

  return (
    <Container ref={dropdownRef} position="relative">
      <RenderedCombobox
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
        <DropdownList
          dropdownId={dropdownId}
          items={options}
          selectedIds={[selectedId]}
          onClick={handleClick}
        />
      )}
    </Container>
  );
};

export default SingleSelectDropdown;
