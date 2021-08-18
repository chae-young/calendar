import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"

const DayList = ({ data, onClickPop }) => {
  const { dayList } = useSelector((state) => state)

  return (
    <>
      <li
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <button type="button" onClick={(e) => onClickPop(data, e)}>
          {data.title}
        </button>
      </li>
    </>
  )
}

export default DayList
