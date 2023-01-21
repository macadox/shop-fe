import React, { useCallback, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import List, { ViewEnum } from "../../templates/List/List";
import ProductWidget from "../../molecules/ProductWidget/ProductWidget";

import { PRODUCT_WIDGET_PHOTO_SIZE } from "../../../constants/layout";
import {
  GetAllProductsItem,
  ProductWidgetType,
} from "../../../constants/types";

type Props = {
  list: GetAllProductsItem[];
  isLoading: boolean;
  onWidgetClick: () => void;
  onHeartClick: () => void;
};

const ProductGrid = ({
  list,
  isLoading,
  onWidgetClick,
  onHeartClick,
}: Props) => {
  const columns = useMemo<ColumnDef<GetAllProductsItem>[]>(
    () => [
      { header: "ID", accessorKey: "id", enableColumnFilter: false },
      { header: "Name", accessorKey: "name" },
      { header: "Price", accessorKey: "price" },
      { header: "Photo", accessorKey: "src", enableColumnFilter: false },
      { header: "Favorited", accessorKey: "favorited" },
      { header: "Category", accessorKey: "category" },
    ],
    []
  );
  const data = useMemo(() => list, [list]);

  const renderProduct = useCallback(
    (props: Extract<GetAllProductsItem, ProductWidgetType>) => {
      return (
        <ProductWidget
          id={props.id}
          name={props.name}
          price={props.price}
          favorited={false}
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
      itemMinWidth={PRODUCT_WIDGET_PHOTO_SIZE}
      isLoading={isLoading}
    />
  );
};

export default ProductGrid;
