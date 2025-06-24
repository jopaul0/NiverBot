import Chance from "chance";
export function getMessage(name) {
    const messages=[
         `🎉 Feliz aniversário, ${name}! 🎂\nDesejamos a você um novo ciclo cheio de saúde, sucesso e muitas conquistas. Que a prosperidade caminhe com você, e saiba que pode contar com a gente! ✨\nCom carinho, OnVale Contabilidade.`,
        `🎉 ${name}, parabéns pelo seu dia! 🥳\nNós, da Onvale Contabilidade, desejamos um novo ciclo cheio de saúde, sucesso e realizações. Que a vida te surpreenda positivamente em cada etapa, e que possamos seguir juntos, contribuindo para o seu crescimento!✨\nFeliz aniversário! 🎂`,
        `🎉 ${name}, Hoje é dia de comemorar! 🎉\nA equipe da Onvale Contabilidade te deseja um aniversário incrível, cheio de alegrias, conquistas e motivos para sorrir. Que esse novo ciclo venha com ainda mais prosperidade. Conte com a gente nessa jornada!✨\nFelicidades! 🥳 `
    ]
    const chance = new Chance();
    const randomIndex = chance.integer({ min: 0, max: messages.length - 1 });
    return messages[randomIndex];
}