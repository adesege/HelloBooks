import React from 'react';
import Cropper from 'react-cropperjs';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setImageData, deleteImageData } from 'actions/cropper';


/**
 * @class UploadBookCover
 * @extends {React.Component}
 */
class UploadBookCover extends React.Component {
  /**
     * Creates an instance of UploadBookCover.
     * @param {any} props
     * @memberof UploadBookCover
     */
  constructor(props) {
    super(props);
    this.state = {
      coverPhotoPath: ''
    };
  }


  /**
     * @returns {void}
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
     * @returns {object} JSX
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

UploadBookCover.propTypes = {
  imageSrc: PropTypes.string,
  deleteImageData: PropTypes.func.isRequired,
  setImageData: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    setImageData, deleteImageData
  }
)(UploadBookCover);
