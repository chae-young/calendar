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
import { dayRequest, popupOpen } from "../reducers"
import { CalendarRow, val } from "../style/common"
import usePositionStyle from "../hooks/usePositionStyle"

export let weekLength
const CalendarHeader = styled.div`
  position:relative;
  width:280px;
  height: ${val.headerHeight}px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin:auto;
  font-size: 1.4rem;  
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
  ${(props) => (props.direction ? "right: 0" : "left: 0")};
`

const CalendarTodo = () => {
  const dispatch = useDispatch()
  const { writePopupOpen, editMode } = useSelector((state) => state)
  const [today, setToday] = useState(moment())
  const [selected, setSelected] = useState(moment().startOf("day"))
  const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Set"]
  const buttonDirection = true

  const popup = useRef(null)
  const [popupObj, setPopupObj] = useState({
    target: null,
    colTop: null,
    popupHeight: popup.current,
  })
  const popupStyle = usePositionStyle(popupObj)

  // const [popupStyle, setStyle] = useState({ display: "block" })
  useEffect(() => {
    if (writePopupOpen) {
      setPopupObj((prev) => ({
        ...prev,
        popupHeight: popup.current.offsetHeight,
      }))
    } else {
      setPopupObj((prev) => ({
        ...prev,
        target: null,
      }))
    }
  }, [writePopupOpen, popupObj.target])

  useEffect(() => {
    // console.log(editMode, popupObj.target)
    if (popupObj.target && !editMode) dispatch(popupOpen())
  }, [popupObj.target, editMode])

  const select = useCallback((day, col, e) => {
    setPopupObj((prev) => ({
      ...prev,
      target: e,
      colTop: col.current.offsetParent.offsetTop,
    }))
    dispatch(dayRequest(day))
    setSelected(day.date)
  }, [])

  const previous = useCallback(() => {
    setToday(today.clone().subtract(1, "month"))
  }, [today])
  const next = useCallback(() => {
    setToday(today.clone().add(1, "month"))
  }, [today])

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
        <Button
          direction={!buttonDirection ? 1 : 0}
          type="button"
          onClick={previous}
        >
          <ChevronLeft />
        </Button>
        {today.format("YYYY[년] MMMM")}
        <Button
          direction={buttonDirection ? 1 : 0}
          type="button"
          onClick={next}
        >
          <ChevronRight />
        </Button>
      </CalendarHeader>
      <CalendarBody>
        <CalendarRow>
          {dayName.map((v) => (
            <div key={v}>{v}</div>
          ))}
        </CalendarRow>
        <CalendarContent>{renderWeeks()}</CalendarContent>
      </CalendarBody>
      {writePopupOpen && <WritePopup style={popupStyle} ref={popup} />}
    </>
  )
}

export default CalendarTodo
