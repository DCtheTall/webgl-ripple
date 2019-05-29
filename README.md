# WebGL Ripples

by Dylan Cutler (DCtheTall)

## Summary

This repo contains source code for an interactive water ripple effect created
using WebGL. Click here for a [live demo](https://dcthetall-webgl-ripple.herokuapp.com/).

## Algorithm

In nature, wave propagation is given by the [wave equation](https://en.wikipedia.org/wiki/Wave_equation),
a second order partial differential equation:

<a href="https://www.codecogs.com/eqnedit.php?latex=\frac{\partial^2u}{\partial&space;t}&space;=&space;c^2&space;\,\nabla^2&space;u" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\frac{\partial^2u}{\partial&space;t}&space;=&space;c^2&space;\,\nabla^2&space;u" title="\frac{\partial^2u}{\partial t} = c^2 \,\nabla^2 u" /></a>

where <a href="https://www.codecogs.com/eqnedit.php?latex=\nabla^2" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\nabla^2" title="\nabla^2" /></a>
is the [Laplace operator](https://en.wikipedia.org/wiki/Laplace_operator).

The program numerically solves the differential equation using [Verlet integration](https://en.wikipedia.org/wiki/Verlet_integration#Basic_St%C3%B6rmer%E2%80%93Verlet),
a method for discretizing PDEs given by

<a href="https://www.codecogs.com/eqnedit.php?latex=\ddot{\mathbf{x}}(t)&space;=&space;F(\mathbf{x}(t))" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\ddot{\mathbf{x}}(t)&space;=&space;F(\mathbf{x}(t))" title="\ddot{\mathbf{x}}(t) = F(\mathbf{x}(t))" /></a>

In this case <a href="https://www.codecogs.com/eqnedit.php?latex=F(\mathbf{x}(t))" target="_blank"><img src="https://latex.codecogs.com/gif.latex?F(\mathbf{x}(t))" title="F(\mathbf{x}(t))" /></a> is the [discrete Laplace operator](https://en.wikipedia.org/wiki/Discrete_Laplace_operator),
which for this program is [convolution](https://en.wikipedia.org/wiki/Convolution#Discrete_convolution)
with the matrix:

<a href="https://www.codecogs.com/eqnedit.php?latex=\left[&space;\begin{matrix}&space;0.25&space;&&&space;0.5&space;&&&space;0.25&space;\\&space;0.5&space;&&&space;-3.0&space;&&&space;0.5&space;\\&space;0.25&space;&&&space;0.5&space;&&&space;0.25&space;\end{matrix}&space;\right]" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\left[&space;\begin{matrix}&space;0.25&space;&&&space;0.5&space;&&&space;0.25&space;\\&space;0.5&space;&&&space;-3.0&space;&&&space;0.5&space;\\&space;0.25&space;&&&space;0.5&space;&&&space;0.25&space;\end{matrix}&space;\right]" title="\left[ \begin{matrix} 0.25 && 0.5 && 0.25 \\ 0.5 && -3.0 && 0.5 \\ 0.25 && 0.5 && 0.25 \end{matrix} \right]" /></a>

Verlet integration solves the PDE iteratively using the following formula:

<a href="https://www.codecogs.com/eqnedit.php?latex=u_{n&plus;1}&space;=&space;2u_n&space;-&space;u_{n-1}&space;&plus;&space;(\mathbf{L}&space;*&space;u_n)&space;\Delta&space;t^{\,2}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?u_{n&plus;1}&space;=&space;2u_n&space;-&space;u_{n-1}&space;&plus;&space;(\mathbf{L}&space;*&space;u_n)&space;\Delta&space;t^{\,2}" title="u_{n+1} = 2u_n - u_{n-1} + (\mathbf{L} * u_n) \Delta t^{\,2}" /></a>

where <a href="https://www.codecogs.com/eqnedit.php?latex=\mathbf{L}&space;*&space;u_n" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\mathbf{L}&space;*&space;u_n" title="\mathbf{L} * u_n" /></a>
is, again, the convolution of the current height map with the
discrete Laplace operator. In this program, we always treat
<a href="https://www.codecogs.com/eqnedit.php?latex=\Delta&space;t" target="_blank"><img src="https://latex.codecogs.com/gif.latex?\Delta&space;t" title="\Delta t" /></a>
as unity, so it can be ignored.

Afterwards, linear damping is applied to the wave so that it dissipates over time, like
actual water.

## Implementation

In order to compute the next iteration for Verlet integration, I needed to keep the 2 most
recent iterations of the height map then map the result to a 3rd height map. That height map
was sampled in a water shader which added Phong global illumination and refraction using ray
tracing to make the water appear realistic.

The source code is implemented almost entirely in TypeScript and GLSL using a TypeScript
WebGL abstraction layer I have been working on. The shaders use [glslify](https://github.com/glslify/glslify) so that they can be modular.

## License

The code in this repository is released under an Apache 2.0 license and is the copyright
of Google Inc.

It is available for free and fair use. See the LICNSE for more information.
