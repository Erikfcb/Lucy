import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { TOGGLE_LARGE_IMAGE } from "../../actions/types";

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.571);
  width: 100%;
  height: 100%;
  opacity: ${props => (props.show ? "1" : "0")};
  display: ${props => (props.show ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  transition: 0.3s;
`;

const ImageWrapper = styled.div`
  width: 550px;
  height: 550px;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const CloseBtn = styled.button`
  position: absolute;
  cursor: pointer;
  border-radius: 50%;
  top: -15px;
  left: -15px;
  width: 35px;
  height: 35px;
  font-size: 19px;
  display: flex;
  justify-content: center;
  outline: none;
  align-items: center;
`;

const Popup = ({ popupState, closePopup }) => {
  const { visible, link } = popupState;
  return (
    <PopupContainer show={visible}>
      <ImageWrapper>
        <Image src={link} />
        <CloseBtn onClick={closePopup}>X</CloseBtn>
      </ImageWrapper>
    </PopupContainer>
  );
};

function mapStateToProps({ popupState }) {
  return { popupState };
}

function mapDispatchToProps(dispatch) {
  return {
    closePopup: () =>
      dispatch({
        type: TOGGLE_LARGE_IMAGE
      })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Popup);
