/**
 *
 * Messages
 *
 */

import React from 'react'
import styled from 'styled-components'

const MessagesWrapper = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  bottom: 20px;
  right: 20px;
  background-color: transparent;
  z-index: 10;
  cursor: pointer;
`
const Message = styled.p`
    font-family: Helvetica, sans-serif;
    background: #249cff;
    padding: 20px;
    font-size: 16px;
    color: #f4fcff;
    cursor: pointer;
    transition: background 0.6s;
    &:hover {
      background: #249cff;
    }
`

function Messages (props) {
  return (
    <MessagesWrapper>
      {props.messages.map(function (message) {
        return <Message
          key={message.id}
          onClick={(e) => props.removeMessage(e, message.id)}>
          {message.message}
        </Message>
      })}
    </MessagesWrapper>
  )
}

Messages.propTypes = {}

export default Messages
