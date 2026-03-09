import Header from "./components/Header/Header"
import AllChapters from "./components/chapters/AllChapters"
import Footer from "./components/Footer/Footer"
import SEO from "./components/SEO/SEO"
import UnderConstructionModal from "./components/modal/UnderConstructionModal"

function App() {

  return (
    <div className=''>
      <SEO />
      <UnderConstructionModal />
      <Header />
      <AllChapters />
      <Footer />
    </div>
  )
}

export default App
