import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import List, { ViewEnum } from "./components/templates/List/List";
import { ProductWidgetType } from "./constants/types";

type Props = {
  list: ProductWidgetType[];
};

const TemporaryTableOrganism = ({ list }: Props) => {
  const columns = useMemo<ColumnDef<ProductWidgetType>[]>(
    () => [
      { header: "ID", accessorKey: "id" },
      {
        header: "Image",
        accessorKey: "src",
        cell: (info) => (
          <img
            src={info.getValue() as string | undefined}
            alt="hello"
            height="40px"
            width="40px"
          />
        ),
      },
      { header: "Name", accessorKey: "name" },
      { header: "Price", accessorKey: "price" },
    ],
    []
  );
  const data = useMemo(() => list, [list]);

  return <List view={ViewEnum.TABLE} data={data} columns={columns} />;
};

export default TemporaryTableOrganism;
