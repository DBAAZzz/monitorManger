import { defineComponent, PropType, Slots } from 'vue'
import { tableType, columnType } from './type'

const Table = defineComponent({
  props: {
    tableColumn: {
      type: Array as PropType<columnType[]>,
      default: () => {
        return []
      }
    },
    tableData: {
      type: Array as PropType<tableType[]>,
      default: () => {
        return []
      }
    }
  },
  setup(props) {
    return () => (
      <el-table data={props.tableData} style="width: 100%" height="250">
        {props.tableColumn.length != 0 && props.tableColumn.map((columnItem: columnType, index: number) => {
          return columnItem.slotEl ? <el-table-column
            key={columnItem.key}
            prop={columnItem.key}
            label={columnItem.label}
            width={columnItem.width}
            align={columnItem.align || 'center'}
            v-slots={{
              default: () => <div>
                <columnItem.slotEl></columnItem.slotEl>
              </div>
            }}
          ></el-table-column> :
            <el-table-column
              key={columnItem.key}
              prop={columnItem.key}
              label={columnItem.label}
              width={columnItem.width}
              align={columnItem.align || 'center'}
            >
            </el-table-column>
        })}
      </el-table>
    )
  }
})

export default Table