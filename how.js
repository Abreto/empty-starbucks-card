/**
 * How to ?
 */

const _ = require('lodash')

const args = process.argv.slice(2)

function printUsage () {
  console.log('usage:')
  console.log('')
  console.log('\tnode how <path/to/item.json> <banlance> <minimum amount>')
  console.log('')
  process.exit(1)
}

if (args.length !== 3) printUsage()

const itemjson = args[0]
const banlance = parseInt(args[1])
const minToPay = parseInt(args[2])

const raws = require(itemjson)

const items = []

raws.forEach(raw => {
  const name = raw[0]
  if (raw.length === 2) {
    items.push({
      name,
      price: parseInt(raw[1])
    })
  } else {
    const suffix = ['', '（中杯）', '（大杯）', '（超大杯）']
    for (let i = 1; i <= 3; i++) {
      items.push({
        name: name + suffix[i],
        price: parseInt(raw[i])
      })
    }
  }
})

const groups = _.groupBy(items, 'price')
const prices = _.uniq(items.map(item => item.price))

const result = require('./lib/dp')(prices, banlance, minToPay)

console.log(`当卡余额为 ${banlance} 时，最少需充值 ${result.answer * minToPay} 元才能恰好用完`)
console.log('参考使用方案：')
result.seq.forEach(price => {
  let str
  if (price < 0) {
    str = `充值 ${-price} 元`
  } else {
    str = `消费 ${price} 元:`
    groups[price].forEach(item => {
      str += ' ' + item.name
    })
  }
  console.log(str)
})
