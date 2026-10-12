import { ROUTES } from './config/events'
import { usePath } from './lib/router'
import EventsHome from './pages/EventsHome'
import FamilyPrayerPage from './pages/FamilyPrayerPage'
import NotFound from './pages/NotFound'
import YouthPage from './pages/YouthPage'

export default function App() {
  const path = usePath()

  switch (path) {
    case ROUTES.HOME:
    case '':
      return <EventsHome />
    case ROUTES.FAMILY_PRAYER:
      return <FamilyPrayerPage />
    case ROUTES.YOUTH_MEETING:
      return <YouthPage />
    default:
      return <NotFound />
  }
}
