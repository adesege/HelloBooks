import React from 'react';
import triggerUpload from '../../../assets/js/script';

const $ = window.$;

/* eslint-disable require-jsdoc, class-methods-use-this */
export default class Histories extends React.Component {
  componentDidMount() {
    $('#triggerUpload').click((e) => { // eslint-disable-line func-names
      triggerUpload('imagefile');
    });
    $('#triggerUploadDoc').click((e) => { // eslint-disable-line func-names
      triggerUpload('docfile');
    });
    $(() => {
      const $photoHolder = $('#imagefile');
      const $photoPreview = $('#image-cropper').find('.preview');
      $photoHolder.change(function () { // eslint-disable-line func-names
        const files = this.files ? this.files : [];
        // no file selected, or no FileReader support
        if (!files.length || !window.FileReader) return;

        if (/^image/.test(files[0].type)) { // only image file
          const reader = new FileReader(); // instance of the FileReader
          reader.readAsDataURL(files[0]); // read the local file
          reader.onloadend = function () { // eslint-disable-line func-names
            $photoPreview.css('background-image', `url(${this.result})`);
            setTimeout(() => {
              $('#image-cropper').removeClass('hidden-xl-down');
            }, '30');
          };
        }
      });
    });

    $(() => {
      const $docInput = $('#docfile');
      const $preview = $('#docpre');
      $docInput.change(function () { // eslint-disable-line func-names
        const files = this.files ? this.files : [];
        // no file selected, or no FileReader support
        if (!files.length || !window.FileReader) return;
        $preview.html(files[0].name).addClass('mt-3');
      });
    });
  }
  render() {
    return (
      <div className="mb-5">
        <h4 className="title mb-2 mr-4">Add a book</h4>
        <div className="mb-4"><small>Add a book</small></div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Book title"/>
        </div>{/* form-group */}
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <textarea className="form-control" placeholder="Short description about this book" rows="5" style={{ minHeight: '308px' }}></textarea>
            </div>
          </div>{/* col */}
          <div className="col-sm-6">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Book author"/>
            </div>{/* form-group */}
            <div className="form-group">
              <input type="date" className="form-control" placeholder="Release date"/>
            </div>{/* form-group */}
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Book url"/>
            </div>
            <div className="form-group">
              <input type="number" className="form-control" placeholder="Number of copies"/>
            </div>
            <div className="form-group">
              <input type="date" className="form-control" placeholder="Stock date"/>
            </div>
            <div className="form-group">
              <input type="number" className="form-control" placeholder="ISSBN"/>
            </div>
            <div className="form-group">
              <input type="date" className="form-control" placeholder="Published date"/>
            </div>
            <div className="form-group">
              <select className="form-control">
                <option value="">Please select a category...</option><option value="">Category 1</option><option value="">Category 2</option><option value="">Category 3</option><option value="">Category 4</option></select>
            </div>
          </div>{/* col-sm-6 */}
        </div>{/* row */}
        <div className="row mb-5">
          <div className="col-sm-3 col-9">
            <div id="image-cropper" className="hidden-xl-down">
              <div className="preview"></div>
            </div>{/* image-cropper */}
          </div>
          <div className="col-sm-3 col-3 justify-content-center">
            <button className="btn btn-sm btn-default" href="#top" id="triggerUpload">
              <i className="fa fa-camera"> </i>
              <span className="hidden-xs-down">Add cover photo</span>
            </button>
            <div style={{ height: '0px', width: '0px', overflow: 'hidden' }}>
              <form><input id="imagefile" type="file" className="cropit-image-input"/></form>
            </div>
            <div className="" id="docpre"></div>
            <button className="btn mt-3 btn-sm btn-default" href="#top" id="triggerUploadDoc"><i className="fa fa-camera"> </i> <span className="hidden-xs-down">Add Document file</span></button><div style={{ height: '0px', width: '0px', overflow: 'hidden' }}><form><input id="docfile" type="file" className="cropit-image-input"/></form> </div>
          </div>{/* col */}
        </div>
        <div className="d-flex justify-content-center">
          <button type="button" className="btn btn-sm btn-success mr-4">Add</button>
          <button type="reset" className="btn btn-sm btn-danger">Reset</button>
        </div>
      </div>
    );
  }
}
