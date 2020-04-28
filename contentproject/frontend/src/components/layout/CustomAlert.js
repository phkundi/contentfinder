import React from "react";
import styled from "styled-components";

const AlertContainer = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 30px;
  box-shadow: ${(props) => props.theme.boxShadow.medium};
  display: flex;
  justify-content: center;
  z-index: 2000;
`;

const AlertCloseButton = styled.button`
  border: none;
  outline: none;
  font-size: 1.2rem;
  background-color: transparent;
`;

const AlertMessage = styled.p`
  margin: 0;
  padding: 0;
`;

const AlertType = styled.i`
  color: ${(props) => props.theme.alertTypes[props.alertType]};
  font-size: 1.5rem;
  margin-right: 1rem;
`;

function CustomAlert({ style, options, message, close }) {
  return (
    <AlertContainer style={style}>
      {options.type === "info" && (
        <AlertType alertType="info" className="fas fa-info-circle" />
      )}
      {options.type === "success" && (
        <AlertType alertType="success" className="fas fa-check-circle" />
      )}
      {options.type === "error" && (
        <AlertType alertType="error" className="fas fa-exclamation-circle" />
      )}
      <AlertMessage>{message}</AlertMessage>
      {/* <AlertCloseButton onClick={close}>
        Close <i className="fas fa-times" />
      </AlertCloseButton> */}
    </AlertContainer>
  );
}

export default CustomAlert;
