import React, { useCallback, useMemo } from "react";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import List, { ViewEnum } from "../../templates/List/List";
import ProductWidget from "../../molecules/ProductWidget/ProductWidget";

import { PRODUCT_WIDGET_PHOTO_SIZE } from "../../../constants/layout";
import {
  GetAllProductsItem,
  ProductWidgetType,
} from "../../../constants/types";

const defaults = {
  id: "ID",
  name: "Name",
  price: "Price",
  src: "Photo",
  favorited: "Favorited",
  category: "Category",
  colors: "Colors",
  materials: "Materials",
  sizes: "Sizes",
};

type Props = {
  list: GetAllProductsItem[];
  isLoading: boolean;
  onWidgetClick: (slug: string) => void;
  onHeartClick: () => void;
  hasFilter?: boolean;
  hasPagination?: boolean;
};

const ProductGrid = ({
  list,
  isLoading,
  onWidgetClick,
  onHeartClick,
  hasFilter,
  hasPagination,
}: Props) => {
  const { t } = useTranslation("product");

  const columns = useMemo<ColumnDef<GetAllProductsItem>[]>(
    () => [
      {
        header: t("id", defaults.id) || "",
        accessorKey: "id",
        enableColumnFilter: false,
      },
      { header: t("name", defaults.name) || "", accessorKey: "name" },
      { header: t("price", defaults.price) || "", accessorKey: "price" },
      {
        header: t("src", defaults.src) || "",
        accessorKey: "src",
        enableColumnFilter: false,
      },
      {
        header: t("favorited", defaults.favorited) || "",
        accessorKey: "favorited",
        enableColumnFilter: false,
      },
      {
        header: t("category", defaults.category) || "",
        accessorKey: "category",
      },
      {
        header: t("colors", defaults.colors) || "",
        accessorKey: "colors",
        filterFn: "matchArrItem",
      },
      {
        header: t("materials", defaults.materials) || "",
        accessorKey: "materials",
        filterFn: "matchArrItem",
      },
      {
        header: t("sizes", defaults.sizes) || "",
        accessorKey: "sizes",
        filterFn: "matchArrItem",
      },
    ],
    [t]
  );
  const data = useMemo(() => list, [list]);

  const renderProduct = useCallback(
    (props: Extract<GetAllProductsItem, ProductWidgetType>) => {
      return (
        <ProductWidget
          id={props.id}
          slug={props.slug}
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
      $maxColumnCount={3}
      $itemMinWidth={PRODUCT_WIDGET_PHOTO_SIZE}
      isLoading={isLoading}
      hasFilter={hasFilter}
      hasPagination={hasPagination}
    />
  );
};

export default ProductGrid;
