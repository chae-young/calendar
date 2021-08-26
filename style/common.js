import styled from "styled-components"
import { weekLength } from "../components/CalendarTodo"

export const pointColor = "rgb(119 221 118)"

export const val = {
  headerHeight: 50,
  rowHeight: 40,
  sum() {
    return this.headerHeight + this.rowHeight
  },
}
export const CalendarRow = styled.div`
  position: relative;
  display: flex;
  height: ${(props) =>
    props.day ? `calc(100%  / ${weekLength})` : `${val.rowHeight}px`};
  border-top: 1px solid rgb(0, 0, 0);
  > div {
    flex: 1;

    height: ${(props) => (props.day ? "" : `${val.rowHeight}px`)};
    line-height: ${(props) => (props.day ? "" : `${val.rowHeight}px`)};
    text-align: ${(props) => (props.day ? "left" : "center")};
    border-left: 1px solid rgb(0, 0, 0);
  }
`
