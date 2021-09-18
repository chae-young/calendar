import React, { useEffect, useCallback } from "react"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"

import { Pencil, Trash, X } from "react-bootstrap-icons"
import { ButtonGroup, Button } from "react-bootstrap"

import styled from "styled-components"
import {
  currentInfoRequest,
  popupOpen,
  deletePostRequest,
  editModeClose,
} from "../reducers"

const Popup = styled.div`
  position: absolute;
  top: 0;
  z-index: 99;
  background: #fff;
  -webkit-box-shadow: 0px 6px 18px 4px #666666;
  box-shadow: 0px 6px 18px 4px #666666;
  @media screen and (max-width: 767px) {
    width: 260px;
    min-height: 260px;
    position: fixed;
    left: 0;
    top: 50%;
    left: 50%;
    z-index: 10;
    transform: translate(-50%, -50%);
  }
`
const EditButton = styled(Button)`
  background-color: #000000;
  border-color: #000000;
`
const PopupTitle = styled.p`
  padding: 1rem;
  color: rgb(0, 0, 0);
`
const EditPopup = ({ currentList, setEditPopup, ...obj }) => {
  const dispatch = useDispatch()
  const { currentPost } = useSelector((state) => state)

  useEffect(() => {
    if (currentPost) {
      dispatch(popupOpen())
      setEditPopup(false)
    }
  }, [currentPost])

  const onClickDelete = useCallback(() => {
    dispatch(deletePostRequest(currentList.category))
    setEditPopup(false)
  }, [currentList])

  const onClickEdit = useCallback(() => {
    dispatch(currentInfoRequest(currentList.category))
  }, [currentList])

  const onClose = useCallback(() => {
    dispatch(editModeClose())
    setEditPopup(false)
  }, [])
  return (
    <Popup onClick={(e) => e.stopPropagation()}>
      <ButtonGroup aria-label="Basic" style={{ backgroundColor: "#000" }}>
        <EditButton variant="secondary" onClick={onClickEdit}>
          <Pencil size={12} />
        </EditButton>
        <EditButton variant="secondary" onClick={onClickDelete}>
          <Trash size={12} />
        </EditButton>
        <EditButton variant="secondary" onClick={onClose}>
          <X />
        </EditButton>
      </ButtonGroup>
      <PopupTitle>{currentList.content.title}</PopupTitle>
    </Popup>
  )
}
EditPopup.propTypes = {
  currentList: PropTypes.object.isRequired,
  setEditPopup: PropTypes.func.isRequired,
}
export default EditPopup
