/* HomePage component
contains the splash page with information and images 
constains the newsfeed component constrained to the 5 most recent postes
*/
import NewsFeed from "../components/NewsFeed"

export default function HomePage() {
  return (
    <div>
      <h2>HomePage</h2>
      <NewsFeed/>
    </div>
  )
}
