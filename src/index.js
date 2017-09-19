/**
 * @class ReactBackgroundSlideshow
 *
 * Component that displays a tiled background slideshow of images.
 *
 * Based off of this codrops article:
 * http://tympanus.net/codrops/2014/06/11/how-to-create-a-tiled-background-slideshow
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { findDOMNode } from 'react-dom'
import raf from 'raf'

import './styles.css'

const tiles = [ 0, 1, 2, 3 ]

export default class ReactBackgroundSlideshow extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    animationDelay: PropTypes.number,
    alt: PropTypes.string
  }

  static defaultProps = {
    animationDelay: 10000,
    alt: 'background slideshow'
  }

  state = {
    isAnimating: false,
    direction: 'next',
    current: Math.random() * this.props.images.length | 0,
    effect: Math.random() * 3 | 0
  }

  componentDidMount() {
    window.addEventListener('resize', this._onResize)

    this._resetTransforms()
    this._timeout = setTimeout(this._onTransition, this.props.animationDelay)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._onResize)

    if (this._timeout) {
      clearTimeout(this._timeout)
      this._timeout = null
    }

    if (this._resizeRaf) {
      raf.cancel(this._resizeRaf)
      this._resizeRaf = null
    }
  }

  render() {
    const {
      alt,
      images
    } = this.props

    const {
      isAnimating,
      direction,
      current,
      effect
    } = this.state

    const next = this._getNextPanel()
    const effectName = `effect-${effect + 1}`

    return (
      <div
        className={`box-gallery ${effectName}`}
        onClick={this._onTransition}
      >
        {images.map((image, i) => {
          const isCurrent = (i === current)
          const isActive = (i === next && isAnimating)

          return (
            <div
              className={`box-panel ${isCurrent ? 'current' : ''} ${isActive ? 'active' : ''}`}
              ref={`panel-${i}`}
              key={i}
            >
              {tiles.map((_, j) => {
                const transform = (isCurrent && isAnimating)
                  ? this._transforms[effectName][direction][j]
                  : null

                const style = transform
                  ? { transform, WebkitTransform: transform }
                  : null

                return (
                  <div className='bg-tile' key={j}>
                    <div
                      className='bg-img'
                      style={style}
                    >
                      <img src={image} alt={alt} />
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }

  _resetTransforms = () => {
    this._resizeRaf = null

    const doc = window.document.documentElement
    const width = Math.max(doc.clientWidth, window.innerWidth)
    const height = Math.max(doc.clientHeight, window.innerHeight)

    const w = width / 2 + 10
    const h = height / 2 + 10

    this._transforms = {
      'effect-1': {
        'next': [
          'translate3d(0, ' + h + 'px, 0)', // transforms for 1 panel
          'translate3d(-' + w + 'px, 0, 0)', // transforms for 2 panel
          'translate3d(' + w + 'px, 0, 0)', // transforms for 3 panel
          'translate3d(0, -' + h + 'px, 0)' // transforms for 4 panel
        ],
        'prev': [
          'translate3d(' + w + 'px, 0, 0)',
          'translate3d(0, ' + h + 'px, 0)',
          'translate3d(0, -' + h + 'px, 0)',
          'translate3d(-' + w + 'px, 0, 0)'
        ]
      },

      'effect-2': {
        'next': [
          'translate3d(-' + w + 'px, 0, 0)',
          'translate3d(' + w + 'px, 0, 0)',
          'translate3d(-' + w + 'px, 0, 0)',
          'translate3d(' + w + 'px, 0, 0)'
        ],
        'prev': [
          'translate3d(0,-' + h + 'px, 0)',
          'translate3d(0,-' + h + 'px, 0)',
          'translate3d(0,' + h + 'px, 0)',
          'translate3d(0,' + h + 'px, 0)'
        ]
      },

      'effect-3': {
        'next': [
          'translate3d(0,' + h + 'px, 0)',
          'translate3d(0,' + h + 'px, 0)',
          'translate3d(0,' + h + 'px, 0)',
          'translate3d(0,' + h + 'px, 0)'
        ],
        'prev': [
          'translate3d(0,-' + h + 'px, 0)',
          'translate3d(0,-' + h + 'px, 0)',
          'translate3d(0,-' + h + 'px, 0)',
          'translate3d(0,-' + h + 'px, 0)'
        ]
      }
    }
  }

  _onResize = () => {
    if (!this._resizeRaf) {
      this._resizeRaf = raf(this._resetTransforms)
    }
  }

  _onTransition = (direction = 'next') => {
    if (this._timeout) {
      clearTimeout(this._timeout)
      this._timeout = null
    }

    const {
      effect,
      current
    } = this.state

    let nextEffect
    do {
      nextEffect = Math.min(2, Math.random() * 3 | 0)
    } while (nextEffect === effect)

    const currentPanel = this._getPanel(current)
    this._transitionCount = 0
    currentPanel.addEventListener('transitionend', this._onTransitionEnd)

    this.setState({
      isAnimating: true,
      effect: nextEffect
    })
  }

  _onTransitionEnd = (event) => {
    const { current } = this.state

    if (!event || !event.target.className === 'bg-img') return false
    if (++this._transitionCount < tiles.length) return false

    const currentPanel = this._getPanel(current)
    currentPanel.removeEventListener('transitionend', this._onTransitionEnd)

    this.setState({
      isAnimating: false,
      current: this._getNextPanel()
    })

    this._timeout = setTimeout(this._onTransition, this.props.animationDelay)
  }

  _getNextPanel = () => {
    const { images } = this.props
    const { direction, current } = this.state

    if (direction === 'next') {
      return (current < images.length - 1 ? current + 1 : 0)
    } else {
      return (current > 0 ? current - 1 : images.length - 1)
    }
  }

  _getPanel = (panel) => {
    return findDOMNode(this.refs[`panel-${panel}`])
  }
}
