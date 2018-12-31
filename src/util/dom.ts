export function createCanvasContext2D(
  width: number,
  height: number
): CanvasRenderingContext2D | null {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  return canvas.getContext('2d');
}
