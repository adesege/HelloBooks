import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import CropperJs from 'react-cropperjs';
import TestUtils from 'react-dom/test-utils';
import ConnectedUploadBookCover, { UploadBookCover } from 'components/Books/UploadBookCover';

const book = {
  id: 2,
  title: 'A book title',
  coverPhotoPath: '',
  bookCategoryId: 0,
  author: '',
  stockQuantity: 0,
  ISBN: '',
  publishedDate: '',
  description: ''
};

const props = {
  params: {
    id: 2
  },
  book,
  deleteImageData: jest.fn(),
  setImageData: jest.fn()
};

const context = {
  context: {
    router: {
      push: jest.fn()
    }
  }
};


const mockStore = configureMockStore([thunk]);
const store = mockStore({
  books: { books: [book] },
});

describe('# UploadBookCover', () => {
  const wrapper = shallow(<UploadBookCover {...props}/>, context);
  it('should render UploadBookCover component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe(CropperJs);
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(<ConnectedUploadBookCover {...props} store={store} />);
    expect(connectedComponent.length).toBe(1);
  });

  it('should call the crop method', () => {
    const spy = jest.fn();
    const cropRefs = TestUtils.renderIntoDocument(<UploadBookCover {...props}/>);
    cropRefs.refs.cropper.getCroppedCanvas = jest.fn(() => ({
      toDataURL: jest.fn()
    }));
    cropRefs.crop();
    expect(spy).not.toHaveBeenCalled();
  });
});
