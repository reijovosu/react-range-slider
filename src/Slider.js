import React, { useState, useEffect, useRef } from 'react';
import defaultStyles from './default.module.css';
import { styles as defaultStylesObj } from './styles';
import { mergeObj } from './utils';
import useDimensions from './useDimentions';

const Slider = ({
    min,
    max,
    minValue,
    maxValue,
    stylesObj,
    moduleStyles,
    display,
    onChange,
    onChangeActive
}) => {
    const styles = mergeObj(true, defaultStylesObj, stylesObj);

    const [sliderStyle, setSliderStyle] = useState(styles.slider);
    const [valuesStyle, setValuesStyle] = useState(styles.values);
    delete (styles.slider, styles.values);

    const [sliderRef, { width }] = useDimensions();
    const [minRef, { width: minWidth }] = useDimensions();
    const [maxRef, { width: maxWidth }] = useDimensions();
    const [values, setValues] = useState({ min: parseInt(min), max: parseInt(max), minValue: parseInt(minValue), maxValue: parseInt(maxValue) });

    const minStartX = useRef(0);
    const maxStartX = useRef(0);
    const onePixelValue = useRef(0);

    const [finished, setFinished] = useState(false);

    useEffect(() => {
        const hundredValue = (values.max - values.min);

        const leftLine = Math.round(((values.minValue - values.min) / hundredValue) * (width - (minWidth + maxWidth)), 0);
        const rightLine = Math.round(((values.max - values.maxValue) / hundredValue) * (width - (minWidth + maxWidth)), 0);
        const midLine = width - leftLine - rightLine - minWidth - maxWidth;

        onePixelValue.current = hundredValue / (width);

        setSliderStyle(sliderStyle => {
            return {
                ...sliderStyle,
                gridTemplateColumns: `${leftLine}px ${minWidth}px ${midLine}px ${maxWidth}px ${rightLine}px`,
                width: `${width}px`
            }
        });

        setValuesStyle(valuesStyle => {
            return {
                ...valuesStyle,
                gridTemplateColumns: `${leftLine}px ${minWidth}px ${midLine}px ${maxWidth}px ${rightLine}px`,
                width: `${width}px`
            }
        });

        if (finished) {
            typeof onChange === 'function' && onChange(values);
            setFinished(false);
        }
    }, [width, values, minWidth, maxWidth, finished, onChange]);

    const handleMouseDown = (e, isMin) => {
        if (isMin === true) {
            if (e.touches && e.touches.length > 0) {
                e.preventDefault();
                minStartX.current = e.touches[0].clientX;
            } else {
                minStartX.current = e.clientX;
            }
            document.addEventListener('mousemove', handleMinDrag);
            document.addEventListener('touchmove', handleMinDrag, { passive: false });
        } else {
            if (e.touches && e.touches.length > 0) {
                maxStartX.current = e.touches[0].clientX;
            } else {
                maxStartX.current = e.clientX;
            }
            document.addEventListener('mousemove', handleMaxDrag);
            document.addEventListener('touchmove', handleMaxDrag, { passive: false });
        }
        document.addEventListener('mouseup', handleDragEnd);
        document.addEventListener('touchend', handleDragEnd);
        document.addEventListener('touchcancel', handleDragEnd);
    }

    const handleMinDrag = (e) => {
        let cx = 0;
        if (e.touches && e.touches.length > 0) {
            cx = e.touches[0].clientX;
        } else {
            cx = e.clientX;
        }

        let newVal = Math.round(values.minValue + (cx - minStartX.current) * onePixelValue.current, 0);
        if (newVal > values.maxValue) {
            newVal = values.maxValue;
        }

        if (newVal < values.min) {
            newVal = values.min;
        }

        setValues(values => {
            return { ...values, minValue: newVal }
        });

        typeof onChangeActive === 'function' && onChangeActive({ ...values, minValue: newVal });
    }

    const handleMaxDrag = (e) => {
        let cx = 0;
        if (e.touches && e.touches.length > 0) {
            cx = e.touches[0].clientX;
        } else {
            cx = e.clientX;
        }

        let newVal = Math.round(values.maxValue + (cx - maxStartX.current) * onePixelValue.current, 0);
        if (newVal < values.minValue) {
            newVal = values.minValue;
        }

        if (newVal > values.max) {
            newVal = values.max;
        }

        setValues(
            { ...values, maxValue: newVal }
        );

        typeof onChangeActive === 'function' && onChangeActive({ ...values, minValue: newVal });
    }

    const handleDragEnd = e => {
        document.removeEventListener('mousemove', handleMinDrag);
        document.removeEventListener('mousemove', handleMaxDrag);
        document.removeEventListener('mouseup', handleDragEnd);
        document.removeEventListener('touchmove', handleMinDrag, {
            passive: false
        });
        document.removeEventListener('touchmove', handleMaxDrag, {
            passive: false
        });
        document.removeEventListener('touchend', handleDragEnd);
        document.removeEventListener('touchcancel', handleDragEnd);
        setFinished(true);
    }
    return (<>
        <div
            style={sliderStyle}
            ref={sliderRef}
            className={
                moduleStyles === undefined
                    ? defaultStyles.slider
                    : [defaultStyles.slider, moduleStyles.slider].join(' ')
            }
        >
            <div
                style={styles.line}
                className={
                    moduleStyles === undefined
                        ? defaultStyles.line
                        : [defaultStyles.line, moduleStyles.line].join(' ')
                }
            >

            </div>
            <div
                style={styles.minBall}
                className={
                    moduleStyles === undefined
                        ? defaultStyles.minBall
                        : [defaultStyles.minBall, moduleStyles.minBall].join(' ')
                }
                onMouseDown={e => handleMouseDown(e, true)}
                onTouchStart={e => handleMouseDown(e, true)}
                ref={minRef}
            ></div>
            <div
                style={styles.midline}
                className={
                    moduleStyles === undefined
                        ? defaultStyles.midline
                        : [defaultStyles.midline, moduleStyles.midline].join(' ')
                }
            ></div>
            <div
                style={styles.maxBall}
                className={
                    moduleStyles === undefined
                        ? defaultStyles.maxBall
                        : [defaultStyles.maxBall, moduleStyles.maxBall].join(' ')
                }
                onMouseDown={e => handleMouseDown(e, false)}
                onTouchStart={e => handleMouseDown(e, false)}
                ref={maxRef}
            ></div>
            <div
                style={styles.line}
                className={moduleStyles === undefined
                    ? defaultStyles.line
                    : [defaultStyles.line, moduleStyles.line].join(' ')
                }
            ></div >
        </div>
        <div
            style={valuesStyle}
            className={moduleStyles === undefined
                ? defaultStyles.values
                : [defaultStyles.values, moduleStyles.values].join(' ')
            }
        >
            <div></div>
            <div
                style={styles.minValue}
                className={moduleStyles === undefined
                    ? defaultStyles.minValue
                    : [defaultStyles.minValue, moduleStyles.minValue].join(' ')
                }
            >
                <span
                    style={styles.minValueNumber}
                    className={moduleStyles === undefined
                        ? defaultStyles.minValueNumber
                        : [defaultStyles.minValueNumber, moduleStyles.minValueNumber].join(' ')
                    }
                >
                    {typeof display === 'function' ? display(values.minValue) : values.minValue}
                </span>
            </div>
            <div></div>
            <div
                style={styles.maxValue}
                className={moduleStyles === undefined
                    ? defaultStyles.maxValue
                    : [defaultStyles.maxValue, moduleStyles.maxValue].join(' ')
                }
            >
                <span
                    style={styles.maxValueNumber}
                    className={moduleStyles === undefined
                        ? defaultStyles.maxValueNumber
                        : [defaultStyles.maxValueNumber, moduleStyles.maxValueNumber].join(' ')
                    }
                >
                    {typeof display === 'function' ? display(values.maxValue) : values.maxValue}
                </span>
            </div>
            <div></div>
        </div>
    </>);
};

export default Slider;