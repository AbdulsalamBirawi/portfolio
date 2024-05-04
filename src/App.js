import "./App.css";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Qualification from "./components/qualification/Qualification";

import Skills from "./components/skills/Skills";

import Footer from "./components/footer/Footer";
import Recommendation from "./components/work/Recommendation";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main">
        <Home />
        <About />
        <Skills />
        <Qualification />
        <Recommendation />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;
