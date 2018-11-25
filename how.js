/**
 * How to ?
 */

const path = require('path')

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
const mintopay = parseInt(args[2])

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

console.log(items)
