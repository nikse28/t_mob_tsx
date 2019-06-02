import React, { Component } from 'react'
import { Select ,Button } from "antd";
import TableRules from './TableRules';
// import { sourceData } from "../data/data";

export default class ReconRules extends Component {
    
    state= {
        addRuleTable:[
            {"id":1,"name":"asd"}
        ]
    }
    
    public sourceData = [
         {
           "sourceId": 1,
           "sourceName": "Source 1"
         },
         {
           "sourceId": 2,
           "sourceName": "Source 2"
         }
         
       ];
        public recordData = [
        {
          sourceId: 1,
          recordId: 1,
          recordName: "Record 1"
        },
        {
          sourceId: 1,
          recordId: 2,
          recordName: "Record 2"
        },
        {
          sourceId: 2,
          recordId: 3,
          recordName: "Record 3"
        },
        {
          sourceId: 3,
          recordId: 4,
          recordName: "Record 4"
        }
      ];
      entityData = [
        {
          recordId:1,
          entityId:1,
          entityData:"Entity 1"
        },
        {
          recordId:1,
          entityId:2,
          entityData:"Entity 2"
        },
        {
          recordId:2,
          entityId:3,
          entityData:"Entity 3"
        }
    ];
      filterRecord :any= [];
      filterEntityData :any = [];  
      
    handleSourceChange=(e:any)=> {
        // console.log('Source  ',e.target.value);
        this.filterRecord = [];
        this.recordData.filter(data => {
        if (e === data.sourceId) {
            this.filterRecord.push(data);
        }
        });
        this.setState({});
        
    }
    handleRecordChange=(e:any)=> {
        console.log('ERTO',e);
        this.filterEntityData = [];
        this.entityData.filter((data:any) => {
          if (e === data.recordId) {
            console.log('Entity data...',data);
            this.filterEntityData.push(data);
          }
        });
    }
    
    handleAddRules=()=>{
        const newState = {"id":2,"name":"KASDIJ"};
        this.setState({
            addRuleTable:[
                ...this.state.addRuleTable,
                newState
            ] 
        });
    }
    handleRemoveRule=()=>{
        this.state.addRuleTable.pop();
        this.setState({});
    }

    render() {
        const { Option } = Select;
        return (
            <div>
                Source
                <Select  id="" onChange={this.handleSourceChange} style={{width:120}}>
                { this.sourceData.map (res=>{
                    return(                      
                        <Option value={res.sourceId} key={res.sourceId}>{res.sourceName}</Option>
                    )
                })}
                </Select>
                rules
                <Select id="" onChange={this.handleRecordChange} style={{width:120}}>
                    {
                        this.filterRecord.map((res:any)=>{
                            return(
                                <Option value={res.recordId} key={res.recordId}>{res.recordName}</Option>
                            )
                        })
                    }
                </Select>
                <br/><br/>
                <Button type="ghost" onClick={this.handleAddRules}>Add Rule</Button>  <Button onClick={this.handleRemoveRule}>Remove Rule</Button><br/><br/>

                {
                    this.state.addRuleTable.map(res=>{
                        return(
                            <div key={Math.random()}>
                                <TableRules />
                            </div>
                        )

                    })
                }
            </div>
        )
    }
}
