const Command = require('../../config/Command')

module.exports = class FortuneCommand extends Command {
  constructor (zap) {
    super(zap, {
      name: 'fortune',
      aliases: ['vidente', 'pergunta', 'psychic', 'fortuneteller'],
      category: 'fun',
      description: 'Faça uma pergunta e o Afonso irá te responder!',
      example: 'vidente vou ganhar na mega sena amanhã?',
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
      const answer = require('../../config/games/fortune.json')
      if (!args[0]) return await msg.send('Eita, você não fez nenhuma pergunta meu caro amigo!', { reply: true })
      const quest = args.join(' ')
      const randomAnswer = answer[this.getRandomInt(0, Object.keys(answer).length)]
      await msg.send(`_Pergunta_: *${quest}*\n_Resposta_: *${randomAnswer}*\n\n🔮 | Afonso, o vidente.`, { reply: true })
    } catch (err) {
      await msg.zapFail(err)
    }
  }
}
