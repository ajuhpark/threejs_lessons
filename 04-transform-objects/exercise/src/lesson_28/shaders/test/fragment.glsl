#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

// for pattern 23
float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// for pattern 32
vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}


void main()
{
    // Pattern 3 - black left to white right
    // float strength = vUv.x;

    // Pattern 4 - black bottom to white top
    // float strength = vUv.y;

    // Pattern 5 - white bottom to black top
    // float strength = 1.0 - vUv.y;

    // Pattern 6 - black bottom that goes quickly to white  
    // float strength = vUv.y * 10.0;

    // Pattern 7 - looks like blinds. 10 horizontal rows, white top, black bottom.  
    // this uses the modulo. https://www.medcalc.org/manual/mod-function.php
    // float strength = mod(vUv.y * 10.0, 1.0);

    // Pattern 8 - looks like stripes. Black and white rows.  
    // use step function. If strength is below 0.5, it's going to be 0. 
    // if strength is above 0.5, it's going to be one.
    // float strength = mod(vUv.y * 10.0, 1.0);
    // strength = step(0.5, strength);

    // Pattern 9 - similar to Pattern 8 but thinner white lines
    // float strength = mod(vUv.y * 10.0, 1.0);
    // strength = step(0.8, strength);

    // Pattern 10 - similar to Pattern 9 with thin white lines but vertcal.
    // instead of vUv.y, use vUv.x
    // float strength = mod(vUv.x * 10.0, 1.0);
    // strength = step(0.8, strength);

    // Pattern 11 - combination of 9 and 10. So it's criss-cross of white.
    // put the mod function inside the step function. Then add the step function 
    // with the y.
    // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength += step(0.8, mod(vUv.y * 10.0, 1.0));

    // Pattern 12 - individual dots at the intersections
    // multiply it instead of adding like pattern 11.
    // float strength = step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));

    // Pattern 13 - individual horizontal lines
    // trying out diff values to see what we get. Also can try commenting out lines.
    // float strength = step(0.4, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.8, mod(vUv.y * 10.0, 1.0));

    // Pattern 14 - little upside down L shapes.
    // putting in new variable using barX
    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    // barX *= step(0.8, mod(vUv.y * 10.0, 1.0));
    
    // switching 0.8 and 0.4 from above
    // float barY= step(0.8, mod(vUv.x * 10.0, 1.0));
    // barY *= step(0.4, mod(vUv.y * 10.0, 1.0));

    // // Pattern 15 - cross signs
    // // adding 0.2 from the ones above.
    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    // barX *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));
    
    // // switching 0.8 and 0.4 from above
    // float barY= step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0));
    // barY *= step(0.4, mod(vUv.y * 10.0, 1.0));

    // Pattern 16 - gradient with white on the sides, black in the middle
    // float strength = abs(vUv.x - 0.5);

    // Pattern 17 - similar to above but with horizontal middle as well
    // gradient with white on the sides, black in the middle on x and y axis
    // float barX = abs(vUv.x - 0.5);
    // float barY = abs(vUv.y - 0.5);

    // float strength = min(barX, barY);

    // Pattern 18 - similar to above but with horizontal middle as well
    // gradient with black on the sides, white in the middle on x and y axis
    // float barX = abs(vUv.x - 0.5);
    // float barY = abs(vUv.y - 0.5);

    // float strength = max(barX, barY);

    // Pattern 19 - black box in middle of larger white
    // // similar to above but uses step function
    // float barX = abs(vUv.x - 0.5);
    // float barY = abs(vUv.y - 0.5);

    // float strength = step(0.2, max(barX, barY));

    // Pattern 20 - black box outlined by a white box outlined by black
    // float barX = abs(vUv.x - 0.5);
    // float barY = abs(vUv.y - 0.5);

    // float square1 = step(0.2, max(barX, barY));
    // float square2 = 1.0 - step(0.25, max(barX, barY));

    // float strength = square1 * square2;

    // Pattern 21 - stripes of gradients from black to white going left to right
    // Multiply by 10 so it goes from 0 to 10. Then apply floor() which rounds to 
    // bottom value. Then we divide by 10 again so we get 0-1 range.
    // float strength = floor(vUv.x * 10.0) / 10.0;       

    // Pattern 22 - Bunch of boxes w gradients. Black on bottom left. White on top right.
    // Multiply by 10 so it goes from 0 to 10. Then apply floor() which rounds to 
    // bottom value. Then we divide by 10 again so we get 0-1 range.
    // float barX = floor(vUv.x * 10.0) / 10.0;       
    // float barY = floor(vUv.y * 10.0) / 10.0;       
    // float strength = barX * barY; 
    
    // Pattern 23 - like static
    // so I provided the function from book of shaders on the top here.
    // float strength = random(vUv); 
    
    // Pattern 24 - like static but zoomed in. 
    // so this is taking the stripes from pattern 21 and combining w pattern 23.
    // vec2 gridUv = vec2(
    //     floor(vUv.x * 10.0) / 10.0, 
    //     floor(vUv.y * 10.0) / 10.0 // these two are from pat. 22 

    // );    
    // float strength = random(gridUv);
    
    // Pattern 25- like pattern 24 but slanted 
    // vec2 gridUv = vec2(
    //     floor(vUv.x * 10.0) / 10.0, 
    //     floor((vUv.y + vUv.x) * 10.0) / 10.0  // these two are from pat. 22 

    // );    
    // float strength = random(gridUv);

    // Pattern 25- black to white gradient. Bottom left to top right.
    // kind of like sunrise from bottom left.
    // float strength = length(vUv);

    // Pattern 26- black middle spreading out to white. Gradient
    // one way to do it
    // float strength = length(vUv - 0.5); 

    // another way to do it. The 0.5, 0.5 are coordinates.
    // float strength = distance(vUv, vec2(0.5, 0.5));

    // Pattern 27- same as up top. 
    // float strength = distance(vUv, vec2(0.5));

    // Pattern 28- same as up top but white center to black outside
    // the lower the value, the further we go.
    // float strength = 1.0 - distance(vUv, vec2(0.5));

    // Pattern 29- very concentrated white center, black outside
    // the lower the value, the further we go.
    // float strength = 0.015 / distance(vUv, vec2(0.5));

    // Pattern 30- conentrated white center that spreads out horizontal a little
    // vec2 lightUv = vec2(
    //     vUv.x * 0.1 + 0.45, 
    //     vUv.y * 0.5 + 0.25
    // ); 
    // float strength = 0.015 / distance(lightUv, vec2(0.5));

    // Pattern 31- kind of like an inverted of above. white star/diamond in the center.
    // vec2 lightUvX = vec2(
    //     vUv.x * 0.1 + 0.45, 
    //     vUv.y * 0.5 + 0.25
    // ); 

    // float lightX = 0.015 / distance(lightUvX, vec2(0.5));
    
    // vec2 lightUvY = vec2(
    //     vUv.y * 0.1 + 0.45, 
    //     vUv.x * 0.5 + 0.25
    // ); 

    // float lightY = 0.015 / distance(lightUvY, vec2(0.5));
    // float strength = lightX * lightY;

    // Pattern 32- Pattern 31 but rotated.
    // there's a function up top here.
    // for rotate function, have to provide a coordinate and a number

    float pi = 3.1415926535897932384626433832795;
    vec2 rotatedUv = rotate(vUv, PI * 0.25, vec2(0.5));

    vec2 lightUvX = vec2(
        rotatedUv.x * 0.1 + 0.45, 
        rotatedUv.y * 0.5 + 0.25
    ); 

    float lightX = 0.015 / distance(lightUvX, vec2(0.5));
    
    vec2 lightUvY = vec2(
        rotatedUv.y * 0.1 + 0.45, 
        rotatedUv.x * 0.5 + 0.25
    ); 

    float lightY = 0.015 / distance(lightUvY, vec2(0.5));
    float strength = lightX * lightY;

    gl_FragColor = vec4(strength, strength, strength, 1.0);

}