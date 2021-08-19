import React, { useCallback, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import moment from "moment"

import { COLOR_SELECT_REQUEST } from "../reducers"

const SelectOption = ({ setBgColor }) => {
  const dispatch = useDispatch()
  const { nowDay } = useSelector((state) => state)

  const bgColorObj = {
    purple1: "#cc99c9",
    blue1: "#9ec1cf",
    green1: "#9ee09e",
    yellow1: "#fdfd97",
    orange1: "#feb144",
    red1: "#ff6663",
  }

  const onColor = useCallback((index) => {
    setBgColor(Object.values(bgColorObj)[index])
  }, [])

  return (
    <>
      <ul>
        {Object.values(bgColorObj).map((v, i) => (
          <li
            key={v}
            style={{ backgroundColor: `${v}` }}
            onClick={() => onColor(i)}
          >
            {" "}
          </li>
        ))}
      </ul>
    </>
  )
}

export default SelectOption
