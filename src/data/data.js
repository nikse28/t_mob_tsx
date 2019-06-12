const dataJson = {
  sourceData : [
    {
      sourceId: 1,
      sourceName: "Source 1"
    },
    {
      sourceId: 2,
      sourceName: "Source 2"
    }
  ],
  recordData : [
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
  ],
  entityData : [
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
  ]
};


export default dataJson;

