import React, { useCallback } from "react"
import PropTypes from "prop-types"

import { X } from "react-bootstrap-icons"

import styled from "styled-components"

const MoreListPopWrap = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-inder: 10;
  width: 100%;
  height: 90%;
  background: #fff;
  -webkit-box-shadow: 0px 1px 11px 5px rgba(0, 0, 0, 0.33);
  box-shadow: 0px 1px 11px 5px rgba(0, 0, 0, 0.33);
  overflow-y: auto;
  & button {
    position: absolute;
    right: 0;
    top: 0;
    background: rgb(255, 255, 255);
    border-radius: 100%;
    width: 25px;
    height: 25px;
  }
`
const MoreList = styled.li`
  padding: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`

const MoreListPopup = ({ post, setMoreClick, onClickPop }) => {
  const onClose = useCallback(() => {
    setMoreClick(false)
  }, [])

  return (
    <MoreListPopWrap onClick={(e) => e.stopPropagation()}>
      {/* <strong>{list[0].weekDay}</strong> */}
      <ul>
        {post.map((v, i) => (
          <MoreList
            key={v.currentDate}
            style={{ backgroundColor: `${v.bgColor}` }}
            onClick={(post) => onClickPop(v)}
          >
            {v.content.title}
          </MoreList>
        ))}
      </ul>
      <button onClick={onClose}>
        <X />
      </button>
    </MoreListPopWrap>
  )
}
MoreListPopup.propTypes = {
  post: PropTypes.object.isRequired,
  setMoreClick: PropTypes.func.isRequired,
  onClickPop: PropTypes.func.isRequired,
}
export default MoreListPopup
