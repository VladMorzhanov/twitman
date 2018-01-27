import React from 'react'
import TweetProfilePhoto from './TweetProfilPhoto'
import TweetMedia from './TweetMedia'
import Retweeted from './Retweeted'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
  display: flex;
`

const HeaderContent = styled.div`
  margin-bottom: 10px;
`

const Dot = styled.i`
  margin-right: 4px;
  &:before { content:"\\00b7"; }
`

const HeaderNameDate = styled.p`
  font-family: Helvetica, serif;
  display: flex;
  margin: 0;
  padding: 0;
`

const HeaderName = styled.span`
   font-weight: 600;
   margin-right: 8px;
`

const HeaderScreenName = styled.a`
  margin-right: 4px;
   color: #7f8387;
      cursor: pointer;
     text-decoration:none !important;
  &:hover{
    text-decoration:underline !important;
  }
`

const HeaderDate = styled.span`
   
`

const HeaderFullText = styled.p`
  font-family: Helvetica, serif;
  margin: 0;
  padding: 0;
 a.hashtag{
   color:#249cff;
     cursor: pointer;
   text-decoration:none !important;
  &:hover{
    text-decoration:underline !important;
  }
 } 
 a.link{
   cursor: pointer;
  text-decoration:none !important;
  &:hover{
    text-decoration:underline !important;
  }
 }
`

const BottomToolbar = styled.div`
  display: flex;
`

const Retweet = styled.div`
  color: ${props => props.retweeted ? '#249cff' : 'transparent'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 32px;
  font-family: Helvetica, serif;
  font-size: 13px;
  i{
    margin-right: 6px;
  }
`

const Likes = styled.div`
  cursor: pointer;
  color: ${props => props.favorited ? '#da0052' : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 32px;
  font-family: Helvetica, serif;
  font-size: 13px;
  i{
    margin-right: 6px;
  }
`

const TweetWrapper = styled.div`
background-color: #fff;
  font-size: 14px !important;
  max-width: ${props => props.width};
  padding: 14px;
  padding-left: 70px;  
  padding-top: 20px; 
  border-bottom: 1px solid rgba(188,188,191,0.31);
  word-break: break-all;
  margin-top: 0;
  margin-bottom: 0;
`

export default function Tweet (props) {
  const tweet = props.tweet
  const retweeted = props.retweeted
  return (
    <TweetWrapper width={(props.width || '650px') + 'px'}>
      {retweeted ? <Retweeted/> : null}
      <HeaderWrapper>
        <TweetProfilePhoto>
          <img src={tweet.user.profile_image_url_https}/>
        </TweetProfilePhoto>
        <HeaderContent>
          <HeaderNameDate>
            <HeaderName>{tweet.user.name}</HeaderName>
            <HeaderScreenName>@{tweet.user.screen_name}</HeaderScreenName>
            <Dot/>
            <HeaderDate>{tweet.created_at.substr(0, 9)}</HeaderDate>
          </HeaderNameDate>
          <HeaderFullText
            dangerouslySetInnerHTML={prepareText(tweet.full_text)}/>
        </HeaderContent>
      </HeaderWrapper>
      {generateEntities(tweet)}
      <BottomToolbar>
        <Retweet retweeted={tweet.favorited}>
          <i className='fa fa-share'/>
          <span>{tweet.retweet_count}</span>
        </Retweet>
        <Likes favorited={tweet.favorited}>
          <i className='fa fa-heart'/>
          <span>{tweet.favorite_count}</span>
        </Likes>
      </BottomToolbar>
    </TweetWrapper>
  )
}

function prepareText (text) {
  text = hashtagfy(text)
  return {__html: urlify(text)}
}

function hashtagfy (text) {
  const hashRegex = /(#[a-z0-9][a-z0-9\-_]*)/ig
  return text.replace(hashRegex, function (hash) {
    return '<a class="hashtag">' + hash + '</a>'
  })
}

function urlify (text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  return text.replace(urlRegex, function (url) {
    return '<a class="link" target="_blank" href="' + url + '">' + url + '</a>'
  })
}

function generateEntities (tweet) {
  if (tweet.extended_entities) {
    if (tweet.extended_entities.media) {
      return (<TweetMedia media={tweet.extended_entities.media}/>)
    }
  }
  if (tweet.entities) {
    if (tweet.entities.media) {
      return (<TweetMedia media={tweet.entities.media}/>)
    }
  }
}
