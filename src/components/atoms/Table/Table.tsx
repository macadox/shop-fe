import styled from "styled-components";

type HTMLTableProps = React.DetailedHTMLProps<
  React.TableHTMLAttributes<HTMLTableElement>,
  HTMLTableElement
>;

const Table = styled.table<HTMLTableProps>`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
`;

export default Table;
