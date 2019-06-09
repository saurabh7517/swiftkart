import React from 'react';
import {Carousel} from 'react-bootstrap';
import "./homePage.css";
class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }
    render(props) {
      let style = {
        width:"100%"
      };
      let jumbo = 
        <div className="jumbotron">
        <h1 className="display-4">Welcome, Shoppers!!!!</h1>
        <p className="lead">View our range of computer products and immerse yourself in an experience of a lifetime.</p>
        <hr className="my-4"/>
        <p>RAMS, Motherboards, GPUs, CPUs - We've got them all.</p>
        <a className="btn btn-primary btn-lg" href="#" role="button">Products</a>
      </div>
    ;
        return (
<React.Fragment>
{jumbo}
<Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="http://dummyimage.com/105x112.jpg/5fa2dd/ffffff"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="http://dummyimage.com/143x150.png/dddddd/000000"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="http://dummyimage.com/114x126.png/5fa2dd/ffffff"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
</React.Fragment>

        );
    }
}

export default HomePage;