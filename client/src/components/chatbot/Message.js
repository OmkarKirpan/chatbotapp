import React from "react";

const Message = (props) => {
  return props.speaks === "bot" ? (
    <div className="messageContainer justifyStart">
      <p className="sentText pr-10 colorWhite">{props.speaks}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{props.text}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyEnd">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{props.text}</p>
      </div>
      <p className="sentText pl-10 colorWhite">{props.speaks}</p>
    </div>
  );
};

export default Message;
