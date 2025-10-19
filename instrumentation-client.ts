// Global message
console.log("Global Analytics initialized!");

export type MessageType = "info" | "warn" | "error";

export interface Message {
  timestamp: number;
  text: string;
  type: MessageType;
}

export class Log implements Message {
  timestamp: number;
  text: string;
  type: MessageType;

  private constructor(text: string, type: MessageType) {
    this.timestamp = Date.now();
    this.text = text;
    this.type = type;
  }

  // Should report message to DB
  report() {}

  // Should Format message for stdout represantation
  format() {}

  // Factory methods
  static info(text: string) {
    return new Log(text, 'info');
  }

  static warn(text: string) {
    return new Log(text, 'warn');
  }

  static error(text: string) {
    return new Log(text, 'error');
  }
}

// Error event listener
// Should Build a message and report it
window.addEventListener('error', (event) => {
  const message = Log.error(event.message)
});


