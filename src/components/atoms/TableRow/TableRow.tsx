import styled from "styled-components";
import * as colors from "../../../constants/colors";

type HTMLTrProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
>;

const TableRow = styled.tr<HTMLTrProps>`
  display: table;
  text-align: left;
  width: 100%;
  table-layout: fixed;
  border-bottom: 1px solid ${colors.GRAY};
`;

export default TableRow;
