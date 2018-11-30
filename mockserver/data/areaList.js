
module.exports = {
    setList:{
        "sets": [
            { "id": 1, "name": "深圳一区", "create_time": "2018-05-17 15:52:50", "comment": "test", "is_cluster": false, "region_name": "region" },
            { "id": 2, "name": "广州一区", "create_time": "2018-05-17 15:52:50", "comment": "test", "is_cluster": false, "region_name": "region" }
        ],
        "count": 1        
    },
    setDetal:{
        sets:[
            {
            "name":"mytest_set",
            "comment":"test",
            "create_time":"2018-05-17 05:52:50",
            "is_cluster":false,
            "capacity":300000,
            "allocated":20480,
            "used":0,
            "bids":[
                    {
                    "bid":"3",
                    "name":"mytest",
                    "strategy":255,
                    "total_mem_size":10240,
                    "used_mem_size":0,
                    "used_mem_size_byte":0
                }
            ],
            "caches":["10.85.44.141","10.85.44.142","10.85.44.143"],
            "forbid_cache_dead":0,
            "start_forbid_cache_dead_interval":90,
            "start_forbid_cache_dead_count":4
        }],
        "count": 1
    }
};