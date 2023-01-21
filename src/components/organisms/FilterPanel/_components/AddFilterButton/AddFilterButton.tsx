import React from "react";
import { StyledAddFilterButton } from "./AddFilterButton.style";
import { ComboboxProps } from "../../../../molecules/SingleSelectDropdown/SingleSelectDropdown";
import { ReactComponent as CircleAdd } from "../../../../../assets/icons/add-circle.svg";
import * as colors from "../../../../../constants/colors";
import { AddFilterSteps } from "../../types";

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
  <StyledAddFilterButton
    role="combobox"
    aria-expanded={isExpanded}
    aria-controls={ariaControls}
    aria-activedescendant={
      isExpanded && ariaActiveDescendant ? ariaActiveDescendant : undefined
    }
    aria-haspopup="listbox"
    aria-labelledby={ariaLabelledBy}
    hasFocus={isExpanded}
    tabIndex={0}
    onClick={() => {
      setStep(1);
      handleClick();
    }}
    onKeyDownCapture={handleKeyDown}
    ref={innerRef}
  >
    <CircleAdd stroke={colors.GRAY} height="18px" width="18px" />
    <span>Add Filter</span>
  </StyledAddFilterButton>
);

export default AddFilterButton;
