import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { CurrentPlatform } from "../constants/constants";

let doneWithInitialization: boolean = false;

export function doneWithInit(): boolean {
  return doneWithInitialization;
}

export function setInitDone(): void {
  doneWithInitialization = true;
}

export function stripRgb(color: string): string {
  return color.replace('rgb(', '').replace(')', '');
}

export function hexToRgb(hex: string, valuesOnly: boolean = false): string | null {
  hex = hex.replace('#', '');
  var bigint = parseInt(hex, 16);
  var res = [(bigint = parseInt(hex, 16)) >> 16 & 255, bigint >> 8 & 255, bigint & 255].join();
  if (!valuesOnly) res = 'rgb(' + res + ')';
  return res;
}

export function rgbToHex(rgb: string) {
  var r, g, b: number;
  [r, g, b] = stripRgb(rgb).split(',').map(res => parseInt(res));
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

export function calculateColorBrightness(color: string) {
  color = color.substring(1);
  var rgb = parseInt(color, 16);
  var r = (rgb >> 16) & 0xff;
  var g = (rgb >> 8) & 0xff;
  var b = (rgb >> 0) & 0xff;

  var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // ITU-R BT.709
  return luma;
}

export function lightenColor(color: string, factor: number = 1): string {
  var splitValues: string[] = stripRgb(color).split(',');
  splitValues.forEach((elem: string, index: number) => {
    splitValues[index] = `${Math.min(parseInt(elem) + (20 * factor), 255)}`;
  });
  return `${splitValues[0]}, ${splitValues[1]}, ${splitValues[2]}`;
}

export function darkenColor(color: string, factor: number = 1): string {
  var splitValues: string[] = stripRgb(color).split(',');
  splitValues.forEach((elem: string, index: number) => {
    splitValues[index] = `${Math.min((parseInt(elem) - (20 * factor)), 255)}`;
  });
  return `${splitValues[0]}, ${splitValues[1]}, ${splitValues[2]}`;
}

export function convertStringToPlatform(s: string): CurrentPlatform {
  switch (s) {
    case 'win32': return CurrentPlatform.Windows;
    case 'darwin': return CurrentPlatform.Mac;
    case 'linux': return CurrentPlatform.Linux;
    default: return CurrentPlatform.Web;
  }
}

export let documentClickedTarget: Subject<HTMLElement> = new Subject<HTMLElement>()
export let windowResized: EventEmitter<number> = new EventEmitter<number>();
