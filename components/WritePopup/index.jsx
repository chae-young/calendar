import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import moment from "moment"

import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { ko } from "date-fns/esm/locale"

import { Form } from "react-bootstrap"
import { X } from "react-bootstrap-icons"

import styled from "styled-components"
import { editPostRequest, listAddRequest, popupClose } from "../../reducers"
import SelectOption from "../SelectOption"
import { pointColor } from "../../style/common"

registerLocale("ko", ko)

const Popup = styled.div`
  position: fixed;
  z-index: 9;
  width: 290px;
  padding: 40px 20px 20px;
  background: #fff;
  -webkit-box-shadow: 0px 6px 18px 4px #666666;
  box-shadow: 0px 6px 10px 0px #666666;
  background: rgb(255 253 197);
  @media screen and (max-width: 1199px) {
    width: 100%;
  }
`
const Input = styled.input`
  width: 100%;
  height: 30px;
  padding-left: 10px;
`
const DateBox = styled.div`
  display: flex;
  margin-top: 10px;
  .react-datepicker-wrapper {
    width: 50%;
    & input {
      width: 100%;
      height: 30px;
    }
  }
  span {
    width: 20px;
    line-height: 30px;
    text-align: center;
  }
`
const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`
const SubmitBtn = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 10px;
  font-weight: bold;
  background-color: ${pointColor};
  color: rgb(255, 255, 255);
`

const WritePopup = memo(
  forwardRef(({ style }, ref) => {
    const dispatch = useDispatch()
    const { nowDay, postList, currentPost } = useSelector((state) => state)
    const [startDate, setStartDate] = useState(nowDay.date.toDate())
    const [endDate, setEndDate] = useState(nowDay.date.toDate())
    const [title, setTitle] = useState("")
    const [bgColor, setBgColor] = useState("")

    const [edit, setEdit] = useState(null)
    useEffect(() => {
      if (currentPost) {
        setTitle(currentPost.content.title)
        setStartDate(new Date(currentPost.startDate))
        setEndDate(new Date(currentPost.endDate))
        const editPost = postList.find(
          (v) => currentPost.category === v.category,
        )
        setEdit(editPost)
      }
    }, [currentPost])

    const categoryNum = postList.filter(
      (v) => v.currentDate === moment(startDate).format("YYYY-MM-DD"),
    )

    const onSubmit = useCallback(
      (e) => {
        e.preventDefault()

        const dateDistance = endDate.getTime() - startDate.getTime()
        const setDate = dateDistance / (1000 * 60 * 60 * 24)

        const category = `${moment(startDate).format("YYMMDD")}_data_${
          categoryNum.length + 1
        }`
        let num
        const currentDateArr = []
        for (let i = 0; i <= setDate; i++) {
          num = i >= 1 ? 1 : 0
          const alldate = new Date(startDate.setDate(startDate.getDate() + num))
          currentDateArr.push(alldate)
        }

        const arr = currentDateArr.map((v, i) => ({
          category: edit ? currentPost.category : category,
          startDate: moment(currentDateArr[0]).format("YYYY-MM-DD"),
          endDate: moment(endDate).format("YYYY-MM-DD"),
          currentDate: moment(v).format("YYYY-MM-DD"),
          date: {
            daymonth: v.getMonth(),
            number: v.getDate(),
          },
          // nowDay,
          content: {
            title: title.trim().length ? title : "제목없음",
          },
          bgColor,
          section: setDate - i,
        }))

        if (edit) {
          dispatch(editPostRequest(arr))
        } else {
          dispatch(listAddRequest(arr))
        }
        setTitle("")
        setEdit(null)
        dispatch(popupClose())
      },
      [nowDay, postList, title, bgColor, startDate, endDate],
    )
    const onChangeInput = useCallback((e) => {
      setTitle(e.target.value)
    }, [])

    const onClose = useCallback(() => {
      dispatch(popupClose())
    }, [])

    return (
      <Popup style={style} ref={ref}>
        <CloseBtn onClick={onClose}>
          <X size={25} />
        </CloseBtn>
        <Form onSubmit={onSubmit}>
          <Input
            type="text"
            placeholder="제목.."
            value={title}
            onChange={onChangeInput}
          />
          <DateBox>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              locale="ko"
            />
            <span>-</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              locale="ko"
            />
          </DateBox>
          <SelectOption setBgColor={setBgColor} />
          <SubmitBtn type="submit">저장</SubmitBtn>
        </Form>
      </Popup>
    )
  }),
)

WritePopup.propTypes = {
  style: PropTypes.object.isRequired,
}
WritePopup.displayName = "WritePopup"

export default WritePopup
