import React, { Component } from "react";
import axios from "axios/index";

import Cookies from "universal-cookie";
import { v4 as uuid } from "uuid";

import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";
import "./chat.css";

const cookies = new Cookies();

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      {/* <img className="onlineIcon" src={onlineIcon} alt="online" /> */}
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      {/* <a href="/">
        <img src={closeIcon} alt="close" />
      </a> */}
    </div>
  </div>
);

class Chatbot extends Component {
  messagesEnd;
  constructor(props) {
    super(props);

    this.handleInputKeyPress = this.handleInputKeyPress.bind(this);
    this.state = {
      messages: [],
      sessionId: uuid(),
    };
    if (cookies.get("userID") === undefined) {
      cookies.set("userID", uuid(), { path: "/" });
    }
    console.log(cookies.get("userID"));
  }

  async df_text_query(queryText) {
    let says = {
      speaks: "me",
      msg: {
        text: {
          text: queryText,
        },
      },
    };

    this.setState({ messages: [...this.state.messages, says] });

    const res = await axios.post("/api/df_text_query", {
      text: queryText,
      userID: cookies.get("userID"),
    });

    for (let msg of res.data.fulfillmentMessages) {
      says = {
        speaks: "bot",
        msg: msg,
      };
      this.setState({ messages: [...this.state.messages, says] });
    }
  }

  async df_event_query(eventName) {
    const res = await axios.post("/api/df_event_query", {
      event: eventName,
      userID: cookies.get("userID"),
    });

    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        speaks: "bot",
        msg: msg,
      };
      this.setState({ messages: [...this.state.messages, says] });
    }
  }

  async setMessagesDB(msgs, sessionId) {
    var last_element = msgs[msgs.length - 1];
    var lastmsg = last_element.msg.text.text;
    let dropOffmsg = Array.isArray(lastmsg) ? lastmsg[0] : lastmsg;

    const res = await axios.post("/api/saveMsgs", {
      messages: msgs,
      userId: cookies.get("userID"),
      sessionId: sessionId,
      dropOff: dropOffmsg,
    });

    // console.log(dropOffmsg, lastmsg, sessionId);
  }

  componentDidMount() {
    this.df_event_query("Welcome");
    this.nameInput.focus();
  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    this.setMessagesDB(this.state.messages, this.state.sessionId);
  }

  renderMessages(stateMessages) {
    if (stateMessages) {
      return stateMessages.map((message, i) => {
        return (
          <Message
            key={i}
            speaks={message.speaks}
            text={message.msg.text.text}
          />
        );
      });
    } else {
      return null;
    }
  }

  handleInputKeyPress(e) {
    if (e.key === "Enter") {
      this.df_text_query(e.target.value);
      e.target.value = "";
      e.preventDefault();
    }
  }

  render() {
    return (
      <div className="outerContainer bgcontainer">
        <div className="container bgcontainer">
          <InfoBar room="Chat Bot" />
          <ScrollToBottom className="messages">
            {this.renderMessages(this.state.messages)}
            <div
              ref={(el) => {
                this.messagesEnd = el;
              }}
              style={{ float: "left", clear: "both" }}
            ></div>
          </ScrollToBottom>
          <form className="form">
            <input
              ref={(input) => {
                this.nameInput = input;
              }}
              className="input"
              type="text"
              placeholder="Type a message..."
              onKeyPress={this.handleInputKeyPress}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Chatbot;
