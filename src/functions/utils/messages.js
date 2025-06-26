import Chance from "chance";
import { readJsonFile } from "./data.js"
export function getMessage(name) {
    const config = readJsonFile(a);
    const messages=config.whatsapp.messages;
    const chance = new Chance();
    const randomIndex = chance.integer({ min: 0, max: messages.length - 1 });
    return messages[randomIndex];
}