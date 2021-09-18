import React, { useEffect, useState } from "react"

function active(target, colTop, popupHeight) {
  const colWidth = target.target.clientWidth
  let upY
  if (window.innerHeight < colTop + popupHeight) {
    upY = colTop - popupHeight / 2
  } else {
    upY = Math.min(colTop, target.clientY)
  }

  const setStyle = {}
  const x = Array(7)
    .fill()
    .map((v, i) => colWidth * i)
  const closest = x.reduce((acc, curr) => {
    return acc < target.clientX && target.clientX < curr ? acc : curr
  })
  if (window.innerWidth < 1199) {
    setStyle.top = 0
    setStyle.left = 0
  } else if (window.innerWidth / 2 < target.clientX) {
    // 오른쪽
    const rightX = window.innerWidth - closest
    if (window.innerHeight / 2 > target.clientY) {
      // console.log("오른쪽위")
      setStyle.top = upY
      setStyle.right = rightX
    } else {
      // console.log("오른쪽 아래")
      setStyle.top = upY
      setStyle.right = rightX
    }
  } else if (window.innerWidth / 2 > target.clientX) {
    // 왼쪽
    const leftX = closest + colWidth
    if (window.innerHeight / 2 > target.clientY) {
      // console.log("왼쪽위")
      setStyle.top = upY
      setStyle.left = leftX
    } else {
      // console.log("왼쪽 아래")
      setStyle.top = upY
      setStyle.left = leftX
    }
  }
  return setStyle
}

export default function usePositionStyle({ target, colTop, popupHeight }) {
  const [inlineStyle, setInlineStyle] = useState({ display: "block" })

  useEffect(() => {
    if (target) {
      setInlineStyle(active(target, colTop, popupHeight))
    }
  }, [target, colTop, popupHeight])

  return inlineStyle
}
