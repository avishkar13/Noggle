import { useChatStore } from '../store/useChatStore'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import NoChatSelected from '../components/NoChatSelected'

const HomePage = () => {

  const { selectedUser } = useChatStore();


  return (
    <>
      <div className='h-screen bg-base-200 bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a]'>
        <Navbar />
        <div className='flex items-center justify-center pt-8 md:pt-10 px-2 md:px-4 '>
          <div className='bg-slate-800  rounded-lg shadow-xl w-full max-w-7xl h-[calc(100vh-8rem)] '>
            <div className='flex h-full rounded-lg overflow-hidden '>
              <Sidebar />

              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>

      </div>
    </>
  ) 
}

export default HomePage
