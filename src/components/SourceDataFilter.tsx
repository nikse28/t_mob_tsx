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
        return (<Select  onChange={onChange} style={{width:100}}>
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
        this.setState({ selectedRecordType });
    }

    updateRecordTypes() {
        const { source } = this.props;
        const recordTypes = sourceService.getRecordTypes(source);
        this.setState({ recordTypes, selectedRecordType: '' });
    }

    render() {
        const { recordTypes, selectedRecordType } = this.state;

        return (<Select value={selectedRecordType} onChange={this.handleChange} style={{width:100}}>
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
    source: string
}

class SourceDataFilter extends Component<SourceDataFilterProps, SourceDataFilterState> {
    mapTables:Array<object> = [{"id":1,"parameter":"log"}];
    constructor(props: SourceDataFilterProps) {
        super(props);

        this.handleSourceChange = this.handleSourceChange.bind(this);
        this.handleDeleteRule = this.handleDeleteRule.bind(this);
        this.handleAddRule = this.handleAddRule.bind(this);
        this.state = {
            source: ''
        }
    }
    
    handleAddRule(e:any) {
        console.log("logged");
       this.mapTables.push({"id":2,"parameter":"log"}); 
       this.setState({ 

         });
    }

    handleDeleteRule(index:number) {
        console.log('Index',index);
        this.mapTables.splice(index,1);
        this.setState({
        })
    }

    handleSourceChange(source: string) {
        this.setState({ source })
    }

    render() {
        const { source } = this.state;
        let sourceList = sourceService.getAllSourceData();
        
        return <div>
            <br />
            <Row>
                <Col span={2}>
                    Source : <SourceSelector sources={sourceList} onChange={this.handleSourceChange} />
                </Col>
                <Col span={2}>
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
                        <MappingRuleTableComponent /> 
                        <br/>    
                    </div>
                )
            })}
        </div>
    }

}

export default SourceDataFilter;