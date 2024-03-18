varying vec2 vUv; 
/* default uv of plane goes from 0.0, 0.0 on the bottom left
to 1.0, 1.0 on the top right. The vUv.x goes gradually from 
0 to 1 and same for vUv.y. So because it's moving, it can create 
a gradient when it's used on a plane.*/

void main()
{
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;

}