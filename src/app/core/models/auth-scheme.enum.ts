export enum AuthScheme {

  /** Basic HTTP authentication scheme that transmits credentials as user ID/password pairs, encoded using base64. */
  BASIC,

  /** Bearer tokens to access OAuth 2.0-protected resources */
  BEARER,

  /** The Digest Authentication scheme */
  DIGEST,

  /** HTTP Origin-Bound Authentication, digital-signature-based */
  HOBA,

  /** AWS4-HMAC-SHA256 as algorith used to calculate signature*/
  AWS
}
