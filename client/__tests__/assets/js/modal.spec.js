import React from 'react';
import { onClickOpenBookCover } from 'assets/js/modal';

describe('# onClickOpenBookCover', () => {
  // const wrapper = onClickOpenBookCover();
  it('should call onClickOpenBookCover', () => {
    expect(onClickOpenBookCover(global.event, '#target')).toBeUndefined();
  });
});
