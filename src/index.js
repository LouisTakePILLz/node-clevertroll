import request from 'superagent';
import fbLogin from 'facebook-chat-api';
import Cleverbot from 'cleverbot.io';
import options from './options';

const { API_CLEVERBOT_USER, API_CLEVERBOT_TOKEN } = process.env;

const email = options['email'] || options['e'];
const password = options['password'] || options['p'];
const minDelay = options['mindelay'] || 700;
const maxDelay = options['maxdelay'] || 3000;
const useDelay = !!options['no-delay'];

const optError = (message, exitCode = 1) => {
  console.error(message);
  process.exit(exitCode);
}

if (typeof API_CLEVERBOT_USER !== 'string'
  || typeof API_CLEVERBOT_TOKEN !== 'string') {
  optError('The Cleverbot API credentials could not be found; is your environment setup properly?');
}

if (typeof email !== 'string') {
  optError('Invalid email address format');
}

if (typeof password !== 'string') {
  optError('Invalid password format');
}

const bot = new Cleverbot(API_CLEVERBOT_USER, API_CLEVERBOT_TOKEN);

fbLogin({ email, password }, (err, fb) => {
  if (err) {
    return console.error(err);
  }

  fb.listen((err, msg) => {
    if (err) {
      return console.error(err);
    }

    bot.setNick(`session${msg.threadID}`);
    bot.create((err, session) => {
      bot.ask(msg.body, (err, res) => {
        const delay = useDelay ? Math.min(Math.random() * maxDelay, minDelay) : 0;
        setTimeout(() => fb.sendMessage(res, msg.threadID), delay);
      });
    });
  });
});
