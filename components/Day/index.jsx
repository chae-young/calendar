import React, { useState, useCallback, useRef } from "react"
import PropTypes from "prop-types"
import moment from "moment"
import { useSelector } from "react-redux"

import styled from "styled-components"
import DayList from "../DayList"
import MoreListPopup from "../MoreListPopup"
import EditPopup from "../EditPopup"
import "./style.css"

const ColNumber = styled.span`
  display: inline-block;
  margin: 5px;
  font-size: 1.4rem;
`
const MoreButton = styled.button`
  margin-top: 10px;
  font-size: 1.2rem;
`
const Day = ({ day, select, selected }) => {
  const { date, isCurrentMonth, isToday, number, currentday } = day
  const { postList } = useSelector((state) => state)

  const [moreClick, setMoreClick] = useState(false)
  const [editPopup, setEditPopup] = useState(false)

  const [currentList, setCurrentList] = useState(null)
  const onClickPop = (list, e) => {
    setCurrentList((prev) => ({ ...list }))
    setEditPopup(true)
  }

  // const firstDate = dayindex === 0 ? date.format("YYYY-MM-DD") : null
  // 현재날 짜와 리스트의 날짜가 같으면 ..
  const dateList = postList
    .filter((v) => {
      const isSame = v.currentDate === v.startDate
      if (isSame && v.startDate === date.format("YYYY-MM-DD")) {
        return v
      }
    })
    .sort((a, b) =>
      b.category.split("data_")[1].localeCompare(a.category.split("data_")[1]),
    )

  const more = dateList.length > 2
  const onClickMore = useCallback((e) => {
    // e.preventDefault();
    e.stopPropagation()
    setMoreClick(true)
  })

  const col = useRef(null)
  return (
    <div
      key={date.toString()}
      ref={col}
      className={`day${isToday ? " today" : ""}${
        isCurrentMonth ? "" : " different-month"
      }${date.isSame(selected) ? " selected" : ""}${
        currentday === 0 ? " sunday" : ""
      }${currentday === 6 ? " saturday" : ""}`}
      onClick={(e) => {
        select(day, col, e)
      }}
    >
      <ColNumber className="number" onClick={(e) => e.stopPropagation()}>
        {number}
      </ColNumber>
      <ul>
        {dateList.map(
          (v, i, arr) =>
            i < 2 && (
              <DayList post={v} onClickPop={(list, e) => onClickPop(list, e)} />
            ),
        )}
      </ul>

      {more && (
        <MoreButton type="button" onClick={onClickMore} variant="link">
          {dateList.length - 2}개 더보기
        </MoreButton>
      )}
      {moreClick && (
        <MoreListPopup
          post={dateList}
          setMoreClick={setMoreClick}
          onClickPop={onClickPop}
        />
      )}
      {editPopup && (
        <EditPopup currentList={currentList} setEditPopup={setEditPopup} />
      )}
    </div>
  )
}
Day.propTypes = {
  day: PropTypes.object.isRequired,
  select: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
}
export default Day
