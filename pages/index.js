import React, {useState, useEffect} from 'react'
import HeaderBlock from "../components/header/Header";
import Menu from "../components/navigation/Menu";
import io from 'socket.io-client'

const Home = () => {
  const [message, setMessage] = useState('');
  const [socket] = useState(io());

  useEffect(() => {
    socket.on('now', (data) => { setMessage(data.message)});
  });

  return (
    <div>
      <HeaderBlock/>
      <Menu/>
    </div>
  )
}

export default Home
