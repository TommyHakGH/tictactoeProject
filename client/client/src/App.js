import './App.css';
import React, { useEffect } from 'react';
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Cookies from "universal-cookie";
import { StreamChat } from 'stream-chat';

function App() {
  const api_key = process.env.APIKEY
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);

  useEffect(() => {
    if (token) {
      client.connectUser({
        id: cookies.get("userId"),
        name: cookies.get("username"),
        firstName: cookies.get("firstName"),
        lastName: cookies.get("lastName"),
        hashedPassword: cookies.get("hashedPassword"),
      }, token).then((user) => {
        console.log(user);
      });
    }
  }, []);
  return (
    <div className="App">
      <SignUp />
      <Login />
    </div>
  );
}

export default App;
