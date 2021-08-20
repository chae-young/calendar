import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"

const DayList = ({ post, onClickPop }) => {
  const { dayList } = useSelector((state) => state)

  return (
    <>
      <ul>
        {post.map(
          (v, i) =>
            i < 2 && (
              <li
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <button type="button">{v.content.title}</button>
                {/* onClick={(e) => onClickPop(data, e)} */}
              </li>
            ),
        )}
      </ul>
    </>
  )
}

export default DayList
