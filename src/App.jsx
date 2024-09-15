import Canvas from './Canvas'
import Projects from './Projects';
import React, {useRef, useEffect, useState} from 'react'


function App() {
  document.title = "Marc Fernandes - About Me";

  const [showAnimation, setShowAnimation] = useState(true);

  function handleCard(position) {
    document.getElementById("cards-wrapper").style.transform = `translateX(calc(${position} * ((2*20vw) + (2*2vw) + 50vw)))`;
  }

  function underlineText(e) {
    for (var x of ["item-about", "item-contact", "item-projects"]) {
      var underlined = e.target.id == x ? "underline" : ""
      document.getElementById(x).style.textDecorationLine = underlined
      if (underlined) {
        switch (x) {
          case "item-about":
            document.title = "Marc Fernandes - About Me"
            break;
          case "item-contact":
              document.title = "Marc Fernandes - Contact"
              break;
          case "item-projects":
              document.title = "Marc Fernandes - Projects"
              break;
        }
      }
    }
  }

  return (
    <>
      <div className="main-container">
        <Canvas/>
        <div className="main">
          <div className="pagetop">
            <h2 className="pagetop--item" id='item-about' style={{ textDecorationLine: "underline" }} onClick={(e) => {handleCard(1); underlineText(e)}}>about</h2>
            <h2 className="pagetop--item" id='item-contact' onClick={(e) => {handleCard(0); underlineText(e)}}>contact</h2>
            <h2 className="pagetop--item" id='item-projects' onClick={(e) => {handleCard(-1); underlineText(e)}}>projects</h2>
          </div>
          <div className='cards-wrapper' id="cards-wrapper">
            <div className='card' id="about-card">
              <h1 className='text'>hello there!</h1>
              <p className='text'>My name is Marc Fernandes. I am a 3rd year Software Engineering student at Carleton University in Ottawa.
              I am able to code in various languages such as C, Java, JavaScript, Python, HTML and CSS.
              </p>
              <p className='text'>I enjoy playing word games and video games, biking, and exercising!</p>
              {/* <img src='https://a.ppy.sh/9088637?format=webp' className='about-image'></img> */ }
            </div>
            <div className='card' id="contact-card">
              <h1 className='text'>you can contact me at:</h1>
              <h1 className='text'><a href='mailto:fernandes.marcantony748@gmail.com'>fernandes.marcantony748@gmail.com</a></h1>
              <h3 className='text'>or with LinkedIn <a href='https://www.linkedin.com/in/fernandes-marc' target='_blank' rel='noopener noreferrer'>here</a></h3>
            </div>
            <div className='card card--center' id="projects-card">
              <Projects/>
            </div>
          </div>
        </div>
        {showAnimation ? <div className="load-blur" onAnimationEnd={() => setShowAnimation(false)}></div> : null}
      </div>
    </>
  )
}

export default App
