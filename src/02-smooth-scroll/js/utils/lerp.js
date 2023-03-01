/**
 * @function lerp
 * @description Interpolates values based off a start, target and ease
 * */
export function lerp(start, target, ease) {
  return (1 - ease) * start + ease * target;
}
