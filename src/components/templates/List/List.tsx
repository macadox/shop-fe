import React, { useState } from "react";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  ColumnFiltersState,
  ColumnDef,
  Row,
  FilterFn,
} from "@tanstack/react-table";

import Pagination from "../../organisms/Pagination/Pagination";
import Container from "../../atoms/Container/Container";
import TableTemplate from "../TableTemplate/TableTemplate";
import Grid from "../Grid/Grid";
import FilterPanel from "../../organisms/FilterPanel/FilterPanel";
import Spinner from "../../atoms/Spinner/Spinner";

declare module "@tanstack/table-core" {
  interface FilterFns {
    matchArrItem: FilterFn<unknown>;
  }
}

const matchArrItem: FilterFn<any> = <TData,>(
  row: Row<TData>,
  columnId: string,
  value: any
) => {
  const rowValues = row.getValue(columnId);
  if (!rowValues) return false;
  if (!Array.isArray(rowValues)) return false;

  const valueRegex = new RegExp(value, "gi");

  return rowValues.some((value) => valueRegex.test(value));
};

export enum ViewEnum {
  "GRID" = "GRID",
  "TABLE" = "TABLE",
}

type BaseProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  view: ViewEnum;
  isLoading: boolean;
  hasFilter?: boolean;
  hasPagination?: boolean;
};

type GridType<T> = BaseProps<T> & {
  view: ViewEnum.GRID;
  GridComponent: React.FC<T>;
  $itemMinWidth: string;
  $maxColumnCount: number;
};

type TableType<T> = BaseProps<T> & {
  view: ViewEnum.TABLE;
};

type Props<T> = TableType<T> | GridType<T>;

const List = <T,>(props: Props<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    filterFns: {
      matchArrItem: matchArrItem,
    },
    initialState: { pagination: { pageSize: 6 } },
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const renderComponent = () => {
    switch (props.view) {
      case ViewEnum.TABLE: {
        return <TableTemplate table={table} />;
      }
      case ViewEnum.GRID: {
        return (
          <Grid
            table={table}
            Component={props.GridComponent}
            $itemMinWidth={props.$itemMinWidth}
            $maxColumnCount={props.$maxColumnCount}
          />
        );
      }
      default: {
        return null;
      }
    }
  };

  return (
    <Container>
      {props.hasFilter && (
        <Container $mb={32}>
          <FilterPanel table={table} />
        </Container>
      )}

      {props.isLoading ? (
        <Container $width="100%" $display="flex" $justifyContent="center">
          <Spinner />
        </Container>
      ) : (
        renderComponent()
      )}
      {props.hasPagination && (
        <Container $mt={32}>
          <Pagination table={table} />
        </Container>
      )}
    </Container>
  );
};

List.defaultProps = {
  hasFilter: true,
  hasPagination: true,
};

export default List;
