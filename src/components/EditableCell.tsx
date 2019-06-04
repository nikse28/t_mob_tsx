import React, { Component } from 'react'
import { Table, Input, InputNumber, Popconfirm, Form, Button } from 'antd';
import EditableFormTable from "./EditableTable"


const EditableContext = React.createContext('default');
class EditableCell extends React.Component <any,any> {

    getInput = () => {
        if (this.props.inputType === 'number') {
          return <InputNumber />;
        }
        return <Input />;
      };
  renderCell = () => {
    console.log('data index',this.props.title);
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    const { getFieldDecorator } = this.props.form;
    console.log();
    return (      
      <td {...restProps}>
        
        {editing ? (  
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())
            }
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  }; 
    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

const EditableCellTable = Form.create()(EditableCell);
export default EditableCellTable;

// export default EditableCell;