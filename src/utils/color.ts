import { furthest } from 'color-diff';
// const color = { R: 255, G: 1, B: 30 };
// // red, green, blue
// const palette = [ {R: 255, G: 0, B: 0 },
//                 {R: 0, G: 255, B: 0 },
//                 {R: 0, G: 0, B: 255} ];

// closest(color, palette); // {R: 255, G: 0, B: 0 }, red
// furthest
const tmpColor = [
  { R: 30, G: 30, B: 30 },
  { R: 230, G: 230, B: 230 },
];
export const getFurthestColor = (color: string) => {
  const [R1, R2, G1, G2, B1, B2] = color.replace(/^#/, '').split('');
  const R = Number.parseInt(R1 + R2, 16);
  const G = Number.parseInt(G1 + G2, 16);
  const B = Number.parseInt(B1 + B2, 16);
  const a = furthest({
    R,
    G,
    B,
  }, tmpColor);
  return '#' + a.R.toString(16) + a.G.toString(16) + a.B.toString(16);
}