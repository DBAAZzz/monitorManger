export const Test = {
  props: {
    objectValue: {
      type: String,
      default: () => {
        return '我是默认的值'
      }
    }
  },
  render(props) {
    return (
      <div>
        <p >{props.objectValue}</p>
      </div>
    )
  }
}

