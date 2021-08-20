import React, { useState, useEffect, useCallback } from "react"
import { X } from "react-bootstrap-icons"
import style from "styled-components"
import EditPopup from "./EditPopup"

const MoreListPopWrap = style.div`
    position:absolute;
    left:50%;
    top:0;
    transform:translateX(-50%);
    width:calc(100% + 10px);
    background:#fff;
    -webkit-box-shadow: 0px 1px 11px 5px rgba(0,0,0,0.33); 
    box-shadow: 0px 1px 11px 5px rgba(0,0,0,0.33); 
    
    & button{
        position:absolute;
        right:0;
        top:0;
    }
`

const MoreListPopup = ({ post }) => {
  console.log(post)
  const [editPopup, setEditPopup] = useState(false)
  const [currentList, setCurrentList] = useState([])
  const onClickPop = (list) => {
    setCurrentList((prev) => [list])
    setModifyPop(true)
  }
  return (
    <MoreListPopWrap onClick={(e) => e.stopPropagation()}>
      {/* <strong>{list[0].weekDay}</strong> */}
      <ul>
        {post.map((v, i) => (
          <li onClick={(post) => onClickPop(v)}>{v.content.title}</li>
        ))}
      </ul>
      <button>
        <X />
      </button>
      {editPopup && <EditPopup currentList={currentList} />}
    </MoreListPopWrap>
  )
}

export default MoreListPopup
