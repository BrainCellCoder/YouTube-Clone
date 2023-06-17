import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  justify-content: space-around;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`http://localhost:8000/api/videos/${type}`, {
        headers: {
          Authorization: `${localStorage.getItem("access_token")}`,
        },
      });
      setVideos(res.data.videos);
    };
    fetchVideos();
  }, [type]);
  return (
    <Container>
      {videos.map((video) => {
        return <Card key={video._id} video={video} />;
      })}
    </Container>
  );
};

export default Home;
