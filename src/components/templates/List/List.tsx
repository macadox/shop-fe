import * as React from "react";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  Table as ReactTableInterface,
} from "@tanstack/react-table";

import Pagination from "../../molecules/Pagination/Pagination";
import Container from "../../atoms/Container/Container";

type Props<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  Component: React.FC<{ table: ReactTableInterface<T> }>;
};

const List = <T,>({ columns, data, Component }: Props<T>) => {
  const table = useReactTable({
    data,
    columns,
    initialState: { pagination: { pageSize: 5 } },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Container>
      <Component table={table} />
      <Container mt={32}>
        <Pagination table={table} />
      </Container>
    </Container>
  );
};

export default List;
