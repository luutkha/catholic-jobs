import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { useEffect, useState, useRef, KeyboardEventHandler } from 'react';
import io, { Socket } from 'socket.io-client';

type SockeData = {
  id: string
  message: string
  time: string
}

export const getStaticProps: GetStaticProps = async () => {

  const x = await fetch('https://jsonplaceholder.typicode.com/photos')
  const data = await x.json()
  // console.log('this is sdata' + data)
  return {
    props: {
      listImages: data,
    },
  }
}


const Home: NextPage = ({ listImages }: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log('re-render & connect ', new Date().toLocaleString())
  // const { socket, setSocket } = useConnectSocket()
  const [lastPong, setLastPong] = useState<string | null>(null);
  const [lastMessage, setLastMessage] = useState<SockeData[]>([])
  const [currendSocketId, setcurrendSocketId] = useState<string>()
  const [typedMessage, setTypedMessage] = useState("")
  let ioRef = useRef<Socket>()

  useEffect(() => {
    console.log('recall')
    ioRef.current = io("http://localhost:9000/")
    ioRef.current.on('send_message', (data: SockeData) => {
      console.log(data)
      setLastMessage((e) => [...e, data])
      const id: string | undefined = ioRef.current?.id
      console.log({ id })
      if (id)
        setcurrendSocketId(e => id)
    });

    return () => {
      // why need disconnect here
      console.log('disconnect')
      ioRef.current?.disconnect();
    };
  }, [])


  function requestConnect() {
    console.log('request connect to socket')
    ioRef.current?.on('connection', () => {
      console.log(ioRef.current?.io)
    });
    ioRef.current?.on('send_message', (data: any) => {
      console.log(data)
    });

  }
  const sendPing = () => {
    ioRef.current?.emit('ping');
  }
  function closeSocket() {
    ioRef.current?.close();
    console.log('status', ioRef.current?.connected)
  }
  function emitNewMessage() {
    console.log('emit new message')
    // socket?.emit("send_message", `${socket.id} send data: ${new Date().toLocaleString()}`);
    ioRef.current?.emit("send_message", { id: ioRef.current.id, message: typedMessage + '', time: new Date().toLocaleString() } as SockeData);
  }
  const renderList: React.ReactElement[] = lastMessage.map((m, i) => {
    return <div key={i} className={`font-bold text-white bg-sky-500 border rounded-xl flex flex-col gap-2 p-4 ${m.id === currendSocketId ? 'justify-end bg-gray-600 self-end' : 'self-start'} `}>

      <div>
        {m.message}
      </div>
    </div>
  })
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('enter press here! ')
      emitNewMessage()
    }
  }
  return (
    <div className='flex flex-col gap-2 p-2'>
      Your ID: {currendSocketId}
      <div className='flex  gap-2'>
        <input onChange={e => setTypedMessage(() => e.target.value || 'gửi message trống rồi anh zai ơi')} onKeyDown={handleKeyPress} className="flex-1 p-4 bg-gray-200 " />
        <button className='bg-sky-600 hover:bg-sky-400 p-2 px-10 rounded-full text-white' onClick={emitNewMessage} > Send</button>
      </div>


      {renderList}
    </div>
  )
}

export default Home