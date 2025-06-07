import pino from "pino";

export default class Logger {
    private logger: pino.Logger;

    constructor(context: string) {
        this.logger = pino({
            transport:{
                target: 'pino-pretty',
                options: {
                    colorize: true,
                }
            }
        });
         if (context){
             this.logger = this.logger.child({context})
         }
    }
    info(message: string, meta?: object) {
        this.logger.info(meta, message);
    }

    warn(message: string, meta?: object) {
        this.logger.warn(meta, message);
    }

    error(message: string, meta?: object) {
        this.logger.error(meta, message);
    }

    debug(message: string, meta?: object) {
        this.logger.debug(meta, message);
    }
}