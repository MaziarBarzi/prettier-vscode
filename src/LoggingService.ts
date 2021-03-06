import * as prettier from "prettier";
// tslint:disable-next-line: no-implicit-dependencies
import { window } from "vscode";

type LogLevel = "INFO" | "WARN" | "ERROR";

export class LoggingService {
  private outputChannel = window.createOutputChannel("Prettier");

  /**
   * Append messages to the output channel and format it with a title
   *
   * @param message The message to append to the output channel
   */
  public logInfo(message: string, data?: object): void {
    this.logMessage(message, "INFO");
    if (data) {
      this.logObject(data);
    }
  }

  /**
   * Append messages to the output channel and format it with a title
   *
   * @param message The message to append to the output channel
   */
  public logWarning(message: string, data?: object): void {
    this.logMessage(message, "WARN");
    if (data) {
      this.logObject(data);
    }
  }

  public logError(message: string, error?: Error | string) {
    this.logMessage(message, "ERROR");
    if (error instanceof Error) {
      if (error.message) {
        this.outputChannel.appendLine(error.message);
      }
      if (error.stack) {
        this.outputChannel.appendLine(error.stack);
      }
    } else if (error) {
      this.outputChannel.appendLine(error);
    }
  }

  public show() {
    this.outputChannel.show();
  }

  private logObject(data: object): void {
    const message = prettier
      .format(JSON.stringify(data, null, 2), {
        parser: "json"
      })
      .trim();
    this.outputChannel.appendLine(message);
  }

  /**
   * Append messages to the output channel and format it with a title
   *
   * @param message The message to append to the output channel
   */
  private logMessage(message: string, logLevel: LogLevel): void {
    const title = new Date().toLocaleTimeString();
    this.outputChannel.appendLine(`["${logLevel}" - ${title}] ${message}`);
  }
}
