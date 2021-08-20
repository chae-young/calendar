import React, { useState, useEffect, useCallback } from "react"
import moment from "moment"
import styles from "styled-components"
import { useSelector } from "react-redux"
import { Col, Button } from "react-bootstrap"
import DayList from "./DayList"
import MoreListPopup from "./MoreListPopup"
import EditPopup from "./EditPopup"
import WritePopup from "./WritePopup"

const Popup = styles.div`
    position:absolute;
    top:0;
    z-index:99;
    background:#fff;
    -webkit-box-shadow: 0px 6px 18px 4px #666666; 
    box-shadow: 0px 6px 18px 4px #666666;    
`
const Day = ({ day, select, selected }) => {
  const { date, daymonth, isCurrentMonth, isToday, number, year, format } = day
  const { postList, listAddDone } = useSelector((state) => state)

  const [moreClick, setMoreClick] = useState(false)
  const [editPopup, setEditPopup] = useState(false)
  const [style, setStyle] = useState(null)

  const [currentList, setCurrentList] = useState()
  const onClickPop = (list, e) => {
    setCurrentList((prev) => ({ ...list }))
    setEditPopup(true)
  }

  // const sectionDate = postList.find(
  //   (v) => v.currentDate === date.format("YYYY-MM-DD"),
  // )

  const sectionData = postList.filter((v) => {
    if (v.bgColor && v.currentDate === date.format("YYYY-MM-DD")) {
      return v
    }
  })
  // 현재날 짜와 리스트의 날짜가 같으면 ..
  const dateList = postList.filter((v) => {
    const test = v.currentDate === v.startDate
    if (test && v.startDate === date.format("YYYY-MM-DD")) {
      return v
    }
  })
  console.log(dateList, sectionData)

  const more = dateList.length >= 3
  const onClickMore = useCallback((e) => {
    // e.preventDefault();
    e.stopPropagation()
    setMoreClick(true)
  })
  const [editIng, setEditIng] = useState(false)

  const onClose = (e) => {
    setEditIng(false)
  }
  const onClickEdit = () => {
    setEditIng(true)
  }
  return (
    <>
      <Col
        key={date.toString()}
        style={{
          height: "calc((100vh - 48px)/6)",
          position: "relative",
        }}
        className={`day${isToday ? " today" : ""}${
          isCurrentMonth ? "" : " different-month"
        }${date.isSame(selected) ? " selected" : ""}`}
        onClick={(e) => {
          select(day, e)
        }}
      >
        {sectionData.map((v) => (
          <div
            style={{
              height: "10px",
              backgroundColor: `${v.bgColor}`,
            }}
          />
        ))}

        {number}
        <DayList
          post={dateList}
          onClickPop={(list, e) => onClickPop(list, e)}
        />

        {more && (
          <Button onClick={onClickMore} variant="link">
            {dateList.length - 2}개 더보기
          </Button>
        )}
        {moreClick && <MoreListPopup post={dateList} />}
        {editPopup && (
          <Popup style={style} onClick={(e) => e.stopPropagation()}>
            <EditPopup currentList={currentList} setEditPopup={setEditPopup} />
          </Popup>
        )}
      </Col>
    </>
  )
}

export default Day
