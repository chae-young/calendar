import React, { useState } from "react"
import moment from "moment"
import { Row } from "react-bootstrap"
import Day from "./Day"

const Week = ({ date, month, select, selected }) => {
  const days = []
  for (let i = 0; i < 7; i++) {
    const day = {
      name: date.format("dd").substring(0, 1),
      format: date.format("YYYY-MM-DD"),
      daymonth: date.month(),
      year: date.year(),
      number: date.date(),
      isCurrentMonth: date.month() === month.month(),
      isToday: date.isSame(new Date(), "day"),
      date,
    }
    days.push(<Day day={day} selected={selected} select={select} />)
    date = date.clone()
    date.add(1, "day")
  }

  return <Row>{days}</Row>
}

export default Week
