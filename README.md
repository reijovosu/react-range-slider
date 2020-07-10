# react-range-slider

![](https://user-images.githubusercontent.com/378124/87159763-89d76b00-c2ca-11ea-8435-8817a321ff0c.png)

## Install

using npm: 
`npm install @reijovosu/react-range-slider`

or using yarn:
`yarn add @reijovosu/react-range-slider`

## Usage

### Simple

```javascript
import React from 'react';
import Slider from '@reijovosu/react-range-slider';

const App = () => {
    return <Slider
       min="10"
       max="110"
       minValue="30"
       maxValue="95"
       onChange={(v) => console.log(v)}
    />;
}

export default App;
```

### Full

```javascript
import React from 'react';
import Slider from '@reijovosu/react-range-slider';
import sliderStyles from './slider.module.css';

const sliderProps = {
    min: 0,
    max: 110,
    minValue: 30,
    maxValue: 95,
    stylesObj: {
        midline: {
            backgroundColor: '#0000FF'
        }
    },
    moduleStyles: sliderStyles,
    onChange: (v) => console.log(v),
    onChangeActive: (v) => console.log(v),
    display: (v) => <b>{v}</b>
}
const App = () => {
    return <Slider {...sliderProps} />;
}

export default App;
```

## Configuration props

- **min** - minimum scale amount
- **max** - maximum scale amount
- **minValue** - minimum slider value
- **maxValue** - maximum slider value
- **onChange** - event that fires after sliding ends
	- returns `{min: min, max: max, minValue: minValue, maxValue: maxValue}`
- **onChangeActive** that event that fires when sliding 
	- returns `{min: min, max: max, minValue: minValue, maxValue: maxValue}`
- **stylesObj** - object for styling slider.
  
Examle: [https://github.com/reijovosu/react-range-slider/blob/master/src/styles.js](https://github.com/reijovosu/react-range-slider/blob/master/src/styles.js)

- **moduleStyles** - css module file.

Example: [https://github.com/reijovosu/react-range-slider/blob/master/src/default.module.css](https://github.com/reijovosu/react-range-slider/blob/master/src/default.module.css)
