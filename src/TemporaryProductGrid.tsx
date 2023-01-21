import React, { useCallback, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import List, { ViewEnum } from "./components/templates/List/List";
import ProductWidget from "./components/molecules/ProductWidget/ProductWidget";

import { PRODUCT_WIDGET_SIZE } from "./constants/layout";
import { ProductWidgetType } from "./constants/types";

type Props = {
  list: ProductWidgetType[];
  onWidgetClick: () => void;
  onHeartClick: () => void;
};

const TemporaryProductGrid = ({ list, onWidgetClick, onHeartClick }: Props) => {
  const columns = useMemo<ColumnDef<ProductWidgetType>[]>(
    () => [
      { header: "ID", accessorKey: "id" },
      { header: "Name", accessorKey: "name" },
      { header: "Price", accessorKey: "price" },
      { header: "Favorited", accessorKey: "favorited" },
    ],
    []
  );
  const data = useMemo(() => list, [list]);

  const renderProduct = useCallback(
    (props: ProductWidgetType) => {
      return (
        <ProductWidget
          id={props.id}
          name={props.name}
          price={props.price}
          favorited={true}
          src={props.src}
          onHeartClick={onHeartClick}
          onWidgetClick={onWidgetClick}
        />
      );
    },
    [onHeartClick, onWidgetClick]
  );

  return (
    <List
      view={ViewEnum.GRID}
      data={data}
      columns={columns}
      GridComponent={renderProduct}
      maxColumnCount={3}
      itemMinWidth={PRODUCT_WIDGET_SIZE}
    />
  );
};

export default TemporaryProductGrid;
