import React from 'react';
import Slider from '@reijovosu/react-range-slider';
const sliderProps = {
    min: 0,
    max: 40,
    minValue: 0,
    maxValue: 40
}
const App = () => {
    return <Slider {...sliderProps} />;
    // return <>App</>
}

export default App;