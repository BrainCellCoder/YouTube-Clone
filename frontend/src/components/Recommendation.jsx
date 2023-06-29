import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
  flex: 2;
`;

export const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch(
        `http://localhost:8000/api/videos/tags?tags=${tags}`
      );
      const data = await res.json();
      console.log(data);
      setVideos(data.videos);
    };
    fetchVideos();
  }, [tags]);

  return (
    <Container>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video}></Card>
      ))}
    </Container>
  );
};
