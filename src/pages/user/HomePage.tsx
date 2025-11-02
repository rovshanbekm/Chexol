import { HomeCard } from "../../components/card"
import { HomeTabs } from "../../components/tabs"

export const HomePage = () => {
  return (
    <div className="pt-5 pb-18">
      <HomeTabs />
      <HomeCard />
    </div>
  )
}

export default HomePage