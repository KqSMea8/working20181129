
module.exports = {
    regionDetail:{
        regions:[
            {
                "name":"mytest",
                "create_time":"2018-05-17 15:03:50",
                "total_mem_size":10240,
                "used_mem_size":0,
                "used_mem_size_byte":0
            }
        ]        
    },
    regionList:{
        regions: [{
            id: 1,
            name: "深圳",
            create_time: "2017-04-03 10:34:27",
            is_cluster: false,
            masters: [
                { ip: "10.85.44.142", "role": 2 },
                { ip: "10.85.44.143", "role": 2 },
                { ip: "10.85.44.141", "role": 1 }
            ],
            sets: [{
                name: "mytest_set",
                create_time: "2018-05-17 15:52:50",
                comment: "test",
                is_cluster: false
            }]
        },
        {
            id: 2,
            name: "广州",
            create_time: "2017-04-03 10:34:27",
            is_cluster: false,
            masters: [
                { ip: "10.85.44.142", "role": 2 },
                { ip: "10.85.44.143", "role": 2 },
                { ip: "10.85.44.141", "role": 1 }
            ],
            sets: [{
                name: "mytest_set",
                create_time: "2018-05-17 15:52:50",
                comment: "test",
                is_cluster: false
            }]
        },
        {
            id: 2,
            name: "上海",
            create_time: "2017-04-03 10:34:27",
            is_cluster: false,
            masters: [
                { ip: "10.85.44.142", "role": 2 },
                { ip: "10.85.44.143", "role": 2 },
                { ip: "10.85.44.141", "role": 1 }
            ],
            sets: [{
                name: "mytest_set",
                create_time: "2018-05-17 15:52:50",
                comment: "test",
                is_cluster: false
            }]
        }
    ],
    count: 1        
    }
}