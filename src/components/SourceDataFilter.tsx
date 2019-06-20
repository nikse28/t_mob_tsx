import React, { Component } from "react";
import { Select ,Row, Col, Button } from "antd";
import MappingRuleTableComponent from "./MappingRuleTableComponent";
import SourceServices from '../service/SourceService'; 
import sourceData from "../data/DataSource";


const sourceService = new SourceServices();


/* Features/common/SourceSelector.tsx */
type SourceSelectorProps = {
    sources: Array<string>
    onChange?: (value: string) => void
}

class SourceSelector extends Component<SourceSelectorProps> {
    render() {
        const { sources, onChange } = this.props;
        return (<Select  onChange={onChange} style={{width:150}}>
            {sources.map(source => {
                return (
                    <Select.Option value={source} key={source}>
                        {source}
                    </Select.Option>
                );
            })}
        </Select>
        );
    }
}


/* Features/common/RecordTypeSelector.tsx */
type RecordTypeSelectorProps = {
    source: string
}

type RecordTypeSelectorState = {
    recordTypes: Array<string>,
    selectedRecordType: string
}

class RecordTypeSelector extends Component<RecordTypeSelectorProps, RecordTypeSelectorState> {
    constructor(props: RecordTypeSelectorProps) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            selectedRecordType: '',
            recordTypes: []
        }
    }

    componentDidMount() {
        this.updateRecordTypes();
        // console.log('life cycle',sourceData);
        
    }

    componentDidUpdate(prevProps: RecordTypeSelectorProps, prevState: RecordTypeSelectorState) {
        if (this.props.source !== prevProps.source) {
            this.updateRecordTypes();
        }
    }

    static getDerivedStateFromProps(props: RecordTypeSelectorProps, state: RecordTypeSelectorState) {
        const { source } = props;
        return { source };
    }

    handleChange(selectedRecordType: string) {
        console.log('selectedRecordType',selectedRecordType);
        this.setState({ selectedRecordType });
    }

    updateRecordTypes() {
        const { source } = this.props;
        const recordTypes = sourceService.getRecordTypes(source);
        this.setState({ recordTypes, selectedRecordType: '' });
    }

    render() {
        const { recordTypes, selectedRecordType } = this.state;

        return (<Select value={selectedRecordType} onChange={this.handleChange} style={{width:150}}>
            {recordTypes.map(recordType => {
                return (
                    <Select.Option value={recordType} key={recordType}>
                        {recordType}
                    </Select.Option>
                );
            })}
        </Select>);
    }
}

/* Components/common/EditableTable.tsx */




/* Features/common/SourceDataFilter.tsx */
type SourceDataFilterProps = {

    
}

type SourceDataFilterState = {
    source: string,   
    tableRecord:any;
}   

class SourceDataFilter extends Component<SourceDataFilterProps, SourceDataFilterState> {
    mapTables:Array<object> = [{"id":1,"parameter":"log"}];
    
    constructor(props: SourceDataFilterProps) {
        super(props);
        this.handleSourceChange = this.handleSourceChange.bind(this);
        this.handleDeleteRule = this.handleDeleteRule.bind(this);
        this.handleAddRule = this.handleAddRule.bind(this);

        this.state = {
            source: '',
            tableRecord:[]
        }
    }
    
    handleAddRule(e:any) {
       this.mapTables.push({"id":2,"parameter":"log"});
       this.setState({ 
           source:""     
        });
    }

    handleDeleteRule(index:number) {
        console.log('Index',index);
        this.mapTables.splice(index,1);
        this.setState({
            source:''
        })
    }

    setTextMode() {
        alert('works');
    }

    setSaveMode(records:any) {
        let record = records;
        this.state.tableRecord.push(record);
        console.log('this.state.tableRecord',this.state.tableRecord);
    }
    setEditMode(index:number) {
        console.log('getting Edit mode',index);
        console.log('Record?',this.state.tableRecord);
    }

    setDeleteMode(record: any,datasource:any) {
        datasource.map((data:any)=>{
            if(data.key==record.key) {
                datasource.splice(data,1);
            }    
        })
        this.setState({
            source:""
        });
    }

    handleSourceChange(source: string) {
        console.log('source value',source);
        this.setState({ source })
    }

    render() {
        const { source } = this.state;
        let sourceList = sourceService.getAllSourceData();
        return <div>
            <br />
            <Row>
                <Col span={4}>
                    Source : <SourceSelector sources={sourceList} onChange={this.handleSourceChange} />
                </Col>
                <Col span={6}>
                    Record type : <RecordTypeSelector source={source}/>
                </Col>
            </Row>
            <br /> 
            <br />

            <Button onClick={this.handleAddRule}>
                Add Rule
            </Button> 
            <br/> 
            Mapping Rule Table
            <br/>
            { this.mapTables.map((mapTable,index)=>{
                return(
                    <div key={index}>
                        <Button style={{float:"right",marginRight:10}} onClick={()=>this.handleDeleteRule(index)}>Delete Rule</Button>
                        <br/><br/>
                        <MappingRuleTableComponent 
                        source={source} 
                        textMode={this.setTextMode.bind(this)}
                        saveModes={this.setSaveMode.bind(this)}
                        deleteMode={this.setDeleteMode.bind(this)}
                        onEditMode={this.setEditMode.bind(this)}
                        /> 
                        <br/>    
                    </div>
                )
            })}
        </div>
    }

}

export default SourceDataFilter;