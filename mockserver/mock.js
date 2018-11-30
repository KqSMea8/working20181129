const faker = require('faker')
const express = require('express')
const data = require("./data")
const util = require("./util")
const config = require('./config')
const dataFormat = (data = {}) => {
    return {
        "code": 200,
        "message ": "",
        "status": "sucess",
        "data": data
    }
}

module.exports = function (app) {
    let api = express();
    app.use("/api", api)

    api.get("/online", function (req, res) {
        // util.proxy(req, res)

        //res.send("service online");
    })

    app.post('/WebHttp/*',(req,res)=>{
        res.send(config.staffRole)
    })
    api.post('/v1.0/Auth/Verification',(req,res)=>{
        res.cookie('RIO_TCOA_TICKET', config.logon.RIO_TCOA_TICKET, { expires: new Date(Date.now() + 24*60*60*1000), httpOnly: true });        
        res.cookie('SSO_TICKET', config.logon.Ticket, { expires: new Date(Date.now() + 24*60*60*1000), httpOnly: true });
        res.cookie('SSO_TOKEN', config.logon.Token, { expires: new Date(Date.now() + 24*60*60*1000), httpOnly: true });
        res.cookie('TCOA', config.logon.TCOA, { expires: new Date(Date.now() + 24*60*60*1000), httpOnly: true });
        res.cookie('TCOA_TICKET', config.logon.TCOA_TICKET, { expires: new Date(Date.now() + 24*60*60*1000), httpOnly: true });
        res.cookie('x_host_key', config.logon.x_host_key, { expires: new Date(Date.now() + 24*60*60*1000), httpOnly: true });
        res.send(config.logon)
    })
    // 所属集群列表 arguments==> {state,role,page_index,page_size'}
    api.get('/v1/ckv/region/*', (req, res) => {
        // util.proxy(req, res)
        res.send(dataFormat(data.region.regionList));
    })

    //集群详情
    api.get('/v1/ckv/bid/:region_name', function (req, res) {
        res.send(dataFormat(data.region.regionDetail))
    })
    //创建集群 arguments==> {"region_name": "test","master_ips":"10.85.44.141,10.85.44.142,10.85.44.143"} 
    api.post('/v1/ckv/region', function (req, res) {
        res.send(dataFormat())
    })
    //删除集群
    api.delete('/v1/ckv/region/:region_name', function (req, res) {
        res.send(dataFormat())
    })
    //上架管理节点 arguments==> {ip: 10.0.0.1}
    api.post('/v1/ckv/master/:region_name', function (req, res) {
        res.send(dataFormat())
    })

    //下架管理节点
    api.delete('/v1/ckv/master/:region_name/:ip', function (req, res) {
        res.send(dataFormat())
    })

    //获取管理节点 arguments ==> {state,role,page_index,page_size'}
    api.get('/v1/ckv/master/:region_name', function (req, res) {
        res.send(dataFormat(data.master.masterList))
    })

    //上架备份节点 arguments==> {ip: 10.0.0.1}
    api.post('/v1/ckv/dump_server/:region_name', function (req, res) {
        res.send(dataFormat())
    })

    //下架备份节点
    api.delete('/v1/ckv/dump_server/:region_name/:ip', function (req, res) {
        res.send(dataFormat())
    })

    //获取备份节点 arguments ==>{page_index,page_size}
    api.get('/v1/ckv/dump_server/:region_name', function (req, res) {
        res.send(dataFormat({
            ips: ['10.85.44.141'],
            count: 1
        }))
    })

    //创建set arguments==> {‘set_name’: ’test’, ‘comment’:’test’}
    api.post('/v1/ckv/set/:region_name', function (req, res) {
        res.send(dataFormat())
    })

    //删除set
    api.delete('/v1/ckv/set/:region_name/:set_name', function (req, res) {
        res.send(dataFormat())
    })

    //获取set可用区列表 arguments ==>{page_index,page_size}
    api.get('/v1/ckv/set/*', function (req, res) {
        res.send(dataFormat(data.areaList.setList))
    })

    //获取set详情
    api.get('/v1/ckv/set/:region_name/:set_name', function (req, res) {
        res.send(dataFormat(data.areaList.setDetal))
    })

    //上架cache  arguments==>  {ip:10.0.0.1,’memory_limit：100} 
    api.post('/v1/ckv/cache/:region_name/:set_name', function (req, res) {
        res.send(dataFormat())
    })

    //下架cache
    api.delete('/v1/ckv/cache/:region_name/:set_name/:ip', function (req, res) {
        res.send(dataFormat({ job_id: faker.random.number() }))
    })

    //获取cache列表 argiments==>{region_name,set_name,state,page_index,page_size}
    api.get('/v1/ckv/cache', function (req, res) {
        res.send(dataFormat(data.cache.cacheList))
    })

    //获取cache详情
    api.get('/v1/ckv/cache/:region_name/:set_name/:ip', function (req, res) {
        res.send(dataFormat(data.cache.cacheDetail))
    })

    //清理cache 
    api.post('/v1/ckv/cache/:region_name/:set_name/:ip/clear', function (req, res) {
        res.send(dataFormat({ job_id: faker.random.number() }))
    })

    //预估是否可以创建实例  arguments==> {'size':1024, "duplica": 2 }" 
    api.patch('/v1/ckv/bid/:region_name/:set_name/:ip/estimate', function (req, res) {
        res.send(dataFormat({ yes: 1, max: 1024 }))
    })

    //创建实例 arguments==>  "{'size':1024, "duplica": 2, password:'abc', comment:"test", is_raft:true} 
    api.post('/v1/ckv/bid/:region_name/:set_name', function (req, res) {
        res.send(dataFormat())
    })

    //删除实例
    api.delete('/v1/ckv/bid/:region_name/:set_name/:bid/:password', function (req, res) {
        res.send(dataFormat())
    })

    //获取实例详情
    api.get('/v1/ckv/bid/:region_name/:set_name/:bid/:password', function (req, res) {
        res.send(dataFormat(data.bid.bidDetail))
    })

    //获取实例列表 arguments==> {bid ,ip,page_index ,page_size,order_by,order_type}
    // api.get('/v1/ckv/bid/:region_name/:set_name', function (req, res) {
    //     res.send(dataFormat(data.bid.bidList))
    // })
    api.get('/v1/ckv/bid', function (req, res) {
        res.send(dataFormat(data.bid.bidList))
    })

    //清理实例 arguments==>  {password:''} 
    api.post('/v1/ckv/bid/:region_name/:set_name/:bid/clear', function (req, res) {
        res.send(dataFormat({ job_id: faker.random.number() }))
    })

    //扩容和缩容 arguments==>  {password:'',target_size：''} 
    api.post('/v1/ckv/bid/:region_name/:set_name/:bid/scale', function (req, res) {
        res.send(dataFormat({ job_id: faker.random.number() }))
    })

    //修改密码 arguments==>  {password:''，new_password:''} 
    api.put('/v1/ckv/bid/:region_name/:set_name/:bid', function (req, res) {
        res.send(dataFormat())
    })

    //数据迁移 arguments==>  {password:'',ip''} 
    api.post('/v1/ckv/bid/:region_name/:set_name/:bid/migrate', function (req, res) {
        res.send(dataFormat({ job_id: faker.random.number() }))
    })

    //获取备份列表 arguments==>  {start:'',end''，page_index：'',page_size:''} 
    api.get('/v1/ckv/backup', function (req, res) {
        res.send(dataFormat(data.bid.backup))
    })

    //数据备份 arguments==>  {format':1, password:'sdasd'}
    api.post('/v1/ckv/bid/:region_name/:set_name/:bid/save', function (req, res) {
        res.send(dataFormat({
            job_id: faker.random.number(),
            path: '/data/mytest_set_2_2_1526873206.db',
            error: ''
        }))
    })

    //数据恢复 arguments==>  "{'format':1, password:'sdasd','path':'/asd/asd/asd'}" 
    api.post('/v1/ckv/bid/:region_name/:set_name/:bid/restore', function (req, res) {
        res.send(dataFormat({
            job_id: faker.random.number(),
            error: ''
        }))
    })

    //主备切换 arguments==> "{'backup_ip':'10.0.0.1', password:'sdasd' }"  
    api.post('/v1/ckv/bid/:region_name/:set_name/:bid/switch', function (req, res) {
        res.send(dataFormat({ job_id: faker.random.number() }))
    })

    //重建一致性 arguments==> "{password:'sdasd' }"  
    api.post('/v1/ckv/bid/:region_name/:set_name/:bid/recover_raft', function (req, res) {
        res.send(dataFormat({ job_id: faker.random.number() }))
    })

    //查询实例监控列表
    api.post('/v1/ckv/bid/:region_name/:set_name/:bid/monitor_config', function (req, res) {
        res.send(dataFormat(data.bid.monitor))
    })

    //查询监控数据
    api.get('/v1/ckv/monitor/:region_name/:set_name/:bid/feature_id', function (req, res) {
        res.send(dataFormat({
            count: 1,
            feature_data: [{ dt: 1527774000, val: 0 }],
        }))
    })

    //获取job列表 arguments==> "{password:'sdasd'，region_name：'',set_name:'',bid:'',state:'',ip:'',creator:'',job_id:'',page_index:'',page_size:''}"  
    api.get('/v1/ckv/job/*', function (req, res) {
        res.send(dataFormat(data.job))
    })
}