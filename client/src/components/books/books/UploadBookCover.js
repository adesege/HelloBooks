import React from 'react';
import Cropper from 'react-cropperjs';
import { connect } from 'react-redux';
import { setImageData, deleteImageData } from '../../../actions/cropper';

/* eslint-disable require-jsdoc, class-methods-use-this */
class UploadBookCover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coverPhotoPath: ''
    };
  }

  crop() {
    this.props.deleteImageData();
    this.props.setImageData({
      coverPhotoPath:
      this.refs.cropper.getCroppedCanvas().toDataURL()
    });
  }

  render() {
    const { imageSrc } = this.props;
    return (
      <Cropper
        ref='cropper'
        src={imageSrc}
        style={{ height: 500, width: '100%' }}
        aspectRatio={9 / 16}
        guides={false}
        crop={this.crop.bind(this)} />
    );
  }
}

UploadBookCover.propTypes = {

};

UploadBookCover.defaultProps = {
};

export default connect(null, { setImageData, deleteImageData })(UploadBookCover);
