import React from 'react'
import styled from 'styled-components'

const TweetVideo = styled.video`
  width: 100%;
  height: auto;
  display: block;
`

const TweetImage = styled.img`
  border-radius: 10px;
  width: 100%;
  height: auto;
  display: block;
`

const Medias = styled.div`
  width: 100%;
  height: auto;
  display: block;
  margin-bottom: 14px;
`
export default function TwitMedia (props) {
  const medias = props.media
  return (
    <Medias>
      {medias.map(function (media) {
        return parseMedia(media)
      })}
    </Medias>
  )
}

function parseMedia (media) {
  if (media.video_info) {
    return <TweetVideo muted={true} loop autoPlay key={media.id}>
      <source src={media.video_info.variants[0].url}/>
    </TweetVideo>
  } else {
    return <TweetImage key={media.id} src={media.media_url_https}/>
  }
}
