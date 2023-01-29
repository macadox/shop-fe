import React from "react";
import {
  Table as ReactTableInterface,
  Row as ReactTableRowInterface,
} from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import Container from "../../atoms/Container/Container";
import TextBody from "../../atoms/TextBody/TextBody";
import { StyledGrid } from "./Grid.style";

type Props<T> = {
  table: ReactTableInterface<T>;
  Component: React.FC<T>;
  $maxColumnCount: number;
  $itemMinWidth: string;
  $gridGap?: string;
};

const renderGridItems = <T,>(
  rows: ReactTableRowInterface<T>[],
  Component: React.FC<T>
) => rows.map((row, index) => <Component key={index} {...row.original} />);

const Grid = <T,>({
  table,
  Component,
  $maxColumnCount,
  $itemMinWidth,
  $gridGap = "36px",
}: Props<T>) => {
  const { t } = useTranslation();
  const rows = table.getRowModel().rows;

  return rows.length === 0 ? (
    <Container $width="100%">
      <TextBody $textAlign="center">{t("noDataAvailable")}</TextBody>
    </Container>
  ) : (
    <StyledGrid
      $gap={$gridGap}
      $maxColumnCount={$maxColumnCount}
      $itemMinWidth={$itemMinWidth}
    >
      {renderGridItems(rows, Component)}
    </StyledGrid>
  );
};

export default Grid;
