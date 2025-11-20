import { HomeCard } from "../../components/card"
import { Loader } from "../../components/loader";
import { HomeTabs } from "../../components/tabs"
import { useGetUserByChat } from "../../hooks";


export const HomePage = () => {
  const { isLoading } = useGetUserByChat();

  if (isLoading) return <Loader />

  return (
    <div className="pt-5 pb-18">

      <HomeTabs />
      <HomeCard />
    </div>
  )
}

export default HomePage