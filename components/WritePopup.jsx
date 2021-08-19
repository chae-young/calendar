import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import ko from "date-fns/locale/ko"

import { Form, Row, Col, Button } from "react-bootstrap"
import {
  X,
  Calendar3,
  ChatRightDotsFill,
  CardImage,
} from "react-bootstrap-icons"

import styles from "styled-components"
import { listAddAction, LIST_ADD_REQUEST, WRITE_POPUP_CLOSE } from "../reducers"
import SelectOption from "./SelectOption"

registerLocale("ko", ko)

const Popup = styles.div`
    position: fixed;
    padding: 40px;
    background: #fff;
    -webkit-box-shadow: 0px 6px 18px 4px #666666; 
    box-shadow: 0px 6px 18px 4px #666666;    
`

const WritePopup = ({ style }) => {
  const dispatch = useDispatch()
  const { nowDay, postList, currentPost } = useSelector((state) => state)
  const [startDate, setStartDate] = useState(nowDay.date.toDate())
  const [endDate, setEndDate] = useState(nowDay.date.toDate())
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [bgColor, setBgColor] = useState("")

  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.title)
    }
  }, [currentPost])

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault()
      const dateDistance = endDate.getTime() - startDate.getTime()
      const setDate = dateDistance / (1000 * 60 * 60 * 24)

      let num
      const currentDate = []
      for (let i = 0; i <= setDate; i++) {
        num = i >= 1 ? 1 : 0
        const alldate = new Date(startDate.setDate(startDate.getDate() + num))
        currentDate.push(moment(alldate).format("YYYY-MM-DD"))
        // console.log("y", alldate.getFullYear())
        // console.log("m", alldate.getMonth())
        // console.log("day", alldate.getDate())
        // console.log(new Date(sectionDate.setDate(sectionDate.getDate() + num)))
      }
      // console.log(endDate, startDate)
      const arr = currentDate.map((v) => ({
        id: postList.length,
        format: v,
        nowDay,
        title,
        desc,
        bgColor,
        section: setDate,
      }))
      dispatch({ type: LIST_ADD_REQUEST, data: arr })
      setTitle("")
      setDesc("")
      dispatch({ type: WRITE_POPUP_CLOSE })
    },
    [nowDay, title, desc, bgColor, startDate, endDate],
  )
  const onChangeInput = useCallback((e) => {
    setTitle(e.target.value)
  }, [])
  const onChangeDesc = useCallback((e) => {
    setDesc(e.target.value)
  }, [])

  const onClose = useCallback(() => {
    dispatch({ type: WRITE_POPUP_CLOSE })
  }, [])

  return (
    <Popup style={style} className="calender__popup">
      <button onClick={onClose}>
        <X size={25} />
      </button>
      <Form onSubmit={onSubmit}>
        <Form.Group as={Row}>
          <Form.Label column sm={2} />
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="제목.."
              onChange={onChangeInput}
              value={title}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            <Calendar3 />
          </Form.Label>
          <Col sm={10}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
            <SelectOption setBgColor={setBgColor} />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            <ChatRightDotsFill />
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="설명.."
              onChange={onChangeDesc}
              value={desc}
            />
          </Col>
          <Button type="submit" variant="primary">
            저장
          </Button>
        </Form.Group>
      </Form>
    </Popup>
  )
}

export default WritePopup
