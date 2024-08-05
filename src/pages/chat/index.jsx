import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useAppStore } from "@/store";

const Chat = () => {
 const {userInfo} = useAppStore()
  const navigate = useNavigate()
  useEffect(()=> {
    if(!userInfo.profileSetup){
      toast.error("Please setup profile to continue.")
      navigate('/profile')
    }
  },[userInfo,navigate])
  return (    
    <div>
      Chat
    </div>
  )
}

export default Chat
