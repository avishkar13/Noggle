import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore"
import SideBarSkeleton from "./skeletons/SideBarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

function Sidebar() {

  const { getUsers, users, selectedUser, setSelectedUser, isUserLoading, lastMessageMap, clearUnread, suscribeToMessages, unSuscribeFromMessages } = useChatStore();

  const { onlineUsers } = useAuthStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false)

  useEffect(() => {
    getUsers();
    suscribeToMessages();
    return () => unSuscribeFromMessages();
  }, []);

  useEffect(() => {
    // Clear selected user when the component first loads
  setSelectedUser(null); 
  }, []);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aTime = lastMessageMap[a._id]?.timestamp || 0;
    const bTime = lastMessageMap[b._id]?.timestamp || 0;
    return bTime - aTime;
  });


  if (isUserLoading) return <SideBarSkeleton />

  return (
    <aside className="h-full w-18 md:w-20 bg-slate-900 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/*Online Filter Toggle*/}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {sortedUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => {
              clearUnread(user._id);
              setSelectedUser({ ...user }); 
            }}

            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors 
             ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div title={`${user.fullName}`} className="relative mx-auto border border-gray-500 rounded-full lg:mx-0">
              <img
                src={user.profilePic || "/assets/avatar.png"}
                alt={user.name}
                className="size-12 rounded-full object-cover"
              />
              {lastMessageMap[user._id]?.unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {lastMessageMap[user._id]?.unreadCount || ""}
                </div>
              )}


              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900 " />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>

        ))}
        {sortedUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No Online Users</div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
