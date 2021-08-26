import React, { useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import "moment/locale/ko"

import { ChevronLeft, ChevronRight } from "react-bootstrap-icons"
import "bootstrap/dist/css/bootstrap.min.css"

import styled from "styled-components"
import GlobalStyle from "../style/GlobalStyle"
import Week from "./Week"
import WritePopup from "./WritePopup"
import {
  dayRequest,
  DAY_REQUEST,
  listAddRequest,
  popupOpen,
  writePopup,
} from "../reducers"
import { CalendarRow, val } from "../style/common"

export let weekLength
const CalendarHeader = styled.div`
  position:relative;
  width:280px;
  height: ${val.headerHeight}px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin:auto;
}
`
const CalendarBody = styled.div``
const CalendarContent = styled.div`
  height: calc(100vh - ${val.sum()}px);
`
const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.direction ? "right:0" : "left :0")};
`
function positionStyle({ target, colTop, popupHeight }) {
  const colWidth = target.target.clientWidth
  let upY
  if (window.innerHeight < colTop + popupHeight) {
    upY = colTop - popupHeight / 2
  } else {
    upY = Math.min(colTop, target.clientY)
  }

  // const upY = Math.min(colTop, target.clientY)
  const setStyle = {}
  const x = Array(7)
    .fill()
    .map((v, i) => colWidth * i)
  const closest = x.reduce((acc, curr) => {
    return acc < target.clientX && target.clientX < curr ? acc : curr
  })
  if (window.innerWidth < 1199) {
    setStyle.top = 0
    setStyle.left = 0
  } else if (window.innerWidth / 2 < target.clientX) {
    // 오른쪽
    const rightX = window.innerWidth - closest
    if (window.innerHeight / 2 > target.clientY) {
      console.log("오른쪽위")
      setStyle.top = upY
      setStyle.right = rightX
    } else {
      console.log("오른쪽 아래")
      setStyle.top = upY
      setStyle.right = rightX
    }
  } else if (window.innerWidth / 2 > target.clientX) {
    // 왼쪽
    const leftX = closest + colWidth
    if (window.innerHeight / 2 > target.clientY) {
      console.log("왼쪽위")
      setStyle.top = upY
      setStyle.left = leftX
    } else {
      console.log("왼쪽 아래")
      setStyle.top = upY
      setStyle.left = leftX
    }
  }
  return setStyle
}

const CalendarTodo = () => {
  const dispatch = useDispatch()
  const { writePopupOpen } = useSelector((state) => state)
  const [today, setToday] = useState(moment())
  const [selected, setSelected] = useState(moment().startOf("day"))
  const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Set"]

  const weekRef = useRef(null)
  const popup = useRef(null)
  const [style, setStyle] = useState(null)
  const [popupObj, setPopupObj] = useState({
    target: null,
    colTop: null,
    popupHeight: popup.current,
  })

  useEffect(() => {
    console.log(popupObj)
    if (writePopupOpen) {
      setPopupObj((prev) => ({
        ...prev,
        popupHeight: popup.current.offsetHeight,
      }))
      setStyle(positionStyle(popupObj))
    }
  }, [writePopupOpen, popupObj.target])

  const select = useCallback((day, col, e) => {
    // console.log(day.date.toDate());
    setPopupObj((prev) => ({
      ...prev,
      target: e,
      colTop: col.current.offsetParent.offsetTop,
    }))
    dispatch(dayRequest(day))
    setSelected(day.date)
    dispatch(popupOpen())
    console.log(
      col.current.offsetParent.offsetTop,
      day.date.month(),
      day.date.get("date"),
    )
  }, [])

  const previous = () => {
    setToday(today.clone().subtract(1, "month"))
  }
  const next = () => {
    setToday(today.clone().add(1, "month"))
  }

  const renderWeeks = () => {
    const weeks = []
    let done = false
    // 전달 일요일 -> 현재 주
    const date = today
      .clone()
      .startOf("month")
      .add("w" - 1)
      .day("Sunday")
    let count = 0
    // 전달
    let monthIndex = date.month()
    while (!done) {
      weeks.push(
        <Week
          key={date}
          date={date.clone()}
          month={today}
          select={(day, col, e) => select(day, col, e)}
          selected={selected}
        />,
      )
      date.add(1, "w")
      done = count++ > 2 && monthIndex !== date.month()
      monthIndex = date.month()
    }

    return weeks
  }
  weekLength = renderWeeks().length

  return (
    <>
      <GlobalStyle />

      <CalendarHeader>
        <Button direction={false} type="button" onClick={previous}>
          <ChevronLeft />
        </Button>
        {today.format("YYYY[년] MMMM")}
        <Button direction type="button" onClick={next}>
          <ChevronRight />
        </Button>
      </CalendarHeader>
      <CalendarBody>
        <CalendarRow>
          {dayName.map((v) => (
            <div>{v}</div>
          ))}
        </CalendarRow>
        <CalendarContent>{renderWeeks()}</CalendarContent>
      </CalendarBody>
      {writePopupOpen && <WritePopup style={style} ref={popup} />}
    </>
  )
}

export default CalendarTodo
