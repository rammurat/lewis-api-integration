import React, { Component } from 'react';
import '../../../styles/carousel.scss';

class CarouselIndicator extends Component {
  render() {
    return (
      <li>
        <a className={this.props.index === this.props.activeIndex ? "carousel-indicator carousel-indicator--active" : "carousel-indicator"}
          onClick={this.props.onClick}
        />
      </li>                  
    );
  }
}

class CarouselSlide extends Component {
  render() {
    return (
      <li
        className={this.props.index === this.props.activeIndex ? "carousel-slide carousel-slide--active" : "carousel-slide"}
        >

        <img src={this.props.slide} className="carousel-slide-content" />
      </li>
    );
  }
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
            this.props.slides.map((slide, index) =>
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
            this.props.slides.map((slide, index) =>
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