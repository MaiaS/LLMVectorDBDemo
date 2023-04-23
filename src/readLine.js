import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const prompt = (query) =>
  new Promise((resolve) => rl.question(`\n\n${query}\nRespond:`, resolve));

export default prompt;
