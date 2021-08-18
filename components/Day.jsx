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
  const { date, daymonth, isCurrentMonth, isToday, number } = day
  const { postList, listAddDone } = useSelector((state) => state)

  const [moreClick, setMoreClick] = useState(false)
  const [editPopup, setEditPopup] = useState(false)
  const [style, setStyle] = useState(null)

  const [currentList, setCurrentList] = useState()
  const onClickPop = (list, e) => {
    setCurrentList((prev) => ({ ...list }))
    console.log(currentList)
    setEditPopup(true)
  }

  const renderList = useCallback(() => {
    const postListArr = []
    const dayAllList = []
    postList.forEach((v) => {
      if (v.nowDay.daymonth === daymonth && v.nowDay.number === number) {
        if (postListArr.length < 2) {
          postListArr.push(
            <DayList data={v} onClickPop={(list, e) => onClickPop(list, e)} />,
          )
        }
        dayAllList.push(v)
      }
    })
    return { postListArr, dayAllList }
  }, [postList])

  const more = renderList().dayAllList.length >= 3
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
        style={{ height: "calc((100vh - 48px)/6)", position: "relative" }}
        className={`day${isToday ? " today" : ""}${
          isCurrentMonth ? "" : " different-month"
        }${date.isSame(selected) ? " selected" : ""}`}
        onClick={(e) => {
          select(day, e)
        }}
      >
        {number}
        <ul>{renderList().postListArr}</ul>
        {more && (
          <Button onClick={onClickMore} variant="link">
            {renderList().dayAllList.length - renderList().postListArr.length}개
            더보기
          </Button>
        )}
        {moreClick && <MoreListPopup list={renderList().dayAllList} />}
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
