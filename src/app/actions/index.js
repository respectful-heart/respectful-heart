/* @flow */

export type Action<U, V> = {
  type: $Keys<U>,
  payload: V
}
