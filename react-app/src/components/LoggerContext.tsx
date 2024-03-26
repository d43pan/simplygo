// LoggerContext.tsx
import React from 'react';
import { Logger, LogLevel } from '../utils/logger';

// Create a logger instance
const logger = new Logger({
    logLevel: LogLevel.Debug,
    logFunction: console.log
});

// Export logger
export { logger };


// Create a context with the logger instance
export const LoggerContext = React.createContext(logger);