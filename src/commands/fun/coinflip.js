export default {
  name: "coinflip",
  template: "coinflip",
  description: "Flips a coin and returns heads or tails.",
  run: message => {
    const coin = ["heads", "tails"];
    const flip = coin[Math.floor(Math.random() * coin.length)];
    message.channel.send(`${message.author} flipped a coin and it landed on ${flip}!`);
  },
};
