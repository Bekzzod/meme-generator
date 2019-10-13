import React from "react"

import "./Meme.css"

class Meme extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topText: "",
      bottomText: "",
      rndImage: "",
      allImages: [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(responce => responce.json())
      .then(responce => {
        const {memes} = responce.data
        this.setState({
          allImages: memes
        })
      })
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({ 
      [name]: value 
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const randNum = Math.floor(Math.random() * this.state.allImages.length)
    const randMeme = this.state.allImages[randNum].url
    console.log(randMeme)
    this.setState({
      rndImage: randMeme
    })
  }
 
  render() {
    return (
      <div>
        <form className="memeForm" onSubmit={this.handleSubmit}>
          <input 
            type="text"
            name="topText"
            placeholder="Top Text"
            value={this.state.topText}
            onChange={this.handleChange}
          />
          <input 
            type="text"
            name="bottomText"
            placeholder="Bottom Text"
            value={this.state.bottomText}
            onChange={this.handleChange}
          />
          <button>Generate</button>
        </form>
        <div className="meme">
          <img src={this.state.rndImage} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    )
  }
}

export default Meme