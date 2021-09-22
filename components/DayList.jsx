import React, { useCallback } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"

import styled from "styled-components"
import { TextEllipsis } from "../style/common"
import { editModeStart } from "../reducers"

const CalenderList = styled.li`
  height: 30px;

  & button {
    display: block;
    width: 13.7vw;
    height: 100%;
    padding: 0 0 0 5px;
    box-sizing: border-box;
    font-size: 1.3rem;
    ${TextEllipsis};
  }
`
const Button = styled.button`
  display: block;
`
const DayList = ({ post, onClickPop, select, ...obj }) => {
  // const sectionVal = 7 - dayindex
  // const sectionWidth =
  //   sectionVal - post.section > 0 ? post.section + 1 : sectionVal

  // const left = useCallback(() => {
  //   const width = Math.floor(window.innerWidth / 7)
  //   return ((width * dayindex) / window.innerWidth) * 100
  // }, [])

  // const height = () => {
  //   return 30 * (index + 1)
  // }
  const dispatch = useDispatch()

  const bgColorRender = (color) => {
    let bg
    if (color) {
      bg = color
    } else {
      bg = "rgb(248,248,248)"
    }
    return bg
  }
  const onClicklist = useCallback(
    (e) => {
      // e.stopPropagation()
      dispatch(editModeStart())
      select(obj.day, obj.col, obj.target)
    },
    [obj],
  )
  return (
    <>
      <CalenderList
        style={{
          width: "100%",
          backgroundColor: `${bgColorRender(post.bgColor)}`,
        }}
        onClick={onClicklist}
      >
        <Button type="button" onClick={(e) => onClickPop(post, e)}>
          {post.content.title}
        </Button>
        {/* onClick={(e) => onClickPop(data, e)} */}
      </CalenderList>
    </>
  )
}
DayList.propTypes = {
  post: PropTypes.object.isRequired,
  onClickPop: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
}
export default DayList
