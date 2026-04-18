export type DubheConstellationStar = {
  name: string
  x: number
  y: number
  size: string
  primary?: boolean
  glow?: string
}

export const DUBHE_CONSTELLATION_STARS = [
  { name: 'Dubhe', x: 280, y: 60, size: 'w-6 h-6', glow: 'shadow-purple-500/50', primary: true },
  { name: 'Merak', x: 260, y: 130, size: 'w-4 h-4', glow: 'shadow-blue-500/50', primary: false },
  { name: 'Phecda', x: 200, y: 150, size: 'w-4 h-4', glow: 'shadow-purple-400/50', primary: false },
  { name: 'Megrez', x: 160, y: 100, size: 'w-3 h-3', glow: 'shadow-blue-400/50', primary: false },
  { name: 'Alioth', x: 130, y: 80, size: 'w-4 h-4', glow: 'shadow-purple-500/50', primary: false },
  { name: 'Mizar', x: 100, y: 60, size: 'w-4 h-4', glow: 'shadow-blue-400/50', primary: false },
  { name: 'Alkaid', x: 60, y: 80, size: 'w-4 h-4', glow: 'shadow-purple-400/50', primary: false }
] as const satisfies readonly DubheConstellationStar[]

export const DUBHE_CONSTELLATION_LINES = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [3, 4],
  [4, 5],
  [5, 6]
] as const satisfies ReadonlyArray<
  readonly [number, number]
>
