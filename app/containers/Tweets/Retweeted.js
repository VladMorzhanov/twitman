import React from 'react'
import styled from 'styled-components'

const RetweetedWrapper = styled.div`
  font-size: 12px !important;
  display: flex;
  margin-bottom: 8px;
  margin-left: -22px;
  align-items: center;  
  color: #657786;
  i{
    color:#4abaff;
    margin-right: 8px;
  }
  p{
    font-family: Helvetica, serif;
    padding: 0; 
    margin: 0;
  }
`

export default function Retweeted () {
  return (
    <RetweetedWrapper>
      <i className='fa fa-share-alt'/>
      <p>You Retweeted</p>
    </RetweetedWrapper>
  )
}
