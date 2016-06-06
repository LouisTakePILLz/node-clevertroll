import parseArgs from 'minimist';

const opts = {
  string: ['email', 'password'],
  boolean: ['delay']
};

const params = parseArgs(process.argv.slice(2), opts);

export default params;
