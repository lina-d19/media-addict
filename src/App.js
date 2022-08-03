import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import News from "./pages/News"
import Reddit from "./pages/Reddit";
import Spotify from "./pages/Spotify";
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <>
      <Header title="MEDIA ADDICT" />

      <NavBar />

      <div className="container">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reddit" element={<Reddit />} />
            <Route path="/spotify" element={<Spotify />} />
            <Route path="/news" element={<News />} />
          </Routes>
      </div>
  </>
  );
}

export default App;
