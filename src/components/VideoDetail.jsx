import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { height } from "@mui/system";

const VideoDetail = () => {
const [videoDetail, setVideoDetail] = useState(null);
const [videos, setVideos] = useState(null);
const { id } = useParams();

useEffect(() => {
fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
.then((data) => setVideoDetail(data.items[0]))

fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
.then((data) => setVideos(data.items))
}, [id]);

if(!videoDetail?.snippet) return
<Loader />;

const { snippet: { title, channelId, channelTitle, description, publishedAt }, statistics: { viewCount, likeCount } } =
videoDetail;

return (
<Box minHeight="95vh">
  <Stack direction={{ xs: "column", md: "row" }}>
    <Box flex={1}>
      <Box sx={{ width: "100%", position: "sticky", top: "86px", overflowY: "scroll", paddingBottom: '40px'}}>
        <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="react-player" controls />
        <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
          {title}
        </Typography>
        <Stack direction="row" justifyContent="space-between" sx={{ color: "#fff" }} py={1} px={2}>
          <Link to={`/channel/${channelId}`}> <Typography variant={{ sm: "subtitle1", md: 'h5'}} color="#fff"
            fontFamily="Roboto" fontWeight="500" fontSize="20px">
          {channelTitle}
          <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px"}} />
          </Typography>
          </Link>
          <Stack direction="row" gap="20px" alignItems="center">
            <Typography variant="body1" sx={{ opacity: 0.7 }} fontSize="18px">
              {parseInt(viewCount).toLocaleString()} Views
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.7 }} fontSize="18px">
              {parseInt(likeCount).toLocaleString()} Likes
            </Typography>
          </Stack>
        </Stack>

        <Box>
          <Typography variant="body1" sx={{ color: 'white', margin:'30px',  }} fontSize="18px">
            {new Date(publishedAt).toLocaleString()} <br /><br />
            {description}
          </Typography>
        </Box>

      </Box>

    </Box>
    <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center">
      <Videos videos={videos} direction="column" />
    </Box>
  </Stack>
</Box>
);
};

export default VideoDetail;