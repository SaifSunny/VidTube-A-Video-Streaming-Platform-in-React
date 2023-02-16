import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../utils/constants";

const VideoCard = ({video: {id: {videoId}, snippet}}) => {
return (
<Card sx={{width: {md:'300px', xs:'100%'}}}>
  <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
  <CardMedia alt={snippet?.title} sx={{ width: 358, height: 180 }} image={snippet?.thumbnails?.high?.url}></CardMedia>
  </Link>
  <CardContent sx={{backgroundColor: '#1e1e1e', height: '106px'}}>
    <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
      <Typography variant="subtitle1" fontWeight="bold" color="#fff">
        {snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}
      </Typography>
    </Link>

    <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
      <Typography variant="subtitle2" fontWeight="bold" color="gray">
        {snippet?.channelTitle || demoChannelTitle}
        <CheckCircle sx={{fontSize: 13, color: 'gray', ml: '3px'}}/>
      </Typography>
    </Link>
  </CardContent>
</Card>
)
}

export default VideoCard