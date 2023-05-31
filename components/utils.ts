// @TODO: this can be smarter
// we can use each emoji color to represent how depleted a "section" of fuel is
// lets say we do 5, each chunk is 20%
// 20 = 🟩
// 10 = 🟨
// 5 = 🟥
// 0 = ⬜️
// hmm I still don't love that, oh well, it's simple to change later
// would be better if I did something like
// 🟩🟩🟩🟩⬜️
// 🟨🟨🟨⬜️⬜️
// 🟥🟥⬜️⬜️⬜️

import { Ship, System, Waypoint } from "@spacejunk/airlock"

// but I'd like to give more fidelity in the measurement, since fuel is important!
export const displayFuel = (current: number, capacity: number)=> {
    const fullEmoji = "🟩";
    const partialEmoji = "🟨";
    const lowEmoji = "🟥";
    const emptyEmoji = "⬜️";

    let percentage = (current / capacity) * 100;
    let fuelDisplay = '';

    for (let i = 0; i < 5; i++) {
        if (percentage >= 20) {
            fuelDisplay += fullEmoji;
        } else if (percentage >= 10) {
            fuelDisplay += partialEmoji;
        } else if (percentage > 0) {
            fuelDisplay += lowEmoji;
        } else {
            fuelDisplay += emptyEmoji;
        }
        percentage -= 20; // Each emoji represents 20% of the tank
    }

    return fuelDisplay;
}
export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const hasMarketplace = (waypoint?: Waypoint): boolean => 
    (waypoint && waypoint.traits.some(({symbol}) => symbol === "MARKETPLACE")) ?? false;

export const isFuelFull = ({fuel: {capacity, current}}: Ship) => current >= capacity

export const normalizePosition = (systems: System[]): System[] => {
  const minX = Math.min(...systems.map(({ x }) => x));
  const minY = Math.min(...systems.map(({ y }) => y));

  return systems.map(system => ({
    ...system,
    x: system.x - minX,
    y: system.y - minY,
  }));
};
