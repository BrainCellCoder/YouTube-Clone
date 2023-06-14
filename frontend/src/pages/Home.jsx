import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get("http://localhost:8000/api/videos/random");
      console.log(res.data.videos);
      setVideos(res.data.videos);
    };
    fetchVideos();
  }, []);
  return (
    <Container>
      {videos.map((video) => {
        return <Card key={video._id} />;
      })}
    </Container>
  );
};

export default Home;
