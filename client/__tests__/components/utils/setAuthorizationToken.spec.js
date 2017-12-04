import React from 'react';
import setAuthorizationToken from 'utils/setAuthorizationToken';

describe('# Set Authorization Token', () => {
  it('should set axios header when token is passed', () => {
    setAuthorizationToken('token-is-here');
  });
});
