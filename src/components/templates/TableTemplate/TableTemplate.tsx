import React from "react";
import {
  Table as ReactTableInterface,
  flexRender,
} from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import Table from "../../atoms/Table/Table";
import TableBody from "../../atoms/TableBody/TableBody";
import TableCell from "../../atoms/TableCell/TableCell";
import TableHead from "../../atoms/TableHead/TableHead";
import TableHeader from "../../atoms/TableHeader/TableHeader";
import TableRow from "../../atoms/TableRow/TableRow";

type Props<T> = {
  table: ReactTableInterface<T>;
};

const TableTemplate = <T,>({ table }: Props<T>) => {
  const { t } = useTranslation();

  return (
    <Table>
      <TableHead>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHeader key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHeader>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {table.getRowModel().rows.length === 0 ? (
          <tr>
            <td>{t("noDataAvailable")}</td>
          </tr>
        ) : (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default TableTemplate;
