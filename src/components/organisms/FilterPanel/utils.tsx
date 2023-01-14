import { Column } from "@tanstack/react-table";

export const getColumnHeaderText = <T,>(column: Column<T, unknown>) =>
  column.columnDef.header?.toString() || column.id;
