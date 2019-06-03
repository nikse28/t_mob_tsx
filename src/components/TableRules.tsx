import React, { Component } from "react";
import { Select, Table ,Button ,Icon ,Tooltip , message , Input } from "antd";
const { Option } = Select;
export default class TableRules extends Component {

    state={
        isWritable: false,

        data : [
            {
              key: 1,
              name: "John doe",
              age: 22,
              address: "NKASDmlk kGSAD",
              operation: "Edit delete"
            },
            {
              key: 2,
              name: "Kiza Charli",
              age: 33,
              address: "Loria kGSAD",
              operation: "Edit delete"
            }
          ]
    }
   
  
  columns = [
    {
      title: "Parameter",
      dataIndex: "name",
      key: "name",
      render:()=>{
          return(
              <div>
                  <Select style={{width:120}}>
                    <Option key={1}>Param 1</Option>
                    <Option key={2}>Param 2</Option>
                  </Select>
              </div>
          )
      }  
    },
    {
      title: "Operator",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "Value",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "Operation",
      dataIndex: "operation",
      key: "operation",
      render:(text:any,record:any)=>{
          return(
              <div>
                 <Tooltip title="Save"> <Icon style={{fontSize:18,color:"black"}} type="save" onClick={()=>this.handleSaveRow(record)}/> </Tooltip>|
                 <Tooltip title="Delete"> <Icon style={{fontSize:18,color:"black"}} type="delete" onClick={()=>{this.handleDeleteRow(record)}}/> </Tooltip> |
                 <Tooltip title="Edit"> <Icon style={{fontSize:18,color:"black"}} type="edit" onClick={()=>{this.handleEditRow(record)}}/>  </Tooltip>
             </div>
          )
      }
    }
  ];
  
  handleEditRow=(rowData:any)=>{
    console.log('Clicked',rowData);
    if(rowData.key==1) {
      return <Input/>
    }
  }
  
  handleAddRow=()=>{
    const newValue = {
      key: 3,
      name: "KIzO Brics",
      age: 23,
      address: "Gankolr record filt",
      operation: "Edit Delete"
    }
      this.setState({
        data:[
          ...this.state.data,
           newValue   
        ]
      }
    )
      
  }
  handleSaveRow=(record:any)=>{
    console.log('Loggin',record);
    message.success('Data Save Successfully ');
  }

  handleDeleteRow=(item:any)=>{
    const newState = this.state.data;
  	if (newState.indexOf(item) > -1) {
    	newState.splice(newState.indexOf(item), 1);
      this.setState({data: newState})
    }  
  }

  render() {
    const { Option } = Select;
    return (
        <div>
            <Button type="primary" onClick={this.handleAddRow}>Add Row </Button><br/><br/>
            <Table columns={this.columns} dataSource={this.state.data} pagination={false}/>
        </div>
    );
  }
}
