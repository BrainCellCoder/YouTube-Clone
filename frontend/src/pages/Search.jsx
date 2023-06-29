import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch(
        `http://localhost:8000/api/videos/search${query}`
      );
      const data = await res.json();
      console.log(data);
      setVideos(data.videos);
    };
    fetchVideos();
  }, [query]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};
