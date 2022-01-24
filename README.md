# WebGL Ripples

by Dylan Cutler (DCtheTall)

## Summary

This repo contains source code for an interactive water ripple effect created
using WebGL. ~~Click here for a [live demo](https://dcthetall-webgl-ripple.herokuapp.com/).~~

## Algorithm

In nature, wave propagation is given by the [wave equation](https://en.wikipedia.org/wiki/Wave_equation),
a second order partial differential equation:

<img src="https://tex.s2cms.ru/svg/%20%5Cfrac%7B%5Cpartial%5E2%20u%7D%7B%5Cpartial%20t%5E%7B%5C%2C2%7D%7D%20%3D%20c%5E%7B%5C%2C2%7D%5C%2C%5Cnabla%5E2u%20" alt=" \frac{\partial^2 u}{\partial t^{\,2}} = c^{\,2}\,\nabla^2u " />

where <img src="https://tex.s2cms.ru/svg/%5Cnabla%5E2" alt="\nabla^2" /> is the [Laplace operator](https://en.wikipedia.org/wiki/Laplace_operator). If we treat <img src="https://tex.s2cms.ru/svg/c" alt="c" /> as unity, we can simplify the PDE to

<img src="https://tex.s2cms.ru/svg/%20%5Cfrac%7B%5Cpartial%5E2%20u%7D%7B%5Cpartial%20t%5E%7B%5C%2C2%7D%7D%20%3D%20%5Cnabla%5E2u%20" alt=" \frac{\partial^2 u}{\partial t^{\,2}} = \nabla^2u " />

To simulate waves, the program numerically solves the differential equation above using
[Verlet integration](https://en.wikipedia.org/wiki/Verlet_integration#Basic_St%C3%B6rmer%E2%80%93Verlet),
a method for iteratively solving second order ordinary differential equations of the form:

<img src="https://tex.s2cms.ru/svg/%20%5Cddot%7B%5Cmathbf%7Bx%7D%7D(t)%20%3D%20F(%5Cmathbf%7Bx%7D(t))%20" alt=" \ddot{\mathbf{x}}(t) = F(\mathbf{x}(t)) " />

In this case <img src="https://tex.s2cms.ru/svg/F(%5Cmathbf%7Bx%7D(t))" alt="F(\mathbf{x}(t))" />
is a [convolution](https://en.wikipedia.org/wiki/Convolution#Discrete_convolution)
with the
[discrete Laplace operator](https://en.wikipedia.org/wiki/Discrete_Laplace_operator),
given by the kernel:

<img src="https://tex.s2cms.ru/svg/%5Cleft%5B%5Cbegin%7Bmatrix%7D%0A0.25%20%26%26%200.5%20%26%26%200.25%20%5C%5C%0A0.5%20%26%26%20-3%20%26%26%200.5%20%5C%5C%0A0.25%20%26%26%200.5%20%26%26%200.25%0A%5Cend%7Bmatrix%7D%5Cright%5D" alt="\left[\begin{matrix}
0.25 &amp;&amp; 0.5 &amp;&amp; 0.25 \\
0.5 &amp;&amp; -3 &amp;&amp; 0.5 \\
0.25 &amp;&amp; 0.5 &amp;&amp; 0.25
\end{matrix}\right]" />

Verlet integration solves the ODE iteratively using the following formula:

<img src="https://tex.s2cms.ru/svg/%20u_%7Bn%2B1%7D%20%3D%202u_n%20%2B%20u_%7Bn-1%7D%20%2B%20(%5Cmathbf%7BL%7D%20*%20u_n)%5CDelta%20t%5E%7B%5C%2C2%7D%20" alt=" u_{n+1} = 2u_n + u_{n-1} + (\mathbf{L} * u_n)\Delta t^{\,2} " />

where <img src="https://tex.s2cms.ru/svg/%5Cmathbf%7BL%7D%20*%20u_n" alt="\mathbf{L} * u_n" /> the convolution of the height map
discrete Laplace operator. For simplicity, the program treats <img src="https://tex.s2cms.ru/svg/%5CDelta%20t" alt="\Delta t" /> as unity.

Afterwards, linear damping is applied to the wave so that it dissipates over time.

## Implementation

In order to compute the next iteration for Verlet integration,
I needed to keep the 2 most recent iterations of the height map then map the result to a 3rd height map.
That height map was sampled in a water shader which added
[Phong global illumination](https://en.wikipedia.org/wiki/Phong_reflection_model)
and refraction using ray tracing to make the water appear realistic.

The source code is implemented almost entirely in TypeScript and GLSL using
a TypeScript WebGL abstraction layer I have been working on.
This API is build for iteratively applying shaders you write yourself.

The shaders that use [glslify](https://github.com/glslify/glslify) can be modular,
so this API is more focused on applying shader programs to a WebGL scene.

## License

The code in this repository is released under an Apache 2.0 license and is the copyright
of Google Inc.

It is available for free and fair use. See the LICENSE for more information.

## Improvements

Really the same effect can be achieved with just one heightmap which uses each of the red, blue, and green channels to keep track of the 3 most recent states of the water
height.

A Guassian blur on the stone texture may make it look better.

Also the water shader breaks on certain GPUs on Linux machines for some reason. I have not tested it on Windows.
