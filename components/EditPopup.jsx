import React, { useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Pencil, Trash, X } from "react-bootstrap-icons"
import { ButtonGroup, Button } from "react-bootstrap"

import { CURRENT_INFO_REQUEST, WRITE_POPUP_OPEN } from "../reducers"

const EditPopup = ({ currentList, setEditPopup }) => {
  const dispatch = useDispatch()
  const { currentInfoDone } = useSelector((state) => state)

  useEffect(() => {
    console.log(currentInfoDone)
    if (currentInfoDone) {
      dispatch({ type: WRITE_POPUP_OPEN })
      setEditPopup(false)
    }
  }, [currentInfoDone])

  const onClickEdit = useCallback(() => {
    dispatch({
      type: CURRENT_INFO_REQUEST,
      data: { id: currentList.id },
    })
    // setEditPopup(false)
  }, [currentInfoDone])

  const onClose = useCallback(() => {
    setEditPopup(false)
  }, [])
  return (
    <>
      <div>
        <ButtonGroup aria-label="Basic">
          <Button variant="secondary" onClick={onClickEdit}>
            <Pencil size={12} />
          </Button>
          <Button variant="secondary">
            <Trash size={12} />
          </Button>
          <Button variant="secondary" onClick={onClose}>
            <X />
          </Button>
        </ButtonGroup>
        <h3>{currentList.title}</h3>
      </div>
    </>
  )
}

export default EditPopup
