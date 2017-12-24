import React from 'react';
import Cropper from 'react-cropperjs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  setImageData,
  deleteImageData
} from 'actions/cropper';

const propTypes = {
  imageSrc: PropTypes.string,
  deleteImageData: PropTypes.func.isRequired,
  setImageData: PropTypes.func.isRequired
};

/**
 * Upload book cover component
 *
 * @class UploadBookCover
 *
 * @extends {React.Component}
*/
class UploadBookCover extends React.Component {
  /**
     * Creates an instance of UploadBookCover.
     *
     * @param {object} props - event handler
     *
     * @memberof UploadBookCover
     */
  constructor(props) {
    super(props);
    this.state = {
      coverPhotoPath: ''
    };
  }


  /**
   * Set the image data
   *
   * @returns {undefined}
   *
   * @memberof UploadBookCover
  */
  crop() {
    this.props.deleteImageData();
    this.props.setImageData({
      coverPhotoPath:
      this.refs.cropper.getCroppedCanvas().toDataURL()
    });
  }


  /**
   * Renders component
   *
   * @returns {JSX} JSX
   *
   * @memberof UploadBookCover
  */
  render() {
    const { imageSrc } = this.props;
    return (
      <Cropper
        ref="cropper"
        src={imageSrc}
        style={{ height: 500, width: '100%' }}
        aspectRatio={9 / 16}
        guides={false}
        crop={this.crop.bind(this)} />
    );
  }
}

UploadBookCover.propTypes = propTypes;

export { UploadBookCover };
export default connect(null, {
  setImageData,
  deleteImageData
})(UploadBookCover);
