import cropperReducer from '../../src/reducers/cropper';
import { setImageData, deleteImageData } from '../../src/actions/cropper';


describe('# Cropper Reducer', () => {
  it('should return initial state for unknown action types', () => {
    const state = cropperReducer(undefined);
    expect(state).toEqual([]);
  });

  it('should handle SET_IMAGE_DATA action type', () => {
    const imageData = '12345hkljhgfds324567';
    const action = setImageData(imageData);

    const state = cropperReducer(undefined, action);
    expect(state).toEqual(imageData);
  });

  it('should handle DELETE_IMAGE_DATA action type', () => {
    const action = deleteImageData();

    const state = cropperReducer(undefined, action);
    expect(state).toEqual([]);
  });
});
