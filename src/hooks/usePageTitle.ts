import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const usePageTitle = () => {
  const location = useLocation()

  useEffect(() => {
    const getPageTitle = (pathname: string): string => {
      switch (pathname) {
        case '/':
          return 'Magical Concepts - Home'
        case '/concepts/tourist-destination':
          return 'Tourist Destination - Magical Concepts'
        case '/concepts/tourist-destination-two':
          return 'Tourist Destination Two - Magical Concepts'
        case '/concepts/celestial-sky-complication':
          return 'Celestial Sky Complication - Magical Concepts'
        default:
          return 'Magical Concepts'
      }
    }

    const newTitle = getPageTitle(location.pathname)
    document.title = newTitle
  }, [location.pathname])
}

export default usePageTitle
