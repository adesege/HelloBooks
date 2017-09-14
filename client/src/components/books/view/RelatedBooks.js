import React from 'react';
import relatedImage from '../../../assets/images/4.jpg';

/* eslint-disable require-jsdoc, class-methods-use-this */
class RelatedBooks extends React.Component {
  render() {
    return (

      <div className="related row">
        <div className="col-sm-10 offset-sm-1">
          <h4 className="title text-center mt-5 mb-3">Related</h4>
          <div className="row mx-auto">
            { [...Array(4)].map((val, index) => (
              <div className="col-sm-3 col-6 p-1" key={index}>
                <img className="img-thumbnail h-100 w-100" alt="" src={relatedImage}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default RelatedBooks;
