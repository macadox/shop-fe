import React from "react";
import {
  Table as ReactTableInterface,
  Row as ReactTableRowInterface,
} from "@tanstack/react-table";
import { StyledGrid } from "./Grid.style";

type Props<T> = {
  table: ReactTableInterface<T>;
  Component: React.FC<T>;
  maxColumnCount: number;
  itemMinWidth: string;
  gridGap?: string;
};

const renderGridItems = <T,>(
  rows: ReactTableRowInterface<T>[],
  Component: React.FC<T>
) => rows.map((row, index) => <Component key={index} {...row.original} />);

const Grid = <T,>({
  table,
  Component,
  maxColumnCount,
  itemMinWidth,
  gridGap = "36px",
}: Props<T>) => {
  const rows = table.getRowModel().rows;

  return (
    <StyledGrid
      gap={gridGap}
      maxColumnCount={maxColumnCount}
      itemMinWidth={itemMinWidth}
    >
      {rows.length === 0 ? (
        <tr>No data is available to preview</tr>
      ) : (
        renderGridItems(rows, Component)
      )}
    </StyledGrid>
  );
};

export default Grid;
