module.exports = {
    bidDetail: {
        bids: [{
            "bid": "3",
            "state": 1,
            "region_name": "深圳",
            "set_name": "深圳一区",
            "comment": "备注",
            "is_raft": 0,
            "password": "mytest",
            "strategy": 255,
            "total_mem_size": 10240,
            "used_mem_size": 0,
            "used_mem_size_byte": 0,
            "total_mem_ratio": 20,
            "create_time": "2018-01-22T09:12:43.083Z",
            "state": 1,
            "statue_name": "正常",
            "replicas": [{
                "replica_id": 3,
                "shards": [{
                    "local_index": 1,
                    "role": 1,
                    "cache_ip": "10.85.44.141",
                    "state": 1,
                    "statue_name": "正常",
                    "total_mem_size": 10240,
                    "used_mem_size": 0,
                    "used_mem_size_byte": 0,
                    "oplog_gid": 0
                }]
            }]
        }]
    },
    bidList: {
        bids: [{
            "bid": "3",
            "state": 1,
            'creator':'喔喔',
            "create_time": "2018-01-22T09:12:43.083Z",
            "region_name": "深圳",
            "set_name": "深圳一区",
            "comment": "备注",
            "is_raft": 0,
            "is_cluster":0,
            "created_at":'2018-01-22T09:12:43.083Z',
            "password": "mytest",
            "strategy": 255,
            "total_mem_size": 10240,
            "used_mem_size": 0,
            "used_mem_size_byte": 0,
            "total_mem_ratio": 20,
            "state": 0,
            "statue_name": "运行中",
            "replicas": [{
                "replica_id": 3,
                "shards": [{
                    "local_index": 1,
                    "role": 1,
                    "cache_ip": "10.85.44.141",
                    "state": 1,
                    "total_mem_size": 10240,
                    "used_mem_size": 0,
                    "used_mem_size_byte": 0,
                    "oplog_gid": 0
                }]
            }],
        },
        {
            "bid": "3",
            'creator':'妮妮',
            "create_time": "2018-01-22T09:12:43.083Z",
            "state": 1,
            "region_name": "深圳",
            "set_name": "深圳一区",
            "comment": "备注",
            "is_raft": 0,
            "is_cluster":1,
            "password": "mytest",
            "strategy": 255,
            "total_mem_size": 10240,
            "used_mem_size": 0,
            "used_mem_size_byte": 0,
            "total_mem_ratio": 20,
            "state": 0,
            "statue_name": "运行中",
            "replicas": [{
                "replica_id": 3,
                "shards": [{
                    "local_index": 1,
                    "role": 1,
                    "cache_ip": "10.85.44.141",
                    "state": 0,
                    "state_name": "运行中",
                    "total_mem_size": 10240,
                    "used_mem_size": 0,
                    "used_mem_size_byte": 0,
                    "oplog_gid": 0
                }]
            },
            {
                "replica_id": 3,
                "shards": [{
                    "local_index": 1,
                    "role": 1,
                    "cache_ip": "10.85.44.141",
                    "state": 1,
                    "state_name": "运行中",
                    "total_mem_size": 10240,
                    "used_mem_size": 0,
                    "used_mem_size_byte": 0,
                    "oplog_gid": 0
                }]
            }],
        }],
        "count": 1
    },
    backup: {
        count: 1,
        backup: [{
            "id": 3,
            "name": "test",
            "region": "深圳",
            "bid": "3",
            "region": "test_region",
            "set": "test_set",
            "path": "/PREFIX/SET_BID_REPLICA_TIMESTAMP.rdb ",
            "status": true,
            "create_time": "2018-01-22T09:12:43.083Z"
        }, {
            "id": 4,
            "name": "test",
            "region": "深圳",
            "bid": "3",
            "region": "test_region",
            "set": "test_set",
            "path": "/PREFIX/SET_BID_REPLICA_TIMESTAMP.rdb ",
            "status": false,
            "reason": "这里是失败原因展示",
            "create_time": "2018-01-22T09:12:43.083Z"
        }]
    },
    monitor: {
        monitor_config: [{
            "index": 1,
            "category": null,
            "feature_id": 123,
            "feature_name": " 容量使用量（MB）"
        }]
    },

}