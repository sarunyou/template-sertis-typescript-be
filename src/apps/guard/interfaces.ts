export const securityDictionary = {
  hashAlgorithm: {
    env: 'SERVER_SIDE_HASH_ALGORITHM',
    default: 'sha256',
  },
  serverSideKey: {
    env: 'SERVER_SIDE_KEY',
  },
}

export type SecurityConfig = {
  hashAlgorithm: string,
  serverSideKey: string,
}
