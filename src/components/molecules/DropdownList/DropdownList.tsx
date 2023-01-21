import React from "react";
import { StyledList, StyledListItem } from "./DropdownList.style";

export type DropdownOption = {
  id: string;
  value: string;
};

type Props = {
  dropdownId: string;
  items: DropdownOption[];
  selectedIds: (string | null)[];
  onClick: (id: string) => void;
};

const DropdownList = ({ dropdownId, items, selectedIds, onClick }: Props) => {
  return (
    <StyledList
      role="listbox"
      id={`${dropdownId}--listbox`}
      aria-labelledby={`${dropdownId}--label`}
    >
      {items &&
        items.map((item) => {
          const $isSelected = selectedIds.includes(item.id);

          return (
            <StyledListItem
              role="option"
              key={item.id}
              aria-selected={$isSelected}
              $isSelected={$isSelected}
              onClick={() => onClick(item.id)}
            >
              {item.value}
            </StyledListItem>
          );
        })}
    </StyledList>
  );
};

export default DropdownList;
