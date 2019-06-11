import React, { Component } from "react";
import { Select, Button, Input } from "antd";
import dataJson from "../data/data";
import CRUDTable from './CRUDTable';
import MappingRuleTableComponent from './MappingRuleTableComponent';
import "../index.css";

const { TextArea } = Input;
export default class ReconRules extends Component {
  state = {
    addRuleTable: [{ id: 1, name: "John" }],
    sources: dataJson.sourceData,
    records: dataJson.recordData,
    entity: dataJson.entityData
  };
  filterRecord: any = [];
  filterEntityData: any = [];

  handleAddRules = () => {
    const newState = { id: 2, name: "KASDIJ" };
    this.setState({
      addRuleTable: [...this.state.addRuleTable, newState]
    });
  };

  handleSourceChange = (e: any) => {
    // console.log('Source  ',e.target.value);
    this.filterRecord = [];
    this.state.records.filter(data => {
      if (e === data.sourceId) {
        this.filterRecord.push(data);
      }
    });
    this.setState({});
  };
  handleRecordChange = (e: any) => {
    console.log("ERTO", e);
    this.filterEntityData = [];
    this.state.entity.filter((data: any) => {
      if (e === data.recordId) {
        console.log("Entity data...", data);
        this.filterEntityData.push(data);
      }
    });
  };

  handleRemoveRule = () => {
    this.state.addRuleTable.pop();
    this.setState({});
  };

  render() {
    const { Option } = Select;
    return (
      <div>
        Source
        <Select
          id="1"
          onChange={this.handleSourceChange}
          className="rec-select-box"
        >
          {this.state.sources.map(res => {
            return (
              <Option value={res.sourceId} key={res.sourceId}>
                {res.sourceName}
              </Option>
            );
          })}
        </Select>
        rules
        <Select
          id="2"
          onChange={this.handleRecordChange}
          className="rec-select-box"
        >
          {this.filterRecord.map((res: any) => {
            return (
              <Option value={res.recordId} key={res.recordId}>
                {res.recordName}
              </Option>
            );
          })}
        </Select>
        <br />
        <br />
        <div>Notes:</div>
        <TextArea rows={4} className="rec-text-area" /> <br />
        <br />
        <Button type="ghost" onClick={this.handleAddRules}>
          Add Rule
        </Button>{" "}
        <Button onClick={this.handleRemoveRule}>Remove Rule</Button>
        <br />
        <br />
        {this.state.addRuleTable.map(res => {
          return (
            <div key={Math.random()}>
              {/* <TableRules /> */}
              {/* <EditableFormTable/> */}
              {/* <CRUDTable/> */}
              <MappingRuleTableComponent/>
              <br />
            </div>
          );
        })}
      </div>
    );
  }
}
