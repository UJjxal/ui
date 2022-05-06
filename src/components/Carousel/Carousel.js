import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@material-ui/core";

export const CarouselItem = ({ children }) => {
  return <div className="slide">{children}</div>;
};

const Carousel = ({ children, nav }) => {
  const navigationType = nav?nav:'slide';
  const sliderRef = useRef(null);
  const wrapperRef = useRef(null);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState('');

  useEffect(() => {
    const slider = sliderRef.current;
    const wrapper = wrapperRef.current;
    let nodeWidth = wrapper.childNodes[activeIndex]?wrapper.childNodes[activeIndex].offsetWidth:wrapper.childNodes[1].offsetWidth;
    if(direction==='right')
    {
      sliderRef.current.scrollLeft += nodeWidth;
    }
    else{
      sliderRef.current.scrollLeft -= nodeWidth;
    }
    setLeft(slider.scrollLeft >0?true:false)
    setRight(wrapper.scrollWidth - (slider.scrollLeft + 1) >= wrapper.clientWidth?true:false);
  }, [sliderRef.current, activeIndex, direction]);

  const scroll = (direction) => {
    if (direction==='left') {
      setActiveIndex(prev => prev - 1)
      setDirection(direction);
    } else{
      setActiveIndex(prev => prev + 1)
      setDirection(direction);
    }
  };

  return (
    <div className="carousel">
      <div className="slider" ref={sliderRef}>
        <div
          className="wrapper"
          ref={wrapperRef}
          // style={{ transform: `translateX(-${activeIndex * 30}%)` }}
        >
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, { width: "100%" });
          })}
        </div>
      </div>
      <div
        className={`${navigationType}-left ${ !left && "invisible"}`}
        onClick={() => {
          scroll("left");
        }}
      >
        <Icon>chevron_left</Icon>
      </div>
      <div
        className={`${navigationType}-right ${ !right && "invisible"}`}
        onClick={() => {
          scroll("right");
        }}
      >
        <Icon>chevron_right</Icon>
      </div>
    </div>
  );
};

export default Carousel;
