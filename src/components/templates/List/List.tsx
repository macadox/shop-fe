import * as React from "react";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
} from "@tanstack/react-table";

import Pagination from "../../molecules/Pagination/Pagination";
import Container from "../../atoms/Container/Container";
import TableTemplate from "../TableTemplate/TableTemplate";
import Grid from "../Grid/Grid";

export enum ViewEnum {
  "GRID" = "GRID",
  "TABLE" = "TABLE",
}

type BaseProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  view: ViewEnum;
};

type GridType<T> = BaseProps<T> & {
  view: ViewEnum.GRID;
  GridComponent: React.FC<T>;
  itemMinWidth: string;
  maxColumnCount: number;
};

type TableType<T> = BaseProps<T> & {
  view: ViewEnum.TABLE;
};

type Props<T> = TableType<T> | GridType<T>;

const List = <T,>(props: Props<T>) => {
  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    initialState: { pagination: { pageSize: 6 } },
    getCoreRowModel: getCoreRowModel(),
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
            itemMinWidth={props.itemMinWidth}
            maxColumnCount={props.maxColumnCount}
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
      {renderComponent()}
      <Container mt={32}>
        <Pagination table={table} />
      </Container>
    </Container>
  );
};

export default List;
