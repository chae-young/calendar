import React, { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux"

const DayList = ({ post, index, onClickPop }) => {
  const { dayList } = useSelector((state) => state)

  const sectionVal = 7 - index
  const sectionWidth =
    sectionVal - post.section > 0 ? post.section + 1 : sectionVal

  console.log(sectionVal, "ddddddd")
  return (
    <>
      <li
        style={{
          width: `calc(100% * ${sectionWidth})`,
          backgroundColor: `${post.bgColor}`,
        }}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <button type="button">{post.content.title}</button>
        {/* onClick={(e) => onClickPop(data, e)} */}
      </li>
    </>
  )
}

export default DayList
