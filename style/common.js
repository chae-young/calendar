import styled from "styled-components"

export const val = {
  headerHeight: 50,
  rowHeight: 40,
  sum() {
    return this.headerHeight + this.rowHeight
  },
}

export const CalendarRow = styled.div`
  display: flex;
  height: ${(props) => (props.day ? "calc(100%  / 5)" : `${val.rowHeight}px`)};
  > div {
    flex: 1;
    height: ${(props) => (props.day ? "" : `${val.rowHeight}px`)};
    text-align: ${(props) => (props.day ? "left" : "center")};
  }
`
