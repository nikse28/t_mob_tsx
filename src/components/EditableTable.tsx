import React, { Component } from 'react'
import { Table, Input, InputNumber,Icon, Popconfirm, Form, Select } from 'antd';
import EditableCell from "./EditableCell";
const EditableContext = React.createContext('default');
const { Option }=Select;

interface ItableData {
    key:number,
    name?:string,
    age?:number,
    address?:string
}

interface IcolumnKeys {
    title: string,
    dataIndex?: string,
    width?: string,
    editable?: boolean,
}

class EditableTable extends React.Component <any,any> {
    constructor(props:any) {
        super(props);
        this.state = { 
            data :[
                {
                    key: 1,
                    name: `Edrward `,
                    age: 32,
                    address: `London Park no. `,
                  }
                  ,{
                    key: 2,
                    name: `kopiyr `,
                    age: 33,
                    address: `locaso Park no. `,
                  }
              ], 
            editingKey: '', 
          columns : [
          {
            title: 'Parameter',
            dataIndex: 'name',
            width: '25%',
            render:()=>{
              return (
                <Select style={{width:120}}>
                  <Option key={1}>
                    Param 1
                  </Option>
                  <Option key={2}>
                    Param 2
                  </Option>
                </Select>
              )
            },
          },
          {
            title: 'Operator',
            dataIndex: 'age',
            width: '15%',
            render:()=>{
              return (
                <Select style={{width:120}}>
                  <Option key={1}>
                    Operator 1
                  </Option>
                  <Option key={2}>
                    Operator 2
                  </Option>
                </Select>
              )
            }
          },
          {
            title: 'Value',
            dataIndex: 'address',
            width: '40%',
            editable: true,
          },
          {
            title: 'operation',
            dataIndex: 'operation',
            render: (text:any, record:any) => {
              const { editingKey }:any = this.state;
              const editable = this.isEditing(record);
              
              return  editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                        Save
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
                <a onClick={() => this.edit(record.key)}>
                  <Icon type="edit"/>
                </a>  
              )   
               
            },
          },
        ]
      };
      } 
      //constructor end

      isEditing = (record:any) => record.key === this.state.editingKey;

  cancel = (record:any) => {
    this.setState({ editingKey: '' });
  };

  save(form:any, key:any) {
    console.log("form data",form, key);
    form.validateFields((error:any, row:any) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  
  edit(key:any) {
    this.setState({ editingKey: key });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.state.columns.map((col:any) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record:any) => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          pagination={{
            onChange: this.cancel,
          }}
        />
      </EditableContext.Provider>
    );
  }

}
const EditableFormTable = Form.create()(EditableTable);
export default EditableFormTable;