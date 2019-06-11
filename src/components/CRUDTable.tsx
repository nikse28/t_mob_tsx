import React, { Component } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';

type EditableCellData = {
    key:number,
    name:string,
    age:number,
    address:string
}

type EditableCellProps = {
    inputType:string,
    editing:boolean,
    dataIndex:string,
    title:string,
    record:any,
    index:number,
    children:object,
    restProps:object
}
const data:Array<EditableCellData> = [];
for (let i = 0; i < 5; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const EditableContext = React.createContext('default');

class EditableCell extends Component <EditableCellProps> {
    constructor(props:any) {
        super(props);
        this.renderCell = this.renderCell.bind(this);    
        this.getInput = this.getInput.bind(this);
    }
    getInput() {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    renderCell({ getFieldDecorator }:any) {
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
        
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    message: `Please Input ${title}!`,
                                    required: true,
                                },
                            ],
                            initialValue: record[dataIndex],
                        })(this.getInput())}
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

type EditableTableColumn = {
    title: string,
    dataIndex: string,
    width: string,
    editable: boolean
}
type EditableTableProps = {
    key:number,
    form:any,
    columns?:EditableTableColumn[],
    text?:any,

}
type EditableTableStates = {
    editingKey:string,
    data:Array<object>,
}

class EditableTable extends React.Component<EditableTableProps,EditableTableStates> {
    columns:any;
    constructor(props:EditableTableProps) {
        super(props);
        this.state = { data , editingKey: '' };
        this.isEditing = this.isEditing.bind(this);
        this.cancel = this.cancel.bind(this);
        this.save = this.save.bind(this);
        this.edit = this.edit.bind(this);
        this.columns= [
            {
                title: 'name',
                dataIndex: 'name',
                width: '25%',
                editable: true,
            },
            {
                title: 'age',
                dataIndex: 'age',
                width: '15%',
                editable: true,
            },
            {
                title: 'address',
                dataIndex: 'address',
                width: '40%',
                editable: true,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text:any, record:any) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (
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
                                Edit
                            </a>
                        );
                },
            },
        ];
    }


    isEditing = (record:any) => record.key === this.state.editingKey;

    cancel (e:any) {
        console.log('Erd',e);
        this.setState({ editingKey: '' });
    }

    save(form:any, key:any) {
        console.log('f m',form, key);
            const newData = [...this.state.data];
            console.log('Save...',newData);
            console.log('====Save ========');
        form.validateFields((error:any, row:any) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];

            // const index = newData.findIndex(item => key === item.key);
            
            // if (index > -1) {
            //     const item = newData[index];
            //     newData.splice(index, 1, {
            //         ...item,
            //         ...row,
            //     });
            //     this.setState({ data: newData, editingKey: '' });
            // } else {
            //     newData.push(row);
            //     this.setState({ data: newData, editingKey: '' });
            // }
        });
    }

    edit(key:any) {
        console.log('Keys...',key)
        this.setState({ editingKey: key });
    }

    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col:any)=> {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: (record:any)=> ({
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
                />
            </EditableContext.Provider>
        );
    }
}

const CRUDTable = Form.create()(EditableTable);
export default CRUDTable;