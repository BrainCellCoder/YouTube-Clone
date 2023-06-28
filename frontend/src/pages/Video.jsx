import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useCookies } from "react-cookie";
import { subscription } from "../redux/userSlice";
import "./Video.css";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div`
  width: 100%;
  height: 500px;
`;

// const VideoFrame = styled.iframe`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   margin: 0 !important;
//   width: 100%;
//   padding: 0;
//   border: none;
//   outline: none;
// `;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Recommendation = styled.div`
  flex: 2;
`;
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});
  const [cookies] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoRes = await fetch(
          `http://localhost:8000/api/videos/find/${path}`
        );
        const videoData = await videoRes.json();
        const channelRes = await axios.get(
          `http://localhost:8000/api/users/find/${videoData.video.userId}`
        );
        // setVideo(videoData.video); //instead of using video state, use videoSlice(Redux)
        setChannel(channelRes.data.user);
        dispatch(fetchSuccess(videoData.video));
      } catch (err) {
        console.log(err);
      }
    };
    fetchVideo();
  }, [path, dispatch]);

  const handleLike = async () => {
    try {
      await fetch(`http://localhost:8000/api/users/like/${currentVideo._id}`, {
        method: "PUT",
        headers: {
          authorization: `${
            localStorage.getItem("access_token") || cookies.access_token
          }`,
        },
      });
      dispatch(like(currentUser._id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDislike = async () => {
    try {
      await fetch(
        `http://localhost:8000/api/users/dislike/${currentVideo._id}`,
        {
          method: "PUT",
          headers: {
            authorization: `${
              localStorage.getItem("access_token") || cookies.access_token
            }`,
          },
        }
      );
      dispatch(dislike(currentUser.user._id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubscription = async () => {
    console.log(currentUser.subscribedUsers.includes(channel._id));
    currentUser.subscribedUsers.includes(channel._id)
      ? await fetch(`http://localhost:8000/api/users/unsub/${channel._id}`, {
          method: "PUT",
          headers: {
            authorization: `${
              localStorage.getItem("access_token") || cookies.access_token
            }`,
          },
        })
      : await fetch(`http://localhost:8000/api/users/sub/${channel._id}`, {
          method: "PUT",
          headers: {
            authorization: `${
              localStorage.getItem("access_token") || cookies.access_token
            }`,
          },
        });
    dispatch(subscription(channel._id));
  };
  console.log(currentUser);

  return (
    <Container>
      <Content>
        {/* <VideoWrapper> */}
        {/* <VideoFrame src={currentVideo.videoUrl} /> */}
        <video width="100%" height="550px" controls={true} autoPlay={true}>
          <source src={currentVideo?.videoUrl} type="video/mp4" />
        </video>
        {/* </VideoWrapper> */}
        <Title>{currentVideo?.title}</Title>

        <Details>
          <Info>
            {currentVideo?.views} views • {format(currentVideo?.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel?.img} />
            <ChannelDetail>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>
                {channel?.subscribers} subscribers
              </ChannelCounter>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSubscription}>
            {currentUser?.subscribedUsers.includes(channel?._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments currentUser={currentUser} videoId={currentVideo._id} />
      </Content>
      {/* <Recommendation>
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
      </Recommendation> */}
    </Container>
  );
};

export default Video;
