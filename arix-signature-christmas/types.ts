export interface OrnamentProps {
  position: [number, number, number];
  color: string;
  scale?: number;
  type?: 'sphere' | 'diamond';
}

export interface TreeLayerProps {
  position: [number, number, number];
  scale: number;
  rotationOffset: number;
}
