import { HomeCard } from "../../components/card"
import { HomeTabs } from "../../components/tabs"
import { useGetUserByChat } from "../../hooks";


export const HomePage = () => {
  const { isLoading } = useGetUserByChat();

  if (isLoading) return <div>Yuklanmoqda...</div>;
  return (
    <div className="pt-5 pb-18">

      <HomeTabs />
      <HomeCard />
    </div>
  )
}

export default HomePage