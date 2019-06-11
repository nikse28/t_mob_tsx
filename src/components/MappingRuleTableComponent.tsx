import React, { Component } from "react";
import { Table, Icon, Select,Tooltip  } from "antd";

type MappingRuleTableState = {
  isEditMode: boolean;
  parameterText: string;
  operatorText: string;
  valueText: string;
  notesText:string;
  cancelButton:boolean;
  deleteButton:boolean;
}

type MappingRuleTableProps = {}

type MappingTableType = {
  key: string;
  parameter: string;
  operator: string;
  value: string;
  notes:string;
}

export default class MappingRuleTableComponent extends Component<MappingRuleTableProps, MappingRuleTableState> {
  
  dataSource = [
    {
      key: "1",
      parameter: " ",
      operator: "==",
      value: "",
      notes:""
    }
  ];
  columns = [
    {
      title: "Parameter",
      dataIndex: "parameter",
      key: "parameter",
      render: () => {
        return (
          <div>
            {this.state.isEditMode ? (
              <select style={{ width: 80 }} onChange={this.handleParameterChange} defaultValue={this.state.operatorText}>
                <option key="1" value="Param 1">
                  Param 1
                </option>
                <option  key="2" value="Param 2">
                  Param 2
                </option>
              </select>
            ) : (
              this.state.parameterText
            )}
          </div>
        );
      }
    },
    {
      title: "Operator",
      dataIndex: "operator",
      key: "operator",
      render: () => {
        return (
          <div>
            {this.state.isEditMode ? (
              <select onChange={this.handleOperatorChange} defaultValue={this.state.operatorText}>
                <option value="==">==</option>
                <option value="++">++</option>
                <option value=">==">>==</option>
              </select>
            ) : (
              this.state.operatorText
            )}
          </div>
        );
      }
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: () => {
        return (
          <div>
            {this.state.isEditMode ? (
              <input
                onChange={this.handleValueChange}
                defaultValue={this.state.valueText}
              />
            ) : (
              this.state.valueText
            )}
          </div>
        );
      }
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      render: () => {
        return (
          <div>
            {this.state.isEditMode ? (
              <input
                onChange={this.handleNotesChange}
                defaultValue={this.state.notesText}
              />
            ) : (
              this.state.notesText
            )}
          </div>
        );
      }
    },
    {
      title: "Operation",
      dataIndex: "operation",
      key: "operation",
      render: (records: any, index: any) => {
        return (
          <div>
           { !this.state.cancelButton ? <Tooltip title="edit"> <Icon  type="edit" onClick={() => this.onEdit(index)} style={{marginRight:10}}> Edit </Icon> </Tooltip> : <Tooltip title="close"> <Icon type="close" style={{marginRight:10}} onClick={this.textMode }>Cancel</Icon></Tooltip> } 
           { this.state.deleteButton ? <Tooltip title="delete"> <Icon type="delete" > Delete </Icon> </Tooltip>: <Tooltip title="save"> <Icon type="save" onClick={() => this.textMode()}>Save</Icon> </Tooltip>}
          </div>
        );
      } 
    }
  ];

  constructor(props: any) {
    super(props);
    this.editMode = this.editMode.bind(this);
    this.textMode = this.textMode.bind(this);
    // this.handleOnChange = this.handleOnChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.handleOperatorChange = this.handleOperatorChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleParameterChange = this.handleParameterChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
  }
  
  handleParameterChange(e: any) {
    this.setState({
      parameterText: e.target.value
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
  
  onEdit(index: MappingTableType) {
    this.dataSource.map(res => {
      if (res.key == index.key) {
        // this.selectedRowObject = index;
        // this.trueRow = true;
        this.setState({
          isEditMode: true,
          cancelButton:true,
          deleteButton:false,
        });
      }
    });
  }
  
  onDelete() {
    console.log("deltee");
    // this.dataSource.pop();
    // this.setState({

    // })
  }
  state = {
    isEditMode: false,
    cancelButton:false,
    deleteButton:true,
    operatorText: "==",
    valueText: " Recon  ",
    parameterText: "Param 1",
    notesText:"dummy notes",
  };

  editMode() {
    this.setState({
      isEditMode: true
    });
  }
  textMode() {
    this.setState({
      isEditMode: false,
      cancelButton:false,
      deleteButton:true
    });
  }

  // handleOnChange(e: any) {
  //   this.setState({
  //     text: e.target.value
  //   });
  // }

  render() {
    return (
      <React.Fragment>
        <Table dataSource={this.dataSource} columns={this.columns} />
      </React.Fragment>
    );
  }
}
