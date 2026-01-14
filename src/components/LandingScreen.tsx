import { BsArrowRight } from "react-icons/bs"
import useTheme from "../hooks/useTheme"
import Button from "./Button"

export const LandingScreen = () => {
  const [theme] = useTheme()

  return (
    <div className="w-full">
      <div className="mx-auto w-[max-content]">
        <Button href="/login" type="action" className="text-xl nowrap">
          <span className="mr-1">Get started</span>
          <BsArrowRight />
        </Button>
      </div>
      <div className="block mx-auto">
        <img
          src={`/landing/${theme}.png`}
          alt="screenshot"
          className="mx-auto"
        />
      </div>
    </div>
  )
}
