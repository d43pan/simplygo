// logger.ts
export enum LogLevel {
    None = 0,
    Error = 1,
    Warning = 2,
    Info = 3,
    Debug = 4
}

interface LoggerConfig {
    logLevel: LogLevel;
    logFunction: (message?: unknown, ...optionalParams: unknown[]) => void;
}

export class Logger {
    private config: LoggerConfig;

    constructor(config: LoggerConfig) {
        this.config = config;
    }

    private log(level: LogLevel, message?: unknown, ...optionalParams: unknown[]) {
        if (level <= this.config.logLevel) {
            this.config.logFunction(message, ...optionalParams);
        }
    }

    error(message?: unknown, ...optionalParams: unknown[]) {
        this.log(LogLevel.Error, message, ...optionalParams);
    }

    warning(message?: unknown, ...optionalParams: unknown[]) {
        this.log(LogLevel.Warning, message, ...optionalParams);
    }

    info(message?: unknown, ...optionalParams: unknown[]) {
        this.log(LogLevel.Info, message, ...optionalParams);
    }

    debug(message?: unknown, ...optionalParams: unknown[]) {
        this.log(LogLevel.Debug, message, ...optionalParams);
    }
}