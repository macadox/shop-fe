import { styled } from "styled-components";

type HTMLTBodyProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;

const TableBody = styled.tbody<HTMLTBodyProps>``;

export default TableBody;
