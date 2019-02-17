import { Point } from '../interface/coordinate';

export function createCanvasContext2D(
  width?: number,
  height?: number
): CanvasRenderingContext2D | null {
  const canvas: HTMLCanvasElement = document.createElement('canvas');

  if (typeof width === 'number') {
    canvas.width = width;
  }

  if (typeof height === 'number') {
    canvas.height = height;
  }

  return canvas.getContext('2d');
}

export function getMousePixel(element: HTMLElement, evt: Event): Point | null {
  if (typeof (evt as any).clientX === 'undefined' || typeof (evt as any).clientY === 'undefined') {
    return null;
  }

  const rect: ClientRect | DOMRect = element.getBoundingClientRect();
  return {
    x: (evt as any).clientX - rect.left,
    y: (evt as any).clientY - rect.top
  };
}
