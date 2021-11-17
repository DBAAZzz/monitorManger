export type DefaultOption = {
  type: string,
  label: string,
  value: any,
  key: Array<string>,
  placeholder?: string,
  startPlaceholder?: string,
  endPlaceholder?: string,
  options?: Array<Options>
}

export type Options = {
  label: string,
  value: any
}
