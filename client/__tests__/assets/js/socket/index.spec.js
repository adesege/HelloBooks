import React from 'react';
import {
  ioGetNotifications,
  ioJoin,
  ioNewNotifications } from 'assets/js/socket/';

describe('# Socket', () => {
  it('should call ioGetNotifications', () => {
    expect(ioGetNotifications()).toBeUndefined();
  });
  
  it('should call ioJoin', () => {
    expect(ioJoin()).toBeUndefined();
  });

  it('should call ioNewNotifications', () => {
    expect(ioNewNotifications()).toBeUndefined();
  });
});
