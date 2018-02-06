import * as cognitoUserLib from '_src/modules/user/lib/cognito-user'
import * as authLib from '_src/modules/user/lib/auth'

describe('attemptAutoLogIn', () => {
  it('should handle finding a valid cognito user in local storage', () => {
    const session = { isValid: jest.fn().mockReturnValue(true) }
    const cognitoUser = { getSession: jest.fn(cb => cb(null, session)) }

    cognitoUserLib.getCurrentCognitoUser = jest
      .fn()
      .mockReturnValue(cognitoUser)

    return authLib.attemptAutoLogIn().then(result => {
      expect(result).toEqual(cognitoUser)
    })
  })

  it('should handle finding an invalid cognito user in local storage', () => {
    const session = { isValid: jest.fn().mockReturnValue(false) }
    const cognitoUser = { getSession: jest.fn(cb => cb(null, session)) }

    cognitoUserLib.getCurrentCognitoUser = jest
      .fn()
      .mockReturnValue(cognitoUser)

    return authLib.attemptAutoLogIn().then(result => {
      expect(result).toEqual(null)
    })
  })

  it('should handle an error when getting the cognito user in local storage', () => {
    const cognitoUser = {
      getSession: jest.fn(cb => cb(new Error('deliberately thrown')))
    }

    cognitoUserLib.getCurrentCognitoUser = jest
      .fn()
      .mockReturnValue(cognitoUser)

    return authLib.attemptAutoLogIn().then(result => {
      expect(result).toEqual(null)
    })
  })

  it('should handle not finding a cognito user in local storage', () => {
    cognitoUserLib.getCurrentCognitoUser = jest.fn().mockReturnValue(null)

    return authLib.attemptAutoLogIn().then(result => {
      expect(result).toEqual(null)
    })
  })
})

describe('authenticateUser', () => {
  it('should handle authenticating a user when authentication succeeds', () => {
    const cognitoUser = {
      authenticateUser: jest.fn((_, cb) => cb.onSuccess())
    }

    cognitoUserLib.createCognitoUser = jest.fn().mockReturnValue(cognitoUser)

    return authLib
      .authenticateUser('some-username', 'some-password')
      .then(result => {
        expect(cognitoUser.authenticateUser).toHaveBeenCalled()
        expect(result).toEqual(cognitoUser)
      })
  })

  it('should handle authenticating a user when authentication fails', () => {
    const cognitoUser = {
      authenticateUser: jest.fn((_, cb) => cb.onFailure())
    }

    cognitoUserLib.createCognitoUser = jest.fn().mockReturnValue(cognitoUser)

    return authLib
      .authenticateUser('some-username', 'some-password')
      .then(() => {
        throw new Error('shold have failed')
      })
      .catch(err => {
        expect(err.message).toEqual('Authentication failed')
      })
  })
})

describe('logOutCurrentUser', () => {
  it('should log the current user out', () => {
    const cognitoUser = { signOut: jest.fn() }

    cognitoUserLib.getCurrentCognitoUser = jest
      .fn()
      .mockReturnValue(cognitoUser)

    authLib.logOutCurrentUser()

    expect(cognitoUser.signOut).toHaveBeenCalled()
  })

  it('should handle logging out when there is no current user', () => {
    cognitoUserLib.getCurrentCognitoUser = jest.fn().mockReturnValue(null)
    authLib.logOutCurrentUser()
  })
})

describe('getSessionToken', () => {
  it('should handle successfully getting a session token', () => {
    const jwtToken = 'the token'

    const idToken = { getJwtToken: jest.fn().mockReturnValue(jwtToken) }

    const session = {
      isValid: jest.fn().mockReturnValue(true),
      getIdToken: jest.fn().mockReturnValue(idToken)
    }

    const cognitoUser = { getSession: jest.fn(cb => cb(null, session)) }

    return authLib.getSessionToken(cognitoUser).then(token => {
      expect(token).toEqual(jwtToken)
    })
  })

  it('should handle successfully getting an invalid session token', () => {
    const session = { isValid: jest.fn().mockReturnValue(false) }
    const cognitoUser = { getSession: jest.fn(cb => cb(null, session)) }

    return authLib.getSessionToken(cognitoUser).then(token => {
      expect(token).toEqual(null)
    })
  })

  it('should handle an error when getting a session token', () => {
    const cognitoUser = {
      getSession: jest.fn(cb => cb(new Error('deliberately thrown')))
    }

    return authLib.getSessionToken(cognitoUser).then(token => {
      expect(token).toEqual(null)
    })
  })
})
