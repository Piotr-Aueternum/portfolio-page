import chalk from 'chalk';

export default function consoleTime() {
    var date = new Date();
    var h = date.getHours();
    h = (h < 10 ? "0" : "") + h;
    var m  = date.getMinutes();
    m = (m < 10 ? "0" : "") + m;
    var s  = date.getSeconds();
    s = (s < 10 ? "0" : "") + s;
    return "[" + chalk.gray(h + ":" + m + ":" + s) + "] ";
}