import React, { Component } from 'react'

import BackgroundSlideshow from 'react-background-slideshow'

import image1 from './assets/1.jpg'
import image2 from './assets/2.jpg'
import image3 from './assets/3.jpg'
import image4 from './assets/4.jpg'
import image5 from './assets/5.jpg'
import image6 from './assets/6.jpg'

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6
]

export default class App extends Component {
  render () {
    return (
      <div>
        <BackgroundSlideshow images={images} />

        <h1>react-tiled-background-slideshow Demo</h1>
      </div>
    )
  }
}
