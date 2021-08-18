import React, { useEffect, useState } from "react"
import moment from "moment"
import "moment/locale/ko"
import { Container, Row, Col } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { useDispatch, useSelector } from "react-redux"
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
    console.log(day.date.month(), day.date.get("date"))
    dispatch({ type: DAY_REQUEST, data: day })
    stylepop(e, setStyle, dayName)
    // const colWidth = e.target.clientWidth;
    // const upY = window.innerHeight/4 > e.clientY ? 0 : '50%';
    // const downY = window.innerHeight/4 < e.clientY ? 0 : '50%';
    // const transForm = (y)=> y ? 'translateY(-50%)' : null;

    // const x = Array(dayName.length).fill().map((v,i)=>colWidth*i)
    // const closest = x.reduce((acc,curr)=>{
    //     return acc<e.clientX && e.clientX<curr ? acc : curr
    // })
    // if(window.innerWidth/2 < e.clientX){//오른쪽
    //     console.log(closest,x)
    //     const rightX = window.innerWidth - closest;
    //     if(window.innerHeight/2 > e.clientY){
    //         console.log('오른쪽위')
    //         setStyle({
    //             top:upY,
    //             //right:(window.innerWidth-e.clientX)+colWidth+'px',
    //             right:rightX,
    //             transform:transForm(upY),
    //         })
    //     }else{
    //         console.log('오른쪽 아래')
    //         setStyle({
    //             bottom:downY,
    //             right:rightX,
    //             transform:transForm(downY),
    //         })
    //     }
    // }else if(window.innerWidth/2 > e.clientX){//왼쪽
    //     const leftX = closest + colWidth;
    //     if(window.innerHeight/2 > e.clientY){
    //         console.log('왼쪽위')
    //         setStyle({
    //             top:upY,
    //             left:leftX+'px',
    //             transform:transForm(upY),
    //         })
    //     }else{
    //         console.log('왼쪽 아래')
    //         setStyle({
    //             bottom:downY,
    //             left:leftX+'px',
    //             transform:transForm(downY),
    //         })
    //     }
    // }

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
