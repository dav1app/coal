import { EventLoop } from '../components/eventLoop'

export const Sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

EventLoop.add('resize', () => {
  Sizes.width = window.innerWidth
  Sizes.height = window.innerHeight
}, {
  before: true
})
