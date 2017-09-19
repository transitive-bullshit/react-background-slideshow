# react-background-slideshow

> Sexy tiled background image slideshow for React - [Try it out!](https://transitive-bullshit.github.io/react-background-slideshow) :fire:

[![NPM](https://img.shields.io/npm/v/react-background-slideshow.svg)](https://www.npmjs.com/package/react-background-slideshow) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![](https://raw.githubusercontent.com/transitive-bullshit/react-background-slideshow/master/demo/media/slideshow-demo-desktop.gif)

*(Animations sped up for demo)*

## Intro

This component is meant to be used as a **full viewport background slideshow** that can easily add a slick, polished feel to pages that don't have much content.

I've personally used it for several projects as the background for login / signup / dialog screens where the only content is a single foreground modal generally prompting the user for some info.

## Install

```bash
npm install --save react-background-slideshow
```

## Usage

```js
import React, { Component } from 'react'

import BackgroundSlideshow from 'react-background-slideshow'

import image1 from './assets/001.jpg'
import image2 from './assets/002.jpg'
import image3 from './assets/003.jpg'

export default class App extends Component {
  render () {
    return (
      <div>
        <BackgroundSlideshow images={[ image1, image2, image3 ]} />
      </div>
    )
  }
}
```

The `BackgroundSlideshow` component will have `position: absolute` and sized to stretch with its container, which will most often be the root `window`.

## API

### ReactBackgroundSlideshow

- `props.images` - array<string>, *required* array of images to transition between.
- `props.disableClick` - boolean, optional disables click to transition (default `false`)
- `props.disableInterval` - boolean, optional disables automated automation at interval specified by `automationDelay` (default `false`)
- `props.animationDelay` - number, optional specifies the interval in ms for transitions while idle (default `10000`)
- `props.alt` - string, optional specifies the alt attribute to use for the underlying `<img>` elements (default `background slideshow`)

**Note** I highly recommend using background images with a resolution of 1280x850. The effects have not been tested thoroughly with other asset sizes and there is a possibility that other aspect ratios break some of the internal assumptions, as the effects are using `<img>` elements and css transforms instead of `background-image` / `backgrouns-size: contain or cover` for performance reasons. If you have any questions or run into issues with this constraint, I recommend reading through the original [codrops article](http://tympanus.net/codrops/2014/06/11/how-to-create-a-tiled-background-slideshow) thoroughly.

*Note* there are 3 distinct transition effects, and the component will randomly cycle through them.

*Note* the component will randomly choose an image to start from.

## [Demo](https://transitive-bullshit.github.io/react-background-slideshow)

This repo comes with an example [create-react-app](https://github.com/facebookincubator/create-react-app) under `demo/` that can be run locally to experiment with the component. This demo is also hosted [here](https://transitive-bullshit.github.io/react-background-slideshow).

```bash
cd demo
npm install
npm start
```

This will start the create-react-app dev server locally on port 3000 and open the demo app in your default browser.

## Mobile Demo

![](https://raw.githubusercontent.com/transitive-bullshit/react-background-slideshow/master/demo/media/slideshow-demo-mobile.gif)

This component is fully repsonsive and should work on all screen sizes. The above gif was captured from an emulated iPhone 6.

## Credit

This component is a React port of a jQuery effect published in 2014 in an awesome [article](http://tympanus.net/codrops/2014/06/11/how-to-create-a-tiled-background-slideshow) by [codrops](https://tympanus.net/codrops/). The original article gives a great breakdown of how the transitions work, with all the underlying logic still very relevant in a post-jQuery world. This component replaces all of the mutable DOM interactions from the original version with more modern React conventions.

## License

MIT © [Travis Fischer](https://github.com/transitive-bullshit)
