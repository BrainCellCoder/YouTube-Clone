import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// background-color: ${({ theme }) => theme.bgLighter};
// color: ${({ theme }) => theme.text};
const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: #212529;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid grey;
  color: #fff;
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Desc = styled.textarea`
  border: 1px solid grey;
  color: #fff;
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #343a40;
  border: none;
  outline: none;
  color: #fff;
  cursor: pointer;
  border-radius: 3px;
`;

const Label = styled.label`
  font-size: 14px;
`;

export const Upload = ({ setOpen }) => {
  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a Video</Title>
        <Label>Video:</Label>
        <Input type="file" accept="video/*" />
        <Input type="text" placeholder="Title" />
        <Desc placeholder="Description" rows={8} />
        <Label>Image:</Label>
        <Input type="text" placeholder="Separate text with commas" />
        <Input type="file" accept="image/*" />
        <Button>Upload</Button>
      </Wrapper>
    </Container>
  );
};
