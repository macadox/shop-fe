import { styled } from "styled-components";

type HTMLTheadProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;

const TableHead = styled.thead<HTMLTheadProps>`
  text-align: left;
  table-layout: fixed;
  width: 100%;
`;

export default TableHead;
