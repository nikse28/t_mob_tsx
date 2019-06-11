import React, { Component } from "react";
import { Select } from "antd";
import CRUDTable from './CRUDTable';

/* Services/SourceService */
class SourceService {
    getRecordTypes(source: string): Array<string> {
        if (source === 'Source1') {
            return [
                "Record1", "Record2", "Record3"
            ]
        } else {
            return [
                "Record4", "Record5"
            ]
        }
    }
}

const sourceService = new SourceService();
// export default sourceService;

/* Features/common/SourceSelector.tsx */
type SourceSelectorProps = {
    sources: Array<string>
    onChange?: (value: string) => void
}

class SourceSelector extends Component<SourceSelectorProps> {
    render() {
        const { sources, onChange } = this.props;

        return (<Select onChange={onChange}>
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

        return (<Select value={selectedRecordType} onChange={this.handleChange}>
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
    constructor(props: SourceDataFilterProps) {
        super(props);

        this.handleSourceChange = this.handleSourceChange.bind(this);

        this.state = {
            source: ''
        }
    }

    handleSourceChange(source: string) {
        this.setState({ source })
    }

    render() {
        const { source } = this.state;

        return <div>
            Source data filter
            <br />
            Source : <SourceSelector sources={["Source1", "Source2"]} onChange={this.handleSourceChange} />
            <br />
            Record type : <RecordTypeSelector source={source} />
            <br />
            Rule 1: 
            <br />
            <CRUDTable />
        </div>
    }

}

export default SourceDataFilter;