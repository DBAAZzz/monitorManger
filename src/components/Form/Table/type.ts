import { ComponentOptionsBase } from "vue";

export interface tableType {
  [propName: string]: any
}

interface renderType {
  render: Function
}

export interface columnType {
  key: string,
  label: string
  width?: string,
  align?: string,
  slotEl?: renderType
}