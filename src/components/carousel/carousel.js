import React, { Component } from 'react';
import '../../../styles/carousel.scss';

function CarouselIndicator(props) {
  return (
    <li>
      <a className={props.index === props.activeIndex ? "carousel-indicator carousel-indicator--active" : "carousel-indicator"}
        onClick={props.onClick}
      />
    </li>                  
  );
}

function CarouselSlide(props) {
  return (
    <li
      className={props.index === props.activeIndex ? "carousel-slide carousel-slide--active" : "carousel-slide"}
      >
      <img src={props.slide} className="carousel-slide-content" />
    </li>
  );
}

class Carousel extends Component {
  constructor(props) {
    super(props);
    
    this.goToSlide = this.goToSlide.bind(this);
    
    this.state = {
      activeIndex: 0
    };
  }
  
  goToSlide(index) {
    this.setState({
      activeIndex: index
    });
  }
  
  render() {
    return (
      <div className="carousel">
        <ul className = "carousel-slides"> 
          {
            this.props.slides && this.props.slides.map((slide, index) =>
              <CarouselSlide
                key={index}
                index={index}
                activeIndex={this.state.activeIndex}
                slide={slide}
              />
          )}
        </ul>
                
        <ul className="carousel-indicators">
          {
            this.props.slides && this.props.slides.map((slide, index) =>
              <CarouselIndicator
                key={index}
                index={index}
                activeIndex={this.state.activeIndex}
                onClick={e => this.goToSlide(index)}
              />
          )}
        </ul>        
      </div>
    );
  }
};

export default Carousel;