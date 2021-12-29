import styled from "styled-components";

const GridDiv = styled.div`
  margin: 40px auto;
  padding: 0;
  width: ${(props) => props.side * 6}px;
  height: ${(props) => props.side * 6}px;
  display: grid;
  grid-template-columns: repeat(${(props) => props.side}, 6px);
  gap: 0;

  & div {
    width: 4px;
    height: 4px;
  }
`;

export default GridDiv;
