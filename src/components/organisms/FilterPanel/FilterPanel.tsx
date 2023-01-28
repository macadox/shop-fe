import React, { useMemo } from "react";
import { Table } from "@tanstack/react-table";
import Container from "../../atoms/Container/Container";
import Tag from "../../atoms/Tag/Tag";
import FilterTagContent from "./_components/FilterTagContent/FilterTagContent";
import { getColumnHeaderText } from "./utils";
import AddFilter from "./_components/AddFilter/AddFilter";
import { FilterValuesOpts } from "./types";

type Props<T> = {
  table: Table<T>;
};

const FilterPanel = <T,>({ table }: Props<T>) => {
  const filterableColumns = table
    .getAllColumns()
    .filter((column) => column.getCanFilter());

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
      <Container $display="flex" $gap="8px" $flexWrap="wrap">
        {filteredColumns.map((column) => (
          <Tag
            key={column.id}
            content={
              <FilterTagContent
                label={getColumnHeaderText(column)}
                value={column.getFilterValue() as FilterValuesOpts}
              />
            }
            onClear={() => column.setFilterValue(undefined)}
          />
        ))}
        <AddFilter
          table={table}
          columns={filterableColumns}
          filterKeys={filterOptions}
        />
      </Container>
    </Container>
  );
};

export default FilterPanel;
