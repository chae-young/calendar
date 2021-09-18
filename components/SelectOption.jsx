import React, { useCallback, useState } from "react"
import PropTypes from "prop-types"

import { useSelector, useDispatch } from "react-redux"

import styled from "styled-components"

const ColorList = styled.ul`
  display: flex;
  margin-top: 10px;
  > li {
    width: 15px;
    height: 15px;
    border-radius: 100%;

    &.active {
      border: 1px solid rgb(0, 0, 0);
    }
    &:hover {
      border: 1px solid rgb(0, 0, 0);
    }
    + li {
      margin-left: 10px;
    }
  }
`

const SelectOption = ({ setBgColor }) => {
  const dispatch = useDispatch()
  const { nowDay } = useSelector((state) => state)
  const [colorSelect, setColorSelect] = useState(null)

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
    setColorSelect(index)
  }, [])

  return (
    <>
      <ColorList>
        {Object.values(bgColorObj).map((v, i) => (
          <li
            key={v}
            style={{ backgroundColor: `${v}` }}
            onClick={() => onColor(i)}
            className={colorSelect === i ? "active" : ""}
          />
        ))}
      </ColorList>
    </>
  )
}
SelectOption.propTypes = {
  setBgColor: PropTypes.func.isRequired,
}
export default SelectOption
