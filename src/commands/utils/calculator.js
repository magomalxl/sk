const math = require('mathjs')
const Command = require('../../config/Command')

module.exports = class CalculatorCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'calculator',
      aliases: ['calcular', 'math', 'c', 'calculator', 'calculadora'],
      category: 'utils',
      description: 'Faça cálculos simples! (Cálculos complexos não são suportados!)',
      example: '20 x 30',
      groupOnly: false,
      groupAdmPermission: {
        bot: false,
        user: false
      },
      ownerOnly: false
    })
  }

  async execute ({ msg, args }) {
    try {
      if (!args[0]) {
        return msg.send(`Você não especificou uma conta matematica.\n
Utilize "*+*" para somar
Utilize "*-*" para subtrair
Utilize "***" para multiplicar
Utilize "*/*" para dividir
Utilize "*%*" para porcentagem`, { reply: true })
      }
      let c = args.join('')
      c = c.replace(/x/g, '*')
      c = c.replace(/÷/g, '/')
      c = c.replace(/×/g, '*')
      await msg.send(`${c} = ${math.evaluate(c)}`, { reply: true })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
