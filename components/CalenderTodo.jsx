import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import "moment/locale/ko"

import { Container, Row, Col } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

import Week from "./Week"
import WritePopup from "./WritePopup"
import { DAY_REQUEST, WRITE_POPUP_OPEN } from "../reducers"
import { stylepop } from "./styleJs/popup"

const CalenderTodo = () => {
  const dispatch = useDispatch()
  const { writePopupOpen } = useSelector((state) => state)
  const [today, setToday] = useState(moment())
  const [selected, setSelected] = useState(moment().startOf("day"))
  const [userClick, setUserClick] = useState(false)
  const [style, setStyle] = useState(null)
  const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Set"]

  const select = (day, e) => {
    // console.log(day.date.toDate());
    console.log(day, day.date.month(), day.date.get("date"))
    dispatch({ type: DAY_REQUEST, data: day })
    stylepop(e, setStyle, dayName)
    setSelected(day.date)
    dispatch({ type: WRITE_POPUP_OPEN })
  }

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
          select={(day, e) => select(day, e)}
          selected={selected}
        />,
      )
      date.add(1, "w")
      done = count++ > 2 && monthIndex !== date.month()
      monthIndex = date.month()
    }

    return weeks
  }

  return (
    <div className="calender-wrap">
      <div className="calender__head">
        <button onClick={previous} />
        {today.format("YYYY[년] MMMM")}
        <button onClick={next} />
      </div>
      <Container fluid className="calender__container">
        <Row className="calender-name">
          {dayName.map((v) => (
            <Col>{v}</Col>
          ))}
        </Row>
        {renderWeeks()}
      </Container>
      {writePopupOpen && <WritePopup style={style} />}
    </div>
  )
}

export default CalenderTodo
