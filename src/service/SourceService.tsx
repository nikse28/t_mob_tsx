/* Services/SourceService */
import sourceData from "../data/DataSource";
class SourceService {
    
    getAllSourceData() {
        const sourceLists:Array<string> = [];
        {sourceData.map(sourceList=>{
            sourceLists.push(sourceList.name);
        })}
        return sourceLists;
    }

    getRecordTypes(source: string): Array<string> {
        console.log('Service...',source);
        console.log('Data?',sourceData);
        
        if (source === 'Source1') {    
           const recordList:Array<string> = [];
            {
                sourceData.map(res=>{
                console.log('Records',res.records);
                if(res.records.length>0) {
                    res.records.map(record=>{
                        if(res.name=='Source1') {
                            recordList.push(record.recordName);
                        }
                    })
                }
            })
        }
        return recordList;

        } else {
            const recordList:Array<string> = [];
            {
                sourceData.map(res=>{
                console.log('Records',res.records);
                if(res.records.length>0) {
                    res.records.map(record=>{
                        if(res.name=='Source2') {
                            recordList.push(record.recordName);
                        }
                    })
                }
            })
        }
        return recordList;
        }
    }
}

export default SourceService;