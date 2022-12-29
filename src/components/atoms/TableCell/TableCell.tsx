import styled from "styled-components";

type HTMLTdProps = React.DetailedHTMLProps<
  React.TdHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>;

const TableCell = styled.td<HTMLTdProps>`
  padding: 10px 16px;
`;

export default TableCell;
