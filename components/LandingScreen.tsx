import Button from 'components/Button'
import useTheme from 'hooks/useTheme'
import { BsArrowRight } from 'react-icons/bs'

export const LoadingScreen = () => {
  const [theme] = useTheme()

  return (
    <div className="flex flex-col items-center">
      <div className="w-[max-content]">
        <Button href="/login" type="action" className="text-xl nowrap">
          <span className="mr-1">Get started</span>
          <BsArrowRight />
        </Button>
      </div>
      <div className="mt-2">
        {theme && <img src={`/landing/${theme}.png`} alt="screenshot" />}
      </div>
    </div>
  )
}
