import React, { useMemo } from "react";
import { Table as ReactTableInterface } from "@tanstack/react-table";
import Button from "../../atoms/Button/Button";
import Container from "../../atoms/Container/Container";
import { ReactComponent as ArrowLeft } from "../../../assets/icons/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../../assets/icons/arrow-right.svg";
import * as colors from "../../../constants/colors";

const BLOCKS_TOTAL = 5;

type Props<T> = {
  table: ReactTableInterface<T>;
};

const Pagination = <T,>({ table }: Props<T>) => {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  const blockWalk = Math.floor(BLOCKS_TOTAL / 2);
  const blockStartIndex = Math.max(pageIndex - blockWalk, 0);

  const pageBlocks = useMemo(() => {
    const pagesArr = [];
    for (let i = 1; i <= pageCount; i++) {
      pagesArr.push(i);
    }

    const startIndex =
      pageIndex - blockWalk < 0
        ? 0
        : Math.min(
            pageIndex - blockWalk,
            Math.max(pageCount - BLOCKS_TOTAL, 0)
          );
    const endIndex = blockStartIndex + BLOCKS_TOTAL;

    return pagesArr.slice(startIndex, endIndex);
  }, [blockStartIndex, pageIndex, pageCount, blockWalk]);

  const gotoPage = (index: number) => {
    table.setPageIndex(index);
  };

  return (
    <Container
      width={`calc(40px * ${pageBlocks.length + 2} + 8px * ${
        pageBlocks.length + 1
      })`}
      mx="auto"
      display="flex"
      gap="8px"
    >
      <Container width="40px" height="40px">
        {table.getCanPreviousPage() && (
          <Button
            width="40px"
            height="40px"
            onClick={table.previousPage}
            icon={<ArrowLeft height="16px" fill={colors.WHITE} />}
            hasFill={true}
          />
        )}
      </Container>
      {pageBlocks.map((block) => (
        <Button
          key={block}
          width="40px"
          height="40px"
          onClick={() => gotoPage(block - 1)}
          text={block.toString()}
          isActive={pageIndex === block - 1}
        />
      ))}
      <Container width="40px" height="40px">
        {table.getCanNextPage() && (
          <Button
            width="40px"
            height="40px"
            onClick={table.nextPage}
            icon={<ArrowRight height="16px" fill={colors.WHITE} />}
            hasFill={true}
          />
        )}
      </Container>
    </Container>
  );
};

export default Pagination;
