import React, { Component } from 'react'

import ReactBackgroundSlideshow from 'react-background-slideshow'

import image1 from './assets/001.jpg'
import image2 from './assets/002.jpg'
import image3 from './assets/003.jpg'
import image4 from './assets/004.jpg'
import image5 from './assets/005.jpg'
import image6 from './assets/006.jpg'

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
      <ReactBackgroundSlideshow images={images} />
    )
  }
}
