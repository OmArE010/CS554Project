import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "../App.css";

const fakeMessages = [{}, {}];

function Messages() {
  const [state, setState] = useState({ message: "", name: "", room: "" });
  const [chat, setChat] = useState([]);
  const [room, setRoom] = useState("Room1");

  const socketRef = useRef();
  const chatLogRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("/");
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    socketRef.current.on("message", ({ name, message, roomName }) => {
      setChat([...chat, { name, message, roomName }]);
    });
    socketRef.current.on("user_join", function (data) {
      setChat([
        ...chat,
        {
          name: "ChatBot",
          message: `${data} has joined the ${room}`,
          roomName: room,
        },
      ]);
    });

    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }

    return () => {
      socketRef.current.off("message");
      socketRef.current.off("user_join");
    };
  }, [chat]);

  const userjoin = (name) => {
    socketRef.current.emit("user_join", name);
  };

  const onMessageSubmit = (e) => {
    let msgEle = document.getElementById("message");
    setState({ ...state, [msgEle.name]: msgEle.value });
    socketRef.current.emit("message", {
      name: state.name,
      message: msgEle.value,
      roomName: room,
    });
    e.preventDefault();
    setState({ message: "", name: state.name, roomName: room });
    msgEle.value = "";
    msgEle.focus();
  };

  // const renderChat = () => {
    
  //   return chat.map(({ name, message, roomName }, index) => {
  //     if (roomName === room) {
  //       console.log(`name, state.name: ${name} ${state.name}`);
  //       return (
  //         <div key={index}>
  //           {name === state.name ? (
  //             <br />
  //           ) : (
  //             <h3
  //               id="chatm"
  //               className="chat-name"
  //             >
  //               {name}
  //             </h3>
  //           )}
  //           <span
  //             className={
  //               name === state.name ? "chat-message self" : "chat-message"
  //             }
  //           >
  //             {message}
  //           </span>
  //         </div>
  //       );
  //     }
  //     return null;
  //   });
  // };

  const renderChat = () => {
    let prevSender = null;
    return chat.map(({ name, message, roomName }, index) => {
      if (roomName === room) {
        const sameSender = prevSender === name;
        prevSender = name;
        return (
          <div key={index}>
            {!sameSender && name!==state.name && (
              <h3 className="chat-name">
                {name}
              </h3>
            )}
            <span
              className={name===state.name ? "chat-message self" : "chat-message"}
            >
              {message}
            </span>
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div class="messages">
      {state.name && (
        <div className="messages-container">
          <div className="messages-bar">
            <h2>Messages {socketRef.current.id}</h2>
            <div className="messages-list">
              <div className="messages-users">
                {/* {users.map((user) => (
                    <p key={user.socketID}>{user.userName}</p>
                  ))} */}
                <div>
                  <button
                    onClick={() => {
                      setRoom("Room1");
                      socketRef.current.emit("room", "Room1");
                    }}
                  >
                    Join Room 1
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setRoom("Room2");
                      socketRef.current.emit("room", "Room2");
                    }}
                  >
                    Join Room 2
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="messages-body">
            <div className="render-chat">
              <p className="room-chat">{room}</p>
              <div className="chat-log" ref={chatLogRef}>
                {renderChat()}
              </div>
              <form className="send-box" onSubmit={onMessageSubmit}>
                <div>
                  <input
                    name="message"
                    id="message"
                    variant="outlined"
                    label="Message"
                    placeholder="Type a message..."
                  />
                  <button type="submit">{">"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {!state.name && (
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            setState({ name: document.getElementById("username_input").value });
            userjoin(document.getElementById("username_input").value);
            // userName.value = '';
          }}
        >
          <div className="form-group">
            <label>
              User Name:
              <br />
              <input id="username_input" />
            </label>
          </div>
          <br />

          <br />
          <br />
          <button type="submit"> Click to join</button>
        </form>
      )}
    </div>
  );
}

export default Messages;
