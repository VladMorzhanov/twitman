/**
 *
 * ComposeTweet
 *
 */

import React from 'react'
import {createStructuredSelector} from 'reselect'
import styled from 'styled-components'

const ComposeTweetDarkness = styled.div`
  z-index: 2000;
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.64);
`

const ComposeTweetWrapper = styled.div`
  background-color:#fff;
  border-radius: 6px;
  position: fixed;
  top: 10%;
  left: 50%;
  overflow: hidden;
  margin-left: -305px;
  height: 210px;
  width: 610px;
`

const ComposeTweetHeader = styled.div`
  height: 50px;
  padding: 12px;
  display: flex;
  border-bottom: solid 1px rgba(78,40,94,0.25);
  p{
    font-family: Helvetica, sans-serif;
    width: 250px;
    text-align: center;
    margin: auto;
    font-weight: bold;
    padding-left: 30px;
    font-size: 18px;
  }
  i{
    width: 20px;
    height: 20px;
  }
`

const CloseButton = styled.i`
  font-size: 18px;
  color:#a4a4a4;
  cursor: pointer;
  &:hover{
      color:#7f7f7f;
  }
`

const ComposeTweetContent = styled.div`
   background: rgba(78,40,94,0.1);
   height: 110px;
   padding: 12px;
   display: flex;
`

const ProfilePhoto = styled.div`
  background-color:#fff;
  border-radius: 50%;
  width: 32px;  
  height: 32px;
  margin-right: 12px;
  img{
    border-radius: 50%;
    width: 32px;  
    height: 32px;
  }
`

const ComposeTweetText = styled.textarea`
  background: #fff;
  padding: 8px;
  resize: none;
  font-size: 14px;
  font-family: Helvetica, sans-serif;
  border: 1px solid #e6ecf0;
  border-radius: 8px;
  height: 100%;
  width: 100%;
  transition: all .1s ease-in-out;
  &:focus{
      background-color: #fff;
      border: 1px solid rgba(69,0,132,0.42);
  }
`

const ComposeTweetBottomToolbar = styled.div`
   display: flex;
   align-items: flex-start;
   justify-content: space-between;  
   background: rgba(78,40,94,0.1);
   padding: 10px;
   padding-top: 2px;
   height: 50px;
`

const ComposeTweetButton = styled.button`
  cursor: pointer;
  width: 70px;  
  margin: -2px 0 0 16px;
  line-height: 35px;  
  text-align: center;
  height: 35px;
  border-radius: 100px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  font-family: Helvetica, sans-serif;
  background-color: #71527E;
  &:hover{
      background-color: #573c5d;
  }
`

const SendMultipleCheckbox = styled.div`
    display: flex;
    margin-left: 45px;
    align-items: center;
    font-family: Helvetica, sans-serif;
    font-size: 14px;  
    cursor: pointer;
    height: 30px; 
    width: 210px; 
    input{
      margin-right: 8px;
      cursor: pointer;
    }
    p.title{
      font-family: Helvetica, sans-serif;
      font-size: 14px; 
    }
`

class ComposeTweet extends React.PureComponent {
  constructor () {
    super()
    this.state = {
      multiple: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
  }

  handleTextChange (e) {
    this.setState({tweetText: e.target.value})
  }

  handleCheckboxChange (e) {
    this.setState({multiple: e.target.checked})
  }

  handleClick (e) {
    switch (e.target.id) {
      case 'send':
        this.props.sendTweet(this.state.tweetText, this.state.multiple)
        this.props.hideComposeTweet()
        break
      case 'close':
        this.props.hideComposeTweet()
        break
    }
  }

  render () {
    if (!this.props.user) {
      return null
    }

    const profilePhoto = this.props.user.get('profile_image_url_https')

    return (
      <ComposeTweetDarkness>
        <ComposeTweetWrapper>
          <ComposeTweetHeader>
            <p>Compose new Tweet</p>
            <CloseButton id="close"
                         onClick={(e) => this.handleClick(e)}
                         className="fa fa-close"/>
          </ComposeTweetHeader>
          <ComposeTweetContent>
            <ProfilePhoto>
              <img src={profilePhoto}/>
            </ProfilePhoto>
            <ComposeTweetText
              value={this.state.tweetText}
              onChange={this.handleTextChange}
              placeholder="What's happening?"/>
          </ComposeTweetContent>
          <ComposeTweetBottomToolbar>
            <SendMultipleCheckbox>
              <input type='checkbox'
                     onChange={this.handleCheckboxChange}
                     checked={this.state.multiple}/>
              <p className='title'>Send to all accounts</p>
            </SendMultipleCheckbox>
            <ComposeTweetButton
              id="send"
              onClick={(e) => this.handleClick(e)}>Tweet</ComposeTweetButton>
          </ComposeTweetBottomToolbar>
        </ComposeTweetWrapper>
      </ComposeTweetDarkness>
    )
  }
}

export default ComposeTweet
