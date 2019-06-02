import React, { Component } from "react";
import { Select, Table ,Button ,Icon ,Tooltip , message ,} from "antd";

export default class TableRules extends Component {

    state={
        data : [
            {
              key: 1,
              name: "John doe",
              age: 22,
              address: "NKASDmlk kGSAD",
              operation: "Edit delete"
            }
          ]
    }
   
  constructor(props: any) {
    super(props);
    console.log("fff", props);   
  }
  
  columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render:()=>{
          return(
              <div>
                  <select name="" id="">
                      <option value="as">Lorem</option>
                      <option value="as">Torem</option>
                  </select>
              </div>
          )
      }  
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "Address",
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
                 <Tooltip title="Save"> <Icon style={{fontSize:18,color:"black"}} type="save" onClick={()=>this.handleSaveRow(record,text)}/> </Tooltip>|
                 <Tooltip title="Delete"> <Icon style={{fontSize:18,color:"black"}} type="delete" onClick={()=>{this.handleDeleteRow(record)}}/> </Tooltip> |
                 <Tooltip title="Edit"> <Icon style={{fontSize:18,color:"black"}} type="edit" onClick={()=>{this.handleDeleteRow(record)}}/>  </Tooltip>
             </div>
          )
      }
    }
  ];
  
  
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
  handleSaveRow=(record:any,text:any)=>{
    console.log('Loggin',record);
    console.log('text',text);
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
