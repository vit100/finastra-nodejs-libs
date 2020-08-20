import { OidcModuleOptions, UserInfoMethod } from './interfaces';
import { Issuer, Client } from 'openid-client';
import { OidcHelpers } from './utils';
import { JWKS } from 'jose';

export const MOCK_ISSUER = 'http://issuer.io';
export const CLIENT_ID = '123';

export const MOCK_ISSUER_INSTANCE = new Issuer({ issuer: MOCK_ISSUER });
export const MOCK_CLIENT_INSTANCE = new MOCK_ISSUER_INSTANCE.Client({
  client_id: CLIENT_ID,
});
export const MOCK_TRUST_ISSUER = {
  metadata: {
    token_endpoint: '/token',
    end_session_endpoint: '/end_session',
  },
} as Issuer<Client>;

export const MOCK_OIDC_MODULE_OPTIONS: OidcModuleOptions = {
  issuer: MOCK_ISSUER,
  clientMetadata: {
    client_id: CLIENT_ID,
    client_secret: '456',
  },
  authParams: {
    scope: 'oidc profile',
  },
  defaultHttpOptions: {
    timeout: 0,
  },
  idleTime: 30,
  origin: 'bla',
  userInfoMethod: UserInfoMethod.token,
  externalIdps: {
    idpTest: {
      clientId: 'clientId',
      clientSecret: 'clientSecret',
      issuer: 'http://issuer',
      scope: 'openid',
    },
  },
};

export class MockOidcService {
  helpers = new OidcHelpers(
    new JWKS.KeyStore([]),
    MOCK_CLIENT_INSTANCE,
    MOCK_OIDC_MODULE_OPTIONS,
    MOCK_TRUST_ISSUER,
  );
}
