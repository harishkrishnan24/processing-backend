import { createLogger, transports, format } from 'winston';

const logger = createLogger({
  level: 'http',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.colorize(),
    format.printf((info) => {
      // Clean up ANSI escape codes from Morgan output
      const cleanMessage = String(info.message).replace(
        /\u001b\[[0-9;]*m/g,
        ''
      );
      return `${info.timestamp} [${info.level}]: ${cleanMessage}`;
    })
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf((info) => {
          const cleanMessage = String(info.message).replace(
            /\u001b\[[0-9;]*m/g,
            ''
          );
          return `${info.timestamp} [${info.level}]: ${cleanMessage}`;
        })
      ),
    }),
  ],
});

export default logger;
