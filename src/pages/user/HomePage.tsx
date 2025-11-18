import { HomeCard } from "../../components/card"
import { HomeTabs } from "../../components/tabs"
import { useGetUserByChat } from "../../hooks"
import { getTelegramUserDataID } from "../../services/get_init_data_user_id"


export const HomePage = () => {
  const chat_id = getTelegramUserDataID()
  if (chat_id !== null) {
    useGetUserByChat(chat_id)
  }
  return (
    <div className="pt-5 pb-18">
      
      <HomeTabs />
      <HomeCard />
    </div>
  )
}

export default HomePage