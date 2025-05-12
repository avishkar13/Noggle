import { useEffect,useRef } from "react";
import { useChatStore } from "../store/useChatStore"
import ChatHeader from "./ChatHeader"
import MessageInput from "./MesseageInput"
import MessageSkeleton from "./skeletons/MessageSkeleton"
import { useAuthStore } from "../store/useAuthStore";
import formatMessageTime from "../lib/utils";

function ChatContainer() {

  const { messages, getMessages, selectedUser, isMessagesLoading, suscribeToMessages, unSuscribeFromMessages } = useChatStore();

  const { authUser } = useAuthStore();

  const messageEndRef=useRef(null);


  useEffect(() => {
    getMessages(selectedUser._id);
    suscribeToMessages();

    return () => unSuscribeFromMessages();
  }, [selectedUser._id, getMessages, suscribeToMessages, unSuscribeFromMessages])

  useEffect(() => {
    if (messageEndRef.current || messages){
 
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    }, [messages])


  //Meassage Loading Skeleton
  if (isMessagesLoading) {

    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />

        <MessageSkeleton />

        <MessageInput />
      </div>
    )
  }



  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-[url('/assets/chatbg.webp')] bg-cover bg-center bg-no-repeat">

        {messages.map((message) => (
          <div
            key={message._id}
            ref={messageEndRef}
            className={` chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img src={message.senderId === authUser._id
                  ? authUser.profilePic || "/assets/avatar.png"
                  : selectedUser.profilePic || "/assets/avatar.png"}

                  alt="Profile"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">{ formatMessageTime(message.createdAt)}</time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2 " />
              )}

              {message.text && <p className="font-serif text-sm">{message.text}</p>}

            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer
