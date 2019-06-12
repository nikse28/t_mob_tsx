const dataJsons = [
    {
      id: 1,
      name: "Source1",
      records: [
        {
          recordId: 1,
          recordName: "source1_record1",
          params: [
            {
              entityId: 1,
              entityData: "source1_record1_param1"
            },
  
            {
              entityId: 2,
              entityData: "source1_record1_param2"
            }
          ]
        },
        {
          recordId: 2,
          recordName: "source1_record2",
          params: [
            {
              entityId: 1,
              entityData: "source1_record2_param1"
            },
            {
              entityId: 2,
              entityData: "source1_record2_param2"
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Source2",
      records: [
        {
          recordId: 3,
          recordName: "source2_record2",
          params: [
            {
              entityId: 4,
              entityData: "source2_record2_param4"
            },
  
            {
              entityId: 5,
              entityData: "source2_record2_param5"
            }
          ]
        },
        {
          recordId: 4,
          recordName: "source1_record4",
          params: [
            {
              entityId: 6,
              entityData: "source2_record2_param6"
            },
            {
              entityId: 7,
              entityData: "source2_record2_param7"
            }
          ]
        }
      ]
    }
  ];
  export default dataJsons;
  