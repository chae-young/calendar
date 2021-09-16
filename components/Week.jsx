import React from "react"
import PropTypes from "prop-types"

import Day from "./Day"
import { CalendarRow } from "../style/common"

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
      dayindex: i,
      currentday: date.day(),
    }
    days.push(<Day day={day} selected={selected} select={select} />)
    date = date.clone()
    date.add(1, "day")
  }

  return <CalendarRow day>{days}</CalendarRow>
}
Week.propTypes = {
  date: PropTypes.object.isRequired,
  month: PropTypes.object.isRequired,
  select: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
}
export default Week
