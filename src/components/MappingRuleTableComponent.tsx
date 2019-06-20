import React, { Component } from "react";
import { Table, Icon ,Button , Input, Select } from "antd";

type MappingRuleTableState = {
  isEditMode: boolean;
  parameterText: string;
  operatorText: string;
  valueText: string;
  notesText:string;
  cancelButton:boolean;
  deleteButton:boolean;
  editingKey:number;
}

type MappingRuleTableProps = {
  source:string;
  textMode?:()=>void;
  saveModes?:any;
  deleteMode?: any;
  onEditMode?:any;
}


export default class MappingRuleTableComponent extends Component<MappingRuleTableProps, MappingRuleTableState> {
  public updateIndex:number = 1;
  constructor(props: any) {
    super(props);
    this.state = {
      isEditMode: true,
      editingKey:1,
      cancelButton:false,
      deleteButton:true,
      operatorText: "",
      valueText: "",
      parameterText: "",
      notesText:"",
    };
    // this.editMode = this.editMode.bind(this);
    this.textMode = this.textMode.bind(this);
    // this.handleOnChange = this.handleOnChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.handleOperatorChange = this.handleOperatorChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleParameterChange = this.handleParameterChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handleAddRow = this.handleAddRow.bind(this);
    this.handleDeleteRow = this.handleDeleteRow.bind(this);
    this.deleteMode =  this.deleteMode.bind(this);

  }
  
  deleteMode(record: any){
    console.log(this.props);
    this.props.deleteMode(record,this.dataSource);
  }
  onEditMode(index:any) {
    this.props.onEditMode(index);
    this.dataSource.map(res => {
      if (res.key == index) {
        this.setState({
          editingKey:index,
          isEditMode: true,
          cancelButton:true,
          deleteButton:false,
        });
      }
    });
  }

  saveModes(item:any) {
    let rs = {key: item.key, parameter: this.state.parameterText, operator:this.state.operatorText , value: this.state.valueText, notes: this.state.notesText}
    this.props.saveModes(rs);
    this.dataSource.map(record=> {
      if(record.key==item.key) {
        record.notes=this.state.notesText;
        record.operator=this.state.operatorText;
        record.parameter=this.state.parameterText;
        record.value=this.state.valueText;
      }
    });
    this.setState({
      isEditMode: false,
      cancelButton:false,
      deleteButton:true
    },()=>{
      this.clearFields();
    });
  }


  columns = [
    {
      title: "Parameter",
      dataIndex: "parameter",
      key: "parameter",
      render: (value:any,record:any) => {
        return (
          <div>
            {this.state.isEditMode && record.key ==this.state.editingKey ? (
              <select style={{ width: 80 }} onChange={this.handleParameterChange} defaultValue={value}>
                <option key="1" value="Param 1">
                  Param 1
                </option>
                <option  key="2" value="Param 2">
                  Param 2
                </option>
                <option  key="3" value="Param 3">
                  Param 3
                </option>
              </select>
            ) : (
              value
            )}
          </div>
        );
      }
    },
    {
      title: "Operator",
      dataIndex: "operator",
      key: "operator",
      render: (value:any,record:any) => {
        return (
          <div>
            {this.state.isEditMode && record.key==this.state.editingKey ? (
              <select onChange={this.handleOperatorChange} defaultValue={value}>
                <option value="==">==</option>
                <option value="++">++</option>
                <option value=">==">>==</option>
                <option value="!="> != </option>
                <option value=">"> > </option>
              </select>
            ) : (
              value
            )}
          </div>
        );
      }
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value:any,record:any) => {
        return (
          <div>
            {this.state.isEditMode && record.key==this.state.editingKey ? (
              <Input
                onChange={this.handleValueChange}
                defaultValue={value}
              />
            ) : (
              value
            )}
          </div>
        );
      }
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      render: (value:any,record:any) => {
        return (
          <div>
            {this.state.isEditMode && record.key==this.state.editingKey ? (
              <Input
                onChange={this.handleNotesChange}
                defaultValue={value}
              />
            ) : (
              value
            )}
          </div>
        );
      }
    },
    {
      title: "Operation",
      dataIndex: "operation",
      key: "operation",
      render: (value: any, record: any) => {
        console.log('record',record);
        
        return (
          // <div>
          //     {this.state.isEditMode && record.key==this.state.editingKey ?([
          //       !this.state.cancelButton ?  <Icon type="save" onClick={() => this.textMode(record)} style={{marginRight:10}}>Save </Icon>  :  <Icon type="close" style={{marginRight:10}} onClick={this.props.textMode}>Cancel</Icon>,
          //       this.state.deleteButton ?  <Icon type="delete" onClick={()=>this.handleDeleteRow(record.key)}> Delete </Icon>:  <Icon type="save" onClick={() => this.textMode(record)} style={{marginRight:10}}> Edit </Icon>
          //     ]):(
          //       [
          //         this.state.cancelButton ?  <Icon type="save" onClick={() => this.textMode(record)} style={{marginRight:10}}>Save </Icon>  :  <Icon type="edit" style={{marginRight:10}} onClick={() => this.onEdit(record.key)}>Edit</Icon>,
          //         this.state.deleteButton ?  <Icon type="delete" onClick={()=>this.handleDeleteRow(record.key)}> Delete </Icon>:  <Icon type="edit" onClick={() => this.onEdit(record.key)} style={{marginRight:10}}> Delete </Icon>
          //       ]
          //     )}
          // </div>
          <React.Fragment>
            
              {this.state.isEditMode && record.key==this.state.editingKey ?([
                !this.state.cancelButton ?  <Icon type="save" onClick={()=>this.saveModes(record)} style={{marginRight:10}}>Save </Icon>  :  <Icon type="close" style={{marginRight:10}} onClick={this.textMode}>Cancel</Icon>,
                this.state.deleteButton ?  <Icon type="delete" onClick={() => this.props.deleteMode(record,this.dataSource)}> Delete </Icon>:  <Icon type="save" onClick={() => this.textMode(record)} style={{marginRight:10}}> Edit </Icon>
              ]):(
                [
                  this.state.cancelButton ?  <Icon type="save" onClick={() => this.textMode(record)} style={{marginRight:10}}>Save </Icon>  :  <Icon type="edit" style={{marginRight:10}} onClick={() => this.onEditMode(record.key)}>Edit</Icon>,
                  this.state.deleteButton ?  <Icon type="delete" onClick={()=>this.handleDeleteRow(record.key)}> Delete </Icon>:  <Icon type="edit" onClick={() => this.onEdit(record.key)} style={{marginRight:10}}> Delete </Icon>
                ]
              )}
          </React.Fragment>
        );
      } 
    }
  ];
  dataSource = [
    {
      key: this.updateIndex,
      parameter: "",
      operator: "",
      value: "",
      notes:""
    }
  ];
  
  handleAddRow() {
    console.log('first',this.updateIndex);
    this.updateIndex++;
    this.dataSource.push({
      key: this.updateIndex,
      parameter: "",
      operator: "",
      value: "",
      notes:""
    });
    this.setState({
      editingKey:this.updateIndex,
      isEditMode: true,
      deleteButton:true,
    })
    console.log('last',this.updateIndex++);
  }

  handleParameterChange(e: any) {
    this.setState({
      parameterText: e.target.value
    });
  }

  handleDeleteRow(index:number) {
    console.log('deleting index',index);
    this.dataSource.splice(index-1,1);
    this.setState({
      isEditMode: false,
      editingKey:-1,
      cancelButton:false,
      deleteButton:true,
      operatorText: "",
      valueText: "",
      parameterText: "",
      notesText:"",
    });
  }

  handleOperatorChange(e: any) {
    this.setState({
      operatorText: e.target.value
    });
  }
  
  handleValueChange(e: any) {
    this.setState({
      valueText: e.target.value
    });
  }
  
  handleNotesChange(e:any) {
    this.setState({
      notesText:e.target.value
    })
  }
  
  onEdit(index:number) {
    this.dataSource.map(res => {
      if (res.key == index) {
        this.setState({
          editingKey:index,
          isEditMode: true,
          cancelButton:true,
          deleteButton:false,
        });
      }
    });
  }

  /*
    Handling the text mode 
   */

  textMode(item:any) {
    console.log('Text mode',item);
    
    this.dataSource.map(record=> {
      if(record.key==item.key) {
        record.notes=this.state.notesText;
        record.operator=this.state.operatorText;
        record.parameter=this.state.parameterText;
        record.value=this.state.valueText;
      }
    });
    this.setState({
      isEditMode: false,
      cancelButton:false,
      deleteButton:true
    },()=>{
      this.clearFields();
    });
  }

  /**
   * @description clear fields
   */
  clearFields=()=>{
    this.setState({
      notesText:"",
      operatorText:"",
      parameterText:"",
      valueText:"",
    })
  }

  render() {
    return (
      <React.Fragment>
        <Button onClick={ ()=>this.handleAddRow() }>Add Row</Button>
        < Table dataSource={this.dataSource} 
          columns={this.columns} 
          pagination={false}/>
      </React.Fragment>
    );
  }
}
