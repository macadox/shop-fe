import { styled } from "styled-components";

type HTMLThProps = React.DetailedHTMLProps<
  React.ThHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>;

const TableHeader = styled.th<HTMLThProps>`
  padding: 10px 16px;
  font-weight: 400;
`;

export default TableHeader;
