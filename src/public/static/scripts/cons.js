export const log = (text) => console.log(`%c${text} called`, "color: ghostwhite; font-size: 19px; background: black; padding: 4px; border: 2px solid ghostwhite; border-radius: 2px;");
export const info = (text) => console.log(`\t%c[INFO]%c${text}`, "color: green; font-size: 13px; background: black; padding: 3px; margin: 0;", "color: ghostwhite; font-size: 13px; background: black; padding: 3px; margin: 0;");
export const error = (errMes) => console.error(`%c${errMes}`, "font-size: 16px; background-color: black; color: red;");