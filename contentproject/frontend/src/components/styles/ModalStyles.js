import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  overscroll: hidden;
  overscrollY
`;

export const ModalContainer = styled.div`
  background-color: #fff;
  box-shadow: ${(props) => props.theme.boxShadow.medium};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 4;
  width: 30%;
  padding: 2rem;
  border: 2px solid rgba(0, 0, 0, 0.3);
`;

export const ModalHeader = styled.div`
  padding-bottom: 1rem;
  font-weight: 500px;
  margin-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  text-align: center;
`;

export const ModalBody = styled.div`
  padding-top: 1rem;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1rem;

  & > button {
    margin: 0 1rem;
    border-radius: 15px;
  }
`;
