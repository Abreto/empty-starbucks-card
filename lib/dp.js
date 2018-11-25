/**
 * Do dynamic programming
 */

const inf = parseInt(1e9)
let mem, pre
let candidates, unit
let minimumPrice

function init (prices, minToPay) {
  mem = {
    '0': 0
  }
  pre = {}
  candidates = prices
  minimumPrice = Math.min(...prices)
  unit = minToPay
}

function f (x) {
  if (mem[x] === undefined) {
    if (x < minimumPrice) {
      mem[x] = f(x + unit) + 1
      pre[x] = x + unit
    } else {
      mem[x] = inf
      candidates.forEach(choice => {
        const tbd = f(x - choice)
        if (tbd < mem[x]) {
          mem[x] = tbd
          pre[x] = x - choice
        }
      })
    }
  }
  return mem[x]
}

module.exports = (prices, banlance, minToPay) => {
  init(prices, minToPay)
  const answer = f(banlance)
  const seq = []
  let y = banlance
  while (y !== 0) {
    seq.push(y - pre[y])
    y = pre[y]
  }
  return {
    answer,
    seq
  }
}
