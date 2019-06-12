/* Services/SourceService */
import sourceData from "../data/DataSource";
class SourceService {
    getRecordTypes(source: string): Array<string> {
        console.log('Service...',source);
        console.log('Data?',sourceData);
        
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

export default SourceService;