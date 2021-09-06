# mixzoid 

## Motivation

I came with the idea that every game can be abstracted into 4 different layers: graphics, physics, game and sound. My main mission was to create a way to integrate those 4 layers together with less haste as possible, using the most common developer language ever: JavaScript.

I understand that it is not an ideal scenario, but I'm making a bet on improvements of each different layers in the future. 

- Graphics: ThreeJS
- Physics: OIMO Physics
- Sound: Howl
- Game: You will create your own. 

## Advantages of using this instead of hooking up everything on your own. 

This is how you can create a basic example on Mixzoid. There is no mandatory options, because the default classes come to the example. 

```js
(async function() {
  const universe = new Universe() //Creates the renderer, the scene, the world.
  await universe.add(new Camera({ child: new HUD() })) //Add a new camera
  await universe.add(new AmbientLight()) //Adds a new ambient light.
  await universe.add(new Floor()) //Adds a floor. Floors cannot move on the universe.
  await universe.add(new Actor()) //Adds an actor to the universe. Camera should be attached to it. 
  await universe.add(new Cube({
    y: 4,
    x: -1,
    z: -6
  }))
  await universe.add(new Door({
    w: 2,
    h: 1,
    d: 1,
    x: 0,
    z: 50,
    c: 0xffffff
  }))
  await universe.add(new Door({
    w: 1,
    h: 1,
    d: 1,
    x: 0,
    z: -50,
    c: 0xff0000
  }))

  new Controls() // This is manually hooked to the camera and the actor for now. I'm working on this.
  new Mouse()
  new Keyboard()

  AnimationLoop.start() //This starts to render the layers.
})()
```

### What else?
- Await is not mandatory for async rendering. 
- Nice concept additions for rendering loops, like `eventLoop` and `animationLoop`.
- Nice component defaults. Take a look into `src/components/cube`. 
- Nice configurations eases. Take a look into `src/configs`.

