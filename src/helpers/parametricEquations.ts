import { MathUtils } from "three"


const parametricEquations = {
  Horizon(theta, a): { x: number; y: number; z: number } {
    let x = Math.asin((a * Math.sin(theta) * Math.cos(theta)) / theta)
    let y = Math.asin((a * Math.pow(Math.sin(theta), 2)) / theta)

    // let z = Math.sin(theta)
    let z = 0
    return { x, y, z }
  },
  Ellipse(theta, a) {
    let x = Math.cos(theta) * a
    let y = Math.sin(theta) * a
    let z = 0
    return { x, y, z }
  },
  DopplerSpiral(theta, a) {
    let k = 2;
    let x = a *(theta * Math.cos(theta) + (k * theta));
    let y = a *(theta * Math.sin(theta));
    let z = theta * 3;
    return { x, y, z }
  },
  SuperEllipse(theta, a) {
    let m = 0.2
    let n = 3
    let x
    let y
    x =
      Math.abs(-Math.pow(Math.cos(theta), 2 / m))
      a *
      Math.sign(Math.cos(theta))
    y =
      Math.abs(-Math.pow(Math.sin(theta), 2 / n)) *
      a *
      Math.sign(Math.sin(theta))
    let z = 0
    return { x, y, z }
  },
  Astroid(theta, a) {
    let x = a * Math.pow(Math.cos(theta), 3)
    let y = a * Math.pow(Math.sin(theta), 3)
    let z = 0
    return { x, y, z }
  },
  Bicorn(theta, a) {
    let x = a * Math.sin(theta)
    let upper = Math.pow(Math.cos(theta), 2) * 2 + Math.cos(theta)
    let lower = 3 + Math.pow(Math.sin(theta), 2)
    let y = a * (upper / lower)
    let z = 0
    return { x, y, z }
  },
  Leminscate(theta, a) {
    let x = (a * Math.cos(theta)) / (1 + Math.pow(Math.sin(theta), 2))
    let y =
      (a * Math.sin(theta) * Math.cos(theta)) /
      (1 + Math.pow(Math.sin(theta), 2))
    let z = 0
    return { x, y, z }
  },
}
export default parametricEquations
