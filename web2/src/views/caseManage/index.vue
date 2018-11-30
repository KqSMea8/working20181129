
<style lang="stylus" scoped>

@import './index.styl';
@import '../../common/styl/detail.styl';
</style>

<template>
    <div class="my-case"> 
        <div>
            <div class="case-header">
                <h3>Redis实例管理</h3>
            </div>
            <div class="case-handle">
                <button class="power-button power-add" @click="createCase">新建</button>
                <div class="power-search">
                    <input type="text" class="input-search" v-model="query.name" placeholder="搜索实例ID/实例名称/访问地址">
                    <span class="icon-search" @click="getDataList(true)"></span>
                </div>
            </div>
            <div class="case-list">
                <table border="1" cellpadding="10">
                    <tr class="t-header">
                        <th class="col9">实例名称</th>
                        <th>实例ID</th>
                        <th>所属区域
                          <query
                            :types="1"
                            :list="regionList"
                            @current="getQueryVal">
                          </query>
                        </th>
                        <th>可用区
                          <query
                            :types="2"
                            :list="areaList"
                            @current="getQueryVal">
                          </query>
                        </th>
                        <th>实例版本</th>
                        <th>Redis版本</th>
                        <th>规格</th>
                        <th class="col5">访问地址</th>
                        <th>分片数</th>
                        <th style="width: 160px">实例容量</th>
                        <th class="col10">资源状态
                          <query
                            :types="3"
                            :list="resourceList"
                            @current="getQueryVal">
                          </query>
                        </th>
                        <th class="col11">操作</th>
                    </tr>
                    <tbody>
                    <template v-for="(row,index) in rows" v-if="rows!=undefined&&rows.length>0">
                        <tr :key="index">
                            <td :class="{'blue': row.state == 0 || row.state == -1}" class="col1 col9" @click="showDetail(row)">{{row.comment}}</td>
                            <td :title="row.comment">{{row.bid}}</td>
                            <td>{{row.region_name}}</td>
                            <td>{{row.set_name}}</td>
                            <td>{{row.is_cluster == 1 ? '集群版':'主从版'}}</td>
                            <td>{{'2.8(写死的)'}}</td>
                            <td>{{'不确定'}}</td>
                            <td class="col5">
                              <p v-for="(item ,index1) in row.replicas[0].shards" :key="index1">
                                  <span>{{item.cache_ip}}({{item.role == 1 ? '主':'备'}})</span>
                                  <i class="copy">
                                    <i class="show" @click="setCopy(item)"></i>
                                  </i>
                              </p>
                            </td>
                            <td>{{row.is_cluster == 1&&row.replicas&&row.replicas.length?row.replicas.length:'-'}}</td>
                            <td>
                              <span>总容量&nbsp;&nbsp;{{unit(row.total_mem_size)}}</span>
                              <div style="white-space: nowrap">已使用&nbsp;&nbsp;{{unit(row.used_mem_size)}} ({{row.total_mem_ratio}}%)</div>
                            </td>
                            <td class="col10"><span :class="'status s'+row.state">{{row.statue_name}}</span></td>
                            <td class="col11">
                                <span>
                                  <a href="javascript:;" class="blue" @click="setConnect(row)">连接方式</a>
                                  <!-- 无权限 -->
                                  <div class="power-rowselect"  v-if="row.state != 0 && row.state != -1"> 
                                    <a href="javascript:void(0);" class="power-rowselect-link disa">更多</a>
                                    <i class="power-rowselect-icon" :class="row.state == 0 || row.state == -1 ? 'active':''"></i> 
                                  </div>
                                  
                                  <!-- 有权限 -->
                                  <div class="power-rowselect" @click.stop="setMore(index,row)" v-if="row.state == 0 || row.state == -1">
                                    <a href="javascript:void(0);" class="power-rowselect-link allow"
                                      :class="isMore&&currentRow == index ? 'power-rowselect-link-active ':''">更多</a> 
                                    <i class="power-rowselect-icon" :class="row.state == 0 || row.state == -1 ? ' active':''"></i>
                                    <!-- 更多 -->
                                    <ul class="power-rowselect-list" v-if="isMore && currentRow == index">
                                      <!-- 管理员显示所有 -->
                                      <li title="扩缩容" v-if="login != 'user'"><a href="javascript:;" @click="setScale(row,index)">扩缩容实例</a></li>
                                      <li title="实例搬迁" v-if="login != 'user'&&row.is_cluster!=1"><a  href="javascript:;" @click
                                      ="setMigrate(row,index)">实例搬迁</a></li>
                                      <li title="主备切换" v-if="login != 'user'&&row.is_cluster!=1"><a  href="javascript:;" @click="setSwitch(row,index)">主备切换</a></li>  
                                      <!-- 普通用户 -->
                                      <li title="备份与恢复"><a href="javascript:;" @click="setBack(row)">备份与恢复</a></li>
                                      <li title="修改密码"><a href="javascript:;" @click="setModify(row,index)">修改密码</a></li>
                                      <li title="清空实例"><a href="javascript:;" @click="setClear(row,index)">清空实例</a></li>
                                      <li title="销毁实例"><a href="javascript:;" @click="setDelete(row,index)">销毁实例</a></li>
                                    </ul>
                                  </div>

                                </span>
                            </td>
                        </tr>
                    </template> 
                    <tr v-if="rows==null && isLoading">
                      <td colspan="11">暂无数据</td>
                    </tr>
                    </tbody>
                </table>

                <!-- 分页 -->
                <div>
                  <Pagination
                  ref="setCurent"
                  :page-current='page.pageIndex'
                  :page-size='page.pageSize'
                  :total-count="page.totalCount"
                  @current-change="getCurrent"
                  @size-change="getSizeChange"
                  ></Pagination>
                </div>
            </div>
        </div>
          
        <!--*********************************弹出框********************************* -->
        <!-- 新建redis实例 -->
        <model :show="create.show" :dialog="dialog" :width="772" :confim="create.confirmOk" @confirm-btn="confirmCreate"  @cancel-btn="cancelCreate">
            <div slot="body" class="dialog_body">
                <div class="tabcon">
                  <div class="label_content">
                    <div class="table_tr">
                      <p class="td_name"><span class="red">*</span>实例名称：</p>
                      <div class="td_val">
                        <input type="text" class="text_input" @keyup="createBlur" v-model="create.comment" placeholder="请输入实例名称">
                      </div>
                    </div>                     
                    <div class="table_tr">
                      <p class="td_name"><span class="red">*</span>所属区域：</p>
                      <div class="td_sel">
                        <selectDrop :items="regionList" :defaultName="create.region_name" @chooseName="getCreateRegion"></selectDrop>
                      </div>
                    </div>
                    <div class="table_tr">
                      <p class="td_name"><span class="red">*</span>可用区：</p>
                      <div class="td_sel">
                        <selectDrop :items="areaList" :defaultName="create.set_name" @chooseName="getCreateSet"></selectDrop>
                      </div>
                    </div>
                    <div class="table_tr">
                      <p class="td_name">实例版本：</p>
                      <!-- <div class="td_val">{{create.is_cluster == 0 ? '主从版':'区域版'}}</div> -->
                      <div class="td_val duplica">
                        <span :class="create.banben == 2 ? 'active':''" @click = "setVersion(2)">主从版</span>
                        <span :class="create.banben == 3 ? 'active':''" @click = "setVersion(3)">集群版</span>
                      </div>
                    </div> 
                    <div class="table_tr">
                        <p class="td_name">Redis版本：</p>
                        <!-- <div class="td_val">{{create.is_cluster == 0 ? '主从版':'区域版'}}</div> -->
                        <div class="td_val duplica">
                          <span class="active">Redis 2.8</span>
                        </div>
                    </div>
                   
                    <div class="table_tr">
                      <p class="td_name"><span class="red">*</span>实例规格：</p>
                      <div class="td_val duplica">
                        <span :class="create.duplica == 2 ? 'active':''" @click="setDuplica(2)">1主1从</span>
                        <span :class="create.duplica == 3 ? 'active':''" @click="setDuplica(3)">1主2从</span>
                      </div>
                    </div>
                    
                    <template v-if="create.banben == 3">
                      <div class="table_tr">
                        <p class="td_name">选择模式：</p>
                        <!-- <div class="td_val">{{create.is_cluster == 0 ? '主从版':'区域版'}}</div> -->
                        <div class="td_val duplica">
                          <span :class="create.moshi == 2 ? 'active':''" @click = "setMode(2)">快速选择</span>
                          <span :class="create.moshi == 3 ? 'active':''" @click = "setMode(3)">自定义分片</span>
                        </div>
                      </div>
                      <div class="table_tr" style="padding-bottom: 10px;">
                        <p class="td_name"><span class="red">*</span>分片数量：</p>
                        <div class="td_sel">
                          <selectDrop :items="brustNumList" :defaultName="'1111'" @chooseName="getBrustNum"></selectDrop>
                          <div class="tips" v-if="!(create.moshi == 3)" style="padding:0">快速选择模式下，分片容量默认为8G，实例容量=分片数量*分片容量</div>
                        </div>
                      </div>

                      <div v-if="create.moshi == 3" class="table_tr" style="padding-bottom: 10px;">
                        <p class="td_name"><span class="red">*</span>分片容量：</p>
                        <div class="td_sel">
                          <selectDrop :items="brustCapacityList" :defaultName="'2222'" @chooseName="getBrustCapacity"></selectDrop>
                        </div>
                      </div>

                   </template>

                    <div class="table_tr" style="padding-bottom: 10px;">
                      <p class="td_name"><span class="red">*</span>实例策略：</p>
                      <div class="td_sel">
                        <selectDrop :items="assignmentList" :defaultName="create.assignment_strategy" @chooseName="getAssignment"></selectDrop>
                        <div class="tips" style="padding:0">实例的主备分片分配策略，推荐使用跨机架策略</div>
                      </div>
                    </div>
                    <div class="table_tr">
                      <p class="td_name"><span class="red">*</span>实例容量：</p>
                      <div class="td_range">
                        <rangeSelect :maxLine="maxLine" :initSize="initSize" :rangeFlag="rangeFlag" :validLine="validLine" @range="getRangeData1"></rangeSelect>
                      </div>
                    </div> 
                    <div class="table_tr">
                      <p class="td_name"><span class="red">*</span>实例密码：</p>
                      <div class="td_val">
                        <input type="password" @keyup="createPassword(create.password)" v-model="create.password" class="text_input" placeholder="请输入实例密码">
                        <div class="tips" :class="create.pwdError ? 'red':''" style="padding:0;padding-top:5px;">长度为8~16个字符，至少包含数字、英文和符号中的两种</div>
                      </div>
                    </div> 
                    <!-- <div class="table_tr">
                      <p class="td_name">备注：</p>
                      <div class="td_sel">
                        <textarea class="text_area" @keyup="createBlur" v-model="create.comment" placeholder="请输入实例备注信息"></textarea>
                        <div class="tips red" v-if="create.isTotal">该可用区容量不足，请调整实例容量或选择其他可用区</div>
                      </div>
                    </div>  -->
                  </div>
                </div>
            </div>
        </model>

        <!-- 修改密码 -->
        <model :show="modify.show" :dialog="dialog" :width="772" :confim="modify.confirmOk" @confirm-btn="confirmModify"  @cancel-btn="cancelModify">
            <div slot="body" class="dialog_body">
                <div class="tabcon">
                  <div class="label_content">
                    <div class="table_tr">
                      <p class="td_name">实例名称：</p>
                      <div class="td_val">
                        {{modify.comment}}
                      </div>
                    </div>  
                    <div class="table_tr">
                      <p class="td_name">实例ID：</p>
                      <div class="td_val">
                        {{modify.bid}}
                      </div>
                    </div>
                    <div class="table_tr">
                      <p class="td_name">原始密码：</p>
                      <div class="td_val">
                        <input type="password" @keyup="modifyBlur(1)" v-model="modify.password" class="text_input" placeholder="请输入实例原密码">
                        <!-- <div class="tips red" v-if="modify.check1">原始密码不正确</div> -->
                      </div>
                    </div> 
                    <div class="table_tr">
                      <p class="td_name">新密码：</p>
                      <div class="td_val">
                        <input type="password" @keyup="modifyBlur(2)" v-model="modify.new_password" class="text_input" placeholder="请输入实例新密码">
                        <div class="tips" style="padding-top:5px;" :class="modify.check2 ? 'red':''">长度为8~16个字符，至少包含数字、英文和符号中的两种</div>
                      </div>
                    </div>
                    <div class="table_tr">
                      <p class="td_name">确认密码：</p>
                      <div class="td_val">
                        <input type="password" @keyup="modifyBlur(3)" v-model="modify.re_password" class="text_input" placeholder="请输入实例确认密码">
                        <div class="tips red" v-if="modify.check3">新密码和确认密码必须一致</div>
                      </div>
                    </div> 
                  </div>
                </div>
            </div>
        </model>
        
        <!-- 清空实例 -->
        <model :show="clear.show" :dialog="dialog" :width="772" :confim="clear.confirmOk" @confirm-btn="confirmClear"  @cancel-btn="cancelClear">
            <div slot="body" class="dialog_body">
                <div class="tabcon">
                  <div class="label_content">
                    <div class="table_tr">
                      <p class="td_name">实例名称：</p>
                      <div class="td_val">{{clear.comment}}</div>
                    </div>
                    <div class="table_tr">
                      <p class="td_name">实例ID：</p>
                      <div class="td_val">{{clear.bid}}</div>
                    </div>
                    <div class="table_tr">
                        <p class="td_name">实例版本：</p>
                        <div class="td_val">{{clear.is_cluster == 1 ? '集群版':'主从版'}}</div>
                    </div>
                    <div class="table_tr">
                        <p class="td_name">实例容量：</p>
                        <div class="td_val">
                          <span>{{clear.used_mem_size}}/{{clear.total_mem_size}}({{clear.total_mem_ratio}}%)</span>
                          <span v-if="clear.is_cluster == 1">，{{clear.replicas&&clear.replicas.length?clear.replicas.length:'-'}}分片</span>
                        </div>
                    </div>  
                    <!-- <div class="table_tr">
                      <p class="td_name">实例容量：</p>
                      <div class="td_val">{{clear.total_mem_size}}</div>
                    </div> 
                    <div class="table_tr">
                      <p class="td_name">使用容量：</p>
                      <div class="td_val">{{clear.used_mem_size}}</div>
                    </div>   -->
                    <div class="table_tr">
                      <p class="td_name">实例密码：</p>
                      <div class="td_val">
                        <input type="password" @keyup="clearBlur(1)" v-model="clear.password" class="text_input" placeholder="请输入实例密码">
                        <!-- <div class="tips red" v-if="clear.check1">实例密码不正确</div> -->
                        <div class="tips info" style="display:block">清空后数据将无法恢复，请输入实例密码授权操作</div>
                      </div>
                    </div>  
                  </div>
                </div>
            </div>
        </model>
        
        <!-- 扩缩容 -->
        <model :show="scale.show" :dialog="dialog" :width="772" :confim="scale.confirmOk" @confirm-btn="confirmScale"  @cancel-btn="cancelScale">
            <div slot="body" class="dialog_body">
                <div class="tabcon">
                  <div class="label_content">
                    <div class="table_tr">
                      <p class="td_name">实例名称：</p>
                      <div class="td_val">{{scale.comment}}</div>
                    </div> 
                    <div class="table_tr">
                      <p class="td_name">实例ID：</p>
                      <div class="td_val">{{scale.bid}}</div>
                    </div>
                    <div class="table_tr">
                      <p class="td_name">实例版本：</p>
                      <div class="td_val">{{scale.is_cluster == 1 ? '集群版':'主从版'}}</div>
                    </div>
                    <div class="table_tr">
                      <p class="td_name">当前容量：</p>
                      <div class="td_val">
                        <span>{{scale.used_mem_size}}/{{scale.total_mem_size}}({{scale.total_mem_ratio}}%)</span>
                        <span v-if="scale.is_cluster == 1">，{{scale.replicas&&scale.replicas.length?scale.replicas.length:'-'}}分片</span>
                      </div>
                    </div>  
                    <div class="table_tr" v-if="scale.is_cluster != 1">
                      <p class="td_name">目标容量：</p>
                      <!-- <div class="td_val"> 
                        <input type="range" min="0" max="10" v-model="scale.target_size">
                      </div> -->
                      <div class="td_range" style="position:relative;padding-bottom: 20px;">
                        <rangeSelect :maxLine="maxLine" :validLine="validLine" @range="getRangeData2"></rangeSelect>
                        <div class="tips red" v-if="scale.check1" style="position: absolute;top: 62px;">可用区容量不足，请修改调整容量</div>
                      </div>                    
                    </div>
                    <div v-if="scale.is_cluster == 1" class="table_tr" style="padding-bottom: 10px;">
                        <p class="td_name">目标分片数：</p>
                        <div class="td_sel">
                          <selectDrop :items="brustNumList" :defaultName="'1111'" @chooseName="getBrustNum"></selectDrop>
                        </div>
                    </div>
                    <div class="table_tr">
                      <p class="td_name">实例密码：</p>
                      <div class="td_val">
                        <input type="password" @keyup="scaleBlur(1)" v-model="scale.password" class="text_input" placeholder="请输入实例密码">
                        <!-- <div class="tips red" v-if="scale.check1">实例密码不正确</div> -->
                        <div class="tips info" style="display:block">执行后将调整实例容量，请输入实例密码授权操作</div>
                      </div>
                    </div>  
                  </div>
                </div>
            </div>
        </model>
        
        <!-- 主备切换 -->
        <model :show="switchs.show" :dialog="dialog" :width="772" :confim="switchs.confirmOk" @confirm-btn="confirmSwitch"  @cancel-btn="cancelSwitch">
            <div slot="body" class="dialog_body">
                <div class="tabcon">
                  <div class="label_content">
                    <div class="table_tr">
                      <p class="td_name">实例名称：</p>
                      <div class="td_val">{{switchs.comment}}</div>
                    </div> 
                    <div class="table_tr">
                      <p class="td_name">实例ID：</p>
                      <div class="td_val">{{switchs.bid}}</div>
                    </div>
                    <div class="table_tr">
                      <p class="td_name">主分片IP：</p>
                      <div class="td_val">
                        {{switchs.cache_ip}}&nbsp;
                      </div> 
                    </div>  
                    <div class="table_tr">
                      <p class="td_name">备份片IP：</p>
                      <div class="td_sel">
                        <selectDrop :items="switchs.backupList" :defaultName="switchs.backup_ip" @chooseName="getSwitchIp"></selectDrop>
                      </div>
                      <!-- <div class="td_val">
                        <select class="text_select" v-model="switchs.backup_ip" v-if="switchs.backupList">
                          <option value="" selected>请选择</option>
                          <option v-for="(item,index) in switchs.shards" :key="index">{{item.cache_ip}}(可用容量{{unit(item.total_mem_size - item.used_mem_size)}})</option>
                        </select>
                      </div> -->
                    </div> 
                    <div class="table_tr">
                      <p class="td_name">实例密码：</p>
                      <div class="td_val">
                        <input type="password" @keyup="switchBlur(1)" v-model="switchs.password" class="text_input" placeholder="请输入实例密码">
                        <!-- <div class="tips red" v-if="switchs.check1">实例密码不正确</div> -->
                        <div class="tips info" style="display:block">执行后将切换主备分片，请输入实例密码授权操作</div>
                      </div>
                    </div>  
                  </div>
                </div>
            </div>
        </model>
        
        <!-- 实例搬迁 -->
        <model :show="migrate.show" :dialog="dialog" :width="772" :confim="migrate.confirmOk" @confirm-btn="confirmMigrate"  @cancel-btn="cancelMigrate">
            <div slot="body" class="dialog_body">
                <div class="tabcon">
                  <div class="label_content">
                    <div class="table_tr">
                      <p class="td_name">实例名称：</p>
                      <div class="td_val">{{migrate.comment}}</div>
                    </div> 
                    <div class="table_tr">
                      <p class="td_name">实例ID：</p>
                      <div class="td_val">{{migrate.bid}}</div>
                    </div>
                    <div class="table_tr">
                      <p class="td_name">实例容量：</p>
                      <div class="td_val">{{unit(migrate.total_mem_size)}}</div>
                    </div>  
                    <div class="table_tr">
                      <p class="td_name">所属区域：</p>
                      <div class="td_sel">
                        <selectDrop :items="regionList" :defaultName="migrate.region_name" @chooseName="getMigrateRegion"></selectDrop>
                      </div>
                    </div> 
                    <div class="table_tr">
                      <p class="td_name">可用区：</p>
                      <div class="td_sel">
                        <selectDrop :items="areaList" :defaultName="migrate.set_name" @chooseName="getMigrateSet"></selectDrop>
                      </div>
                    </div>
                    <div class="table_tr">
                      <p class="td_name">存储节点：</p>
                      <div class="td_sel" v-if="migrate.backupList.length>0">
                        <selectDrop :items="migrate.backupList" :defaultName="migrate.backup_ip" @chooseName="getMigrateIP"></selectDrop> 
                      </div>
                      <div class="td_sel" v-if="migrate.backupList.length==0">
                        <span style="display:inline-block;margin-top:6px;">无可搬迁存储节点</span>
                      </div>
                      <!-- <div class="td_val">
                        <select class="text_select" v-model="migrate.backup_ip" v-if="migrate.shards">
                          <option value="" selected>请选择</option>
                          <option v-for="(item,index) in migrate.shards" :key="index">{{item.cache_ip}}(当前节点，可用容量{{unit(item.total_mem_size - item.used_mem_size)}})</option>
                        </select>
                      </div> -->


                    </div>
                    <div class="table_tr">
                      <p class="td_name">实例密码：</p>
                      <div class="td_val">
                        <input type="password" @keyup="migrateBlur(1)" v-model="migrate.password" class="text_input" placeholder="请输入实例密码">
                        <!-- <div class="tips red" v-if="migrate.check1">实例密码不正确</div> -->
                        <div class="tips info" style="display:block">执行后实例数据将搬迁至目标设备，请输入实例密码授权操作</div>
                      </div>
                    </div>  
                  </div>
                </div>
            </div>
        </model>

        <!-- 销毁实例 -->
        <model :show="deletes.show" :dialog="dialog" :width="1000" :confim="deletes.confirmOk" @confirm-btn="confirmDelete"  @cancel-btn="cancelDelete">
            <div slot="body" class="dialog_body">
                <div class="tabcon">
                  <div class="label_content">
                    <p class="modal-body-head">您即将对以下Redis实例执行  <i class="hilight">销毁</i>  操作，请确认：：</p>

                    <table class="itcloud-table modal-table">
                      <thead>
                        <tr>
                          <th style="width: 5%;">序号</th>
                          <th style="width: 13%;">实例名称</th>
                          <th style="width: 10%">实例ID</th>
                          <th style="width: 10%;">所属区域</th>
                          <th style="width: 15%;">可用区</th>
                          <th style="width: 10%;">版本</th>
                          <th style="width: 9%;">分片数</th>
                          <th style="width: 10%;">容量</th>
                          <th style="width: 18%;">访问地址</th>
                        </tr>
                      </thead>
                      <tbody v-if="deletes.list">
                        <tr>
                          <td>{{1}}</td>
                          <td>{{deletes.list.comment}}</td>
                          <td>{{deletes.list.bid}}</td>
                          <td>{{deletes.list.region_name}}</td>
                          <td>{{deletes.list.set_name}}</td>
                          <td>{{deletes.list.is_cluster==1?'集群版':'主从版'}}</td>
                          <td>{{deletes.list.is_cluster==1&&deletes.list.replicas&&deletes.list.replicas.length?deletes.list.replicas.length:'-'}}</td>
                          <td>{{unit(deletes.list.total_mem_size)}}</td>
                          <td>
                              <p v-for="(item ,index) in deletes.list.shards" :key="index">
                                  <span>{{item.cache_ip}}:{{item.port}}({{item.role == 1 ? '主':'备'}})</span>
                                  <i class="copy" @click="setCopy(item)"></i>
                              </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div class="table_tr">
                      <p class="td_name">实例密码
                      <div class="td_val">
                        <input type="password" @keyup="deleteBlur(1)" v-model="deletes.password" class="text_input" placeholder="请输入实例密码">
                        <!-- <div class="tips red" v-if="deletes.check1">实例密码不正确</div> -->
                        <div class="tips info" style="display:block">销毁后数据将无法恢复，请输入实例密码授权操作</div>
                      </div>
                    </div>  
                  </div>
                </div>
            </div>
        </model>

        <!-- 连接方式 -->
        <model :show="connect.show" :dialog="dialog" :width="772" :confim="connect.confirmOk" @confirm-btn="cancelConnect"  @cancel-btn="cancelConnect">
            <div slot="body" class="dialog_body">
                <div class="tabcon">
                  <div class="label_content">
                    <p class="modal-body-head">1. 在同一网络类型的虚拟机上安装 Redis原生的Redis-cli命令行工具。</p>
                    <p class="modal-body-head">2. 连接格式为“实例id:密码”，例如您的实例id是crs-5ts973z8，设置的密码是abcd1234，则连接命令如下</p>
                    <p class="bg_gray">redis-cli -h IP地址 -p 端口 -a crs-5ts973z8:abcd1234</p>
                  </div>
                </div>
            </div>
        </model>
    </div>
</template>

<script>
import Pagination from "../../components/pagination.vue";
import model from "../../components/modal.vue";
import query from "../../components/listquery.vue";
import selectDrop from "../../components/select.vue";
import rangeSelect from "../../components/range.vue";

export default {
  components: {
    Pagination,
    model,
    query,
    selectDrop,
    rangeSelect
  },
  data: function() {
    return {
      dropdown_flag : false,
      // 容量排序
      sortMem: true,
      // 使用率排序
      sortRate: true,
      // range最大数
      maxLine: 100,
      // 当前进度可用容量
      validLine: 100,
      //默认进度
      rangeFlag : true,
      initSize : 1,
      // 分页
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 2
      },
      // 列表数据
      rows: [],
      name: "",
      // 是否点击更多
      isMore: false,
      // 当前行-更多
      currentRow: -1,
      // 列表查询条件
      query: {
        /* ---------------------查询条件--------------------- */
        // 所属区域
        region: "",
        // 可用区
        area: "",
        // 实例状态
        state: "",  
        // 搜索实例ID/访问地址
        name: "",
        // 排序字段 total_mem_size total_mem_ratio
        order_by: "",
        // 排序类型 asc升序 desc降序
        order_type: ""
      },
      /* ---------------------列表数据--------------------- */
      // 所属区域列表
      regionList: [],
      // 可用区列表
      areaList: [],
      // 资源状态列表
      resourceList: [
        { id: 0, name: "运行中", is_cluster: false },
        { id: 1, name: "创建中", is_cluster: false },
        { id: 5, name: "备份中", is_cluster: false },
        { id: 6, name: "恢复中", is_cluster: false },
        { id: 3, name: "扩缩容中", is_cluster: false },
        { id: 10, name: "清空中", is_cluster: false },
        { id: 2, name: "搬迁中", is_cluster: false },
        { id: 4, name: "主备切换中", is_cluster: false },
        { id: 11, name: "销毁中", is_cluster: false },
        { id: -1, name: "异常", is_cluster: false }
      ],
      // 任务类型
      taskTypeList: {
        user: [
          { id: 1, name: "新建实例", is_cluster: false },
          { id: 5, name: "实例备份", is_cluster: false },
          { id: 6, name: "实例恢复" }
        ],
        manager: [
          { id: 1, name: "新建实例", is_cluster: false },
          { id: 2, name: "实例搬迁", is_cluster: false },
          { id: 3, name: "实例扩容", is_cluster: false },
          { id: 4, name: "主备切换", is_cluster: false },
          { id: 5, name: "实例备份", is_cluster: false },
          { id: 6, name: "实例恢复", is_cluster: false },
          { id: 7, name: "重建强一致", is_cluster: false },
          { id: 8, name: "下架存储节点", is_cluster: false },
          { id: 9, name: "清空存储节点", is_cluster: false }
        ]
      },
      // 任务结果
      taskResultList: [
        { id: 1, name: "成功", is_cluster: false },
        { id: 2, name: "失败", is_cluster: false },
        { id: 3, name: "执行中", is_cluster: false }
      ],
      /* ---------------------列表数据--------------------- */
      // 当前用户| 普通用户：user、管理员：manager
      login: "",
      // 列表头部下拉框点击-类型
      currentType: -1,
      // 弹出框
      dialog: {
        show: false,
        footer: true,
        head: "标题",
        body: "内容",
        cancelBtn: "取消",
        confirmBtn: "确定",
        cancelBtnShow: true
      },
      // 提示框
      tip: {
        show: false,
        head: "温馨提示",
        body: "内容"
      },
      /* ---------------------------------------弹出框-------------------------------------- */
      // 分配策略
      assignmentList: [
        { id: 4, name: "跨机架分配", is_cluster: false },
        { id: 0, name: "跨设备分配", is_cluster: false },
        { id: 1, name: "跨城市分配", is_cluster: false },
        { id: 2, name: "跨IDC分配", is_cluster: false }
      ],
      brustNumList:[
        {id:3,name:'3 片'},
        {id:5,name:'5 片'},
        {id:8,name:'8 片'},
        {id:12,name:'12 片'}
      ],
      brustCapacityList:[
        {id:4,name:'4 G'},
        {id:8,name:'8 G'},
        {id:12,name:'12 G'},
        {id:16,name:'16 G'},
        {id:20,name:'20 G'},
        {id:24,name:'24 G'},
        {id:32,name:'32 G'}
      ],
      // 新建redis实例
      create: {
        show: false,
        region_name: "",
        set_name: "",
        is_cluster: 0, // 0主从版 1区域版
        total_mem_size: 1,
        password: "",
        comment: "",
        confirmOk: true,
        pwdError: false,
        isTotal: false,
        passwordOk:false,
        duplica: 2,
        assignment_strategy:"跨机架分配",
        assignment_strategy_id:3,
        check : false,
        banben:'',
        moshi:'',
      },
      // 修改密码
      modify: {
        show: false,
        region_name: "",
        set_name: "",
        bid: "",
        comment:"",
        password: "",
        new_password: "",
        old_password: "",
        re_password: "",
        confirmOk: true,
        check1: false,
        check2: false,
        check3: false
      },
      // 清空实例
      clear: {
        show: false,
        region_name: "",
        set_name: "",
        bid: "",
        comment:"",
        total_mem_size: "",
        used_mem_size: "",
        total_mem_ratio:'',
        is_cluster:'',
        replicas:[],
        password: "",
        confirmOk: true,
        check1: false
      },
      // 扩缩容
      scale: {
        show: false,
        region_name: "",
        set_name: "",
        bid: "",
        comment:"",
        total_mem_size: "",
        used_mem_size: "",
        total_mem_ratio:'',
        is_cluster:'',
        replicas:[],
        residue_mem_size: "",
        target_size: 1,
        password: "",
        confirmOk: true,
        check1: false
      },
      // 主备切换
      switchs: {
        show: false,
        region_name: "",
        set_name: "",
        bid: "",
        comment:"",
        cache_ip: "",
        backup_ip: "",
        password: "",
        shards: [],
        backupList: [],
        confirmOk: true,
        check1: false
      },
      // 实例搬迁
      migrate: {
        show: false,
        region_name: "",
        set_name: "",
        bid: "",
        comment:"",
        backup_ip: "",
        total_mem_size: '',
        password: "",
        shards: [],
        confirmOk: true,
        check1: false,
        backupList: []
      },
      // 销毁实例
      deletes: {
        show: false,
        region_name: "",
        set_name: "",
        bid: "",
        comment:"",
        password: "",
        list: {},
        confirmOk: true,
        check1: false
      },
      // 连接方式
      connect: {
        show: false,
        confirmOk: false
      },
      // 是否请求完成
      isLoading:false
    };
  },
  mounted: function() {
    this.getDataList();
    this.getRegionList();
    this.getAreaList(); 
    // 列表更多，点击其他区域，收起下拉列表
    document.addEventListener("click", e => {
      // if (!this.$el.contains(e.target)) {
      //   this.isMore = false;
      // }
      this.isMore = false;
    });
    //获取用户信息
    this.login = this.userInfo.isAdmin ? "manager" : "user"
  },
  created: function() {},
  methods: {
    //预估是否可以创建实例
    getValidLine(region_name,set_name,num){
      let parmas = {
        size:1024,
        duplica:num,
        assignment_strategy : 0
      };
      this.$post(`/bid/${region_name}/${set_name}/?estimate`,parmas).then(res => {
        if(res!==undefined){ 
          this.validLine = +(res.max/1024).toFixed(2);
          this.isLoading = true;
          this.scale.residue_mem_size = this.unit(res.max);
        }
      });
    },
    // 页面之跳转到x页
    getCurrent: function(pages) { 
      if (this.page.pageIndex !== pages) { 
        this.page.pageIndex = pages;
        this.getDataList(); 
      }
    },
    // 页面之每页x条
    getSizeChange: function(sizes,max) {
      if (this.page.pageSize !== sizes) {
        if(this.page.pageIndex>max){
          this.page.pageIndex = max;
        }
        this.page.pageSize = sizes;
        this.getDataList();
      }
    },
    // 获取列表数据
    getDataList(flag) {
      let that = this; 
      this.isLoading = false;
      let region_name = "";
      let set_name = "";
      let bid = "";
      let ip = "";
      let page_index = this.page.pageIndex;
      let page_size = this.page.pageSize;
      let order_by = this.query.order_by;
      let order_type = this.query.order_type;
      let query = this.query.name;
      let state = this.query.state; 
      let url = `/bid/?region_name=${region_name}&set_name=${set_name}&query=${query}&page_index=${page_index}&page_size=${page_size}&order_by=${order_by}&order_type=${order_type}&state=${state}`;
      // let url = `/bid/${region_name}/${set_name}/?query=${query}&page_index=${page_index}&page_size=${page_size}&order_by=${order_by}&order_type=${order_type}&state=${state}`;
      this.$get(url).then(res => {
        this.rows = res.bids;
        this.page.totalCount = res.count;
        this.isLoading = true;
      });
    },
    // 删除弹框
    deleteMirror(name) {
      this.dialog.show = true;
      this.name = name;
    },
    // 删除弹框-确定
    confirmBtn() {
      this.dialog.show = false;
    },
    // 查看实例
    showDetail(row) {
      // 当为0的时候可以跳转
      let params = {
        id : row.bid,
        type : 0,
        message:row
      }
      if (row.state == 0) {
        this.$router.push({ name: "caseManageDetail" ,params});
        localStorage.setItem('message',  JSON.stringify(row));
      }
    },
    // 复制ip地址
    setCopy(item) {
      // 创建'虚拟'DOM
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.setAttribute("value", item.cache_ip);
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        this.$alert("复制成功");
      }
    },
    // 设置更多
    setMore(index, row) {
      this.currentRow = -1;
      // 运行中、异常
      if (row.state == 0 || row.state == -1) {
        this.isMore = !this.isMore;
        this.currentRow = index;
      }
    },
    // 容量转换GB|MB
    unit(val) {
      let newVal = val;
      let unit = "MB";
      if (val >= 1024) {
        newVal =
          (val / 1024).toFixed(1).split(".")[1] != 0
            ? (val / 1024).toFixed(1) + "GB"
            : (val / 1024).toFixed(1).split(".")[0] + "GB";
      } else {
        newVal = val + unit;
      }
      return newVal;
    },
    // 容量使用率%
    rate(total, used) {
      let rate = total / used / 1024;
      return rate.toFixed(1).split(".")[1] != 0
        ? rate.toFixed(1)
        : rate.toFixed(1).split(".")[0];
    },
    // 重置弹出框
    resetDialog() {
      this.dialog = {
        show: false,
        footer: true,
        head: "标题",
        body: "内容",
        cancelBtn: "取消",
        confirmBtn: "确定",
        Id: ""
      };
    },
    /* ----------------------------------列表头部---------------------------------- */
    // 列表头部-区域列表
    getRegionList() {
      let that = this;
      let region_name = "region_name";
      let set_name = "";
      let page_index = 1;
      let page_size = 1000; 
      this.$get(`/region/${region_name}?page_index=${page_index}&page_size=${page_size}`).then(res => {
        that.regionList = res.regions;
      });
    },
    // 列表头部-可用区列表
    getAreaList() {
      let that = this;
      let region_name = ""; 
      let page_index = 1;
      let page_size = 1000;
      this.$get(`/set/${region_name}?page_index=${page_index}&page_size=${page_size}`).then(res => {
        that.areaList = res.sets;
      });
    }, 
    // 列表头部-下拉框选中值
    getQueryVal(obj) {
      this.currentType = obj.type;
      if (obj.type == 1) {
        // 所属区域
        this.query.region = obj.name;
      } else if (obj.type == 2) {
        // 可用区
        this.query.area = obj.name;
      } else if (obj.type == 3) {
        // 资源状态
        this.query.state = obj.id;
      }
      this.page.pageIndex = 1;
      this.getDataList();
    },
    /* ----------------------------------新建实例-弹出框------------------------------- */
    // 实例版本
    setVersion(type){
      this.create.banben = type;
      // if(){
      //   this.create.moshi = 2;
      // }
      
    },
    // 选择模式
    setMode(type){
      this.create.moshi = type;
    },
    // 实例规格
    setDuplica(type){
      this.create.duplica = type;
      this.setMax();
    },
    // 新建-实例容量
    getRangeData1(num) {
      this.create.total_mem_size = num;
      this.createBlur();
    },
    // 获取所属区域
    getCreateRegion(val) {
      this.create.region_name = val;
      this.createBlur();
    },
    // 获取可用区
    getCreateSet(val) {
      this.create.set_name = val;
      this.createBlur();
    },
    // 获取分片数量
    getBrustNum(val) { 
      // this.create.assignment_strategy = val; 
      // let id = "";
      // switch(val){
      //   case "跨设备分配":
      //     id = 0;
      //     break;
      //   case "跨城市分配":
      //     id = 1;
      //     break;
      //   case "跨IDC分配":
      //     id = 2;
      //     break;
      //   case "跨机架分配":
      //     id = 3;
      //     break;
      // }
      // this.create.assignment_strategy_id = id;
      // this.setMax();
    },
    getBrustCapacity(val){
      
    },
    // 获取分配策略
    getAssignment(val) { 
      this.create.assignment_strategy = val; 
      let id = "";
      switch(val){
        case "跨设备分配":
          id = 0;
          break;
        case "跨城市分配":
          id = 1;
          break;
        case "跨IDC分配":
          id = 2;
          break;
        case "跨机架分配":
          id = 3;
          break;
      }
      this.create.assignment_strategy_id = id;
      this.setMax();
    },
    // 打开弹出框
    createCase() {
      this.dialog.head = "新建Redis实例";
      this.create.show = true;
      this.dialog.cancelBtnShow = true;
      this.dialog.confirmBtn = "确定";
      this.validLine = 100;
      this.create.region_name = this.regionList[0].name;
      this.create.set_name = this.areaList[0].name;
      this.create.password = '';
      this.create.comment = '';
      this.create.confirmOk = true;
      this.create.banben = 2;
      this.create.moshi = 2;
      this.setMax();
    },
    // 密码校验
    regxPwd(val) {
      let regx = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,16}$/;
      let pwd = val;
      if (pwd.match(regx) == null) {
        return true;
      } else {
        return false;
      }
    },
    createPassword(pwd){
      this.create.pwdError = this.regxPwd(this.create.password);
      if(this.create.password!=''&&!this.regxPwd(this.create.password)){
        this.create.passwordOk = true;
      }else{
        this.create.passwordOk = false;
      }
      this.createBlur();
    },
    // form表单离开事件
    createBlur(pwd) {
      if (
        this.create.region_name !=''&&
        this.create.set_name!='' &&
        this.create.total_mem_size!='' &&
        this.create.passwordOk && this.create.comment != '' && 
        this.create.total_mem_size &&
        this.create.check
      ) {
        // this.create.pwdError = this.regxPwd(this.create.password);
        // this.create.confirmOk = this.create.pwdError;
        this.create.confirmOk = false;
      } else {
        this.create.confirmOk = true;
      }
    },
    // 预估
    setMax(){
      // 取消loading弹窗
      loadingClose = true
      this.$post(`/bid/${this.create.region_name}/${this.create.set_name}/?estimate`,{
        size : 1024,
        duplica : this.create.duplica,
        assignment_strategy : this.create.assignment_strategy_id
      }).then(res => {
         this.validLine = +parseFloat(this.unit(res.max)).toFixed(2);
         this.create.check = res.yes == 1?true:false;
         this.createBlur();
         this.rangeFlag = !this.rangeFlag;
         this.initSize = res.yes==1?1:0
      })
    },
    // 确定按钮事件
    confirmCreate() {
      let params = {
        // region_name: this.create.region_name,
        // set_name: this.create.set_name,
        size: parseInt(this.create.total_mem_size*1024),
        duplica: this.create.duplica,
        assignment_strategy: this.create.assignment_strategy_id,
        password: this.create.password,
        comment: this.create.comment,
        is_raft: true
      };
      this.$post(`/bid/${this.create.region_name}/${this.create.set_name}`, params).then(res => {
        if(res!==undefined){
          // this.getDataList();
          this.$router.push({name : 'taskQuery'})
          this.create.show = false;
        }
      });
    },
    // 取消按钮事件
    cancelCreate() {
      this.create.show = false;
      this.create.confirmOk =true;
      this.create.region_name = "";
      this.create.set_name = "";
      this.create.total_mem_size = 1;
      this.create.password = "";
      this.create.comment = "";
      this.create.passwordOk = false,
      this.create.duplica = 2,
      this.create.assignment_strategy_id = 3
    },
    /* ----------------------------------修改密码-弹出框------------------------------- */
    // 确定按钮事件
    confirmModify() {
      let params = {
        // region_name: this.modify.region_name,
        // set_name: this.modify.set_name,
        // bid: this.modify.bid,
        password: this.modify.password,
        new_password: this.modify.new_password
      };
      this.$http
        .put(
          `/bid/${this.modify.region_name}/${this.modify.set_name}/${this.modify.bid}`,
          params
        )
        .then(res => {
          if (res!==undefined) {
            // this.getDataList();
            this.modify.show = false;
            // this.resetDialog();
            this.$router.push({name : 'taskQuery'})
          }
        });
    },
    // 取消按钮事件
    cancelModify() {
      this.modify.show = false;
      this.modify.confirmOk = true;
      this.modify.password = "";
      this.modify.new_password = "";
      this.modify.re_password = "";
    },
    // 确认密码检查
    // chackPwd() {
    //   if (this.modify.new_password != this.modify.old_password) {
    //     this.modify.check = true;
    //   } else {
    //     this.modify.check = false;
    //   }
    // },
    // form表单离开事件
    modifyBlur(type) {
      if (type == 1) {
        // 验证原始密码是否正确
        // if (this.modify.password != this.modify.old_password) {
        //   this.modify.check1 = true;
        // } else {
        //   this.modify.check1 = false;
        // }
        this.modify.check1 = false;
      }
      if (type == 2) {
        // 验证新密码格式
        this.modify.check1 = false;
        this.modify.check2 = this.regxPwd(this.modify.new_password);
      }
      if (type == 3) {
        // 判断新密码和确认密码是否一致
        this.modify.check1 = false;
        this.modify.check2 = false;
        if (this.modify.new_password != this.modify.re_password) {
          this.modify.check3 = true;
        } else {
          this.modify.check3 = false;
        }
      }
      if (
        !this.modify.check1 &&
        !this.modify.check2 &&
        !this.modify.check3 &&
        this.modify.password &&
        this.modify.new_password &&
        this.modify.re_password
      ) {
        this.modify.confirmOk = false;
      }else{
        this.modify.confirmOk = true;
      }
      
    },
    // 打开弹出框
    setModify(row, index) {
      this.modify.password = '';
      this.modify.new_password = '';
      this.modify.re_password = '';
      this.dialog.cancelBtnShow = true;
      this.modify.bid = row.bid;
      this.modify.comment = row.comment;
      this.modify.region_name = row.region_name;
      this.modify.set_name = row.set_name;
      this.modify.old_password = row.password;
      this.modify.show = true;
      this.modify.confirmOk = true;
      this.dialog.head = "修改密码";
      this.dialog.confirmBtn = "确定";
    },
    /* ----------------------------------清空实例-弹出框------------------------------- */
    // 确定按钮事件
    confirmClear() {
      let params = {
        // bid: this.create.bid,
        // region_name: this.clear.region_name,
        // set_name: this.clear.set_name,
        // total_mem_size: this.create.total_mem_size,
        // used_mem_size: this.create.used_mem_size,
        password: this.clear.password
      };
      this.$post(
        `/bid/${this.clear.region_name}/${this.clear.set_name}/${this.clear.bid}/clear`,
        params
      ).then(res => {
        if (res!==undefined) {
          this.clear.show = false;
          // this.resetDialog();
          // this.getDataList();
          this.$router.push({name : 'taskQuery'})
        }
      });
    },
    // 取消按钮事件
    cancelClear() {
      this.clear.show = false;
      this.clear.confirmOk = true;
      this.clear.password = "";
      // this.resetDialog();
    },
    // form表单离开事件
    clearBlur(type) {
      if (!this.clear.password) {
        this.clear.confirmOk = true;
        return;
      }
      // if (this.clear.password != this.clear.old_password) {
      //   this.clear.check1 = true;
      //   this.clear.confirmOk = true;
      // } else {
      //   this.clear.check1 = false;
      //   this.clear.confirmOk = false;
      // }
      this.clear.check1 = false;
      this.clear.confirmOk = false;
    },
    // 打开弹出框
    setClear(row, index) {
      this.clear.password = '';
      this.clear.confirmOk = true;
      this.dialog.cancelBtnShow = true;
      this.clear.bid = row.bid;
      this.clear.comment = row.comment;
      this.clear.region_name = row.region_name;
      this.clear.set_name = row.set_name;
      this.clear.total_mem_size = this.unit(row.total_mem_size);
      this.clear.used_mem_size = this.unit(row.used_mem_size);
      this.clear.total_mem_ratio = row.total_mem_ratio;
      this.clear.is_cluster =  row.is_cluster;
      this.clear.replicas = row.replicas;
      // this.clear.old_password = row.password;
      this.clear.show = true;
      this.dialog.head = "清空实例";
      this.dialog.confirmBtn = "清空";
    },
    /* ----------------------------------扩缩容-弹出框------------------------------- */
    // 扩缩容-实例容量
    getRangeData2(num) {
      this.scale.target_size = num;
      if(parseInt(this.scale.target_size) > parseInt(this.scale.residue_mem_size)){
        this.scale.check1 = true
      }else{
        this.scale.check1 = false
      }
      this.scaleBlur();
    },
    // 确定按钮事件
    confirmScale() {
      let params = {
        target_size: this.scale.target_size*1024,
        password: this.scale.password
      };
      this.$post(
        `/bid/${this.scale.region_name}/${this.scale.set_name}/${this.scale.bid}/scale`,
        params
      ).then(res => {     
        if (res!==undefined) {
          this.scale.show = false;
          // this.getDataList();
          this.$router.push({name : 'taskQuery'})
        }
      });
    },
    // 取消按钮事件
    cancelScale() {
      this.scale.show = false;
      this.scale.confirmOk = true;
      this.scale.target_size = 0;
      this.scale.password = "";
      this.scale.check1 = false
    },
    // form表单离开事件
    scaleBlur(type) {
      if (!this.scale.target_size || this.scale.password=='' || this.scale.check1) {
        this.scale.confirmOk = true;
      }else{
        this.scale.confirmOk = false;
      }
        // this.scale.check1 = false;
       
      // if (this.scale.password != this.scale.old_password) {
      //   this.scale.check1 = true;
      //   this.scale.confirmOk = true;
      // } else {
      //   this.scale.check1 = false;
      //   this.scale.confirmOk = false;
      // }
    },
    // 打开弹出框
    setScale(row, index) {
      
      this.dialog.cancelBtnShow = true;
      this.scale.bid = row.bid;
      this.scale.comment = row.comment;
      this.scale.region_name = row.region_name;
      this.scale.set_name = row.set_name;
      this.scale.total_mem_size = this.unit(row.total_mem_size);
      this.scale.used_mem_size = this.unit(row.used_mem_size);
      this.scale.total_mem_ratio = row.total_mem_ratio;
      this.scale.is_cluster =  row.is_cluster;
      this.scale.replicas = row.replicas;
      // this.scale.residue_mem_size = this.unit(
      //   row.total_mem_size - row.used_mem_size
      // );
      
      // this.scale.old_password = row.password;
      this.scale.show = true;
      this.dialog.head = "扩缩容";
      this.dialog.confirmBtn = "确定";
      // 取消loading弹窗
      loadingClose = true
      this.getValidLine(row.region_name,row.set_name,row.replicas[0].shards.length);
    },
    /* ----------------------------------主备切换-弹出框------------------------------- */
    // ip
    getSwitchIp(num) {
      this.switchs.backup_ip = num;
      this.switchBlur();
    },
    // 确定按钮事件
    confirmSwitch() {
      let params = {
        // bid: this.switchs.bid,
        // region_name: this.switchs.region_name,
        // set_name: this.switchs.set_name,
        backup_ip: this.switchs.backup_ip.split(":")[0],
        password: this.switchs.password
      };
      this.$post(
        `/bid/${this.switchs.region_name}/${this.switchs.set_name}/${this.switchs.bid}/switch`,
        params
      ).then(res => {
        if (res!==undefined) {
          this.switchs.show = false;
          // this.getDataList();
          // this.resetDialog();
          this.$router.push({name : 'taskQuery'})
        }
      });
    },
    // 取消按钮事件
    cancelSwitch() {
      this.switchs.show = false;
      this.switchs.confirmOk = true;
      this.switchs.backup_ip = "";
      this.switchs.password = "";
      // this.resetDialog();
    },
    // form表单离开事件
    switchBlur() {
      if (!this.switchs.password||this.switchs.backup_ip=='') {
        this.switchs.confirmOk = true;
        return;
      }
      // if (this.switchs.password != this.switchs.old_password) {
      //   if (!this.switchs.backup_ip) {
      //     this.switchs.check1 = true;
      //     this.switchs.confirmOk = true;
      //   }
      // } else {
      //   this.switchs.check1 = false;
      //   this.switchs.confirmOk = false;
      // }
      this.switchs.check1 = false;
      this.switchs.confirmOk = false;
    },
    // 打开弹出框
    setSwitch(row, index) {
      this.dialog.cancelBtnShow = true;
      this.switchs.bid = row.bid;
      this.switchs.comment = row.comment;
      this.switchs.region_name = row.region_name;
      this.switchs.set_name = row.set_name;
      this.switchs.password = '';
      // this.switchs.old_password = row.password;
      this.switchs.shards = row.replicas[0].shards;
      this.switchs.show = true;
      this.dialog.head = "主备切换";
      this.dialog.confirmBtn = "切换";

      let back = [];
      for (var i = 0; i < row.replicas[0].shards.length; i++) {
        // 主分片
        let names = "";
        if (row.replicas[0].shards[i].total_mem_size - row.replicas[0].shards[i].used_mem_size == 0) {
          names = row.replicas[0].shards[i].cache_ip + "（无可用容量）";
        } else {
          names =
            row.replicas[0].shards[i].cache_ip +
            "（可用容量" +
            this.unit(
              row.replicas[0].shards[i].total_mem_size - row.replicas[0].shards[i].used_mem_size
            ) +
            "）";
        }
        if (row.replicas[0].shards[i].role == 1) {
          this.switchs.cache_ip = names;
        }
        // 备分片
        if (row.replicas[0].shards[i].role == 2) {
          let obj = {
            id: i + 1,
            name: names
          };
          back.push(obj);
        }
      }
      this.switchs.backupList = back;
      this.switchs.backup_ip = this.switchs.backupList[0].name
    },
    /* ----------------------------------实例搬迁-弹出框------------------------------- */
    // 获取所属区域
    getMigrateRegion(num) {
      this.migrate.region_name = num;
      this.migrateBlur();
    },
    // 获取可用区
    getMigrateSet(val) {
      this.migrate.set_name = val;
      this.migrateBlur();
    },
    // 获取存储节点
    getMigrateIP(val) {
      this.migrate.backup_ip = val;
      this.migrateBlur();
    },
    // 确定按钮事件
    confirmMigrate() {
      // console.log(this.migrate.backup_ip.splice(0,13))
      let params = {
        // bid: this.migrate.bid,
        // region_name: this.migrate.region_name,
        // set_name: this.migrate.set_name,
        ip: this.migrate.backup_ip.split('（')[0],
        password: this.migrate.password
      };

      this.$post(
        `/bid/${this.migrate.region_name}/${this.migrate.set_name}/${this.migrate.bid}/migrate`,
        params
      ).then(res => {
        if (res!==undefined) {
          this.migrate.show = false;
          // this.resetDialog();
          // this.getDataList();
          this.$router.push({name : 'taskQuery'})
        }
      });
    },
    // 取消按钮事件
    cancelMigrate() {
      this.migrate.show = false;
      this.migrate.confirmOk = true;
      this.migrate.region_name = "";
      this.migrate.set_name = "";
      this.migrate.backup_ip = "";
      this.migrate.password = "";
      this.resetDialog();
    },
    // form表单离开事件
    migrateBlur() {
      if (!this.migrate.password || !this.migrate.backup_ip) {
        this.migrate.confirmOk = true;
        return;
      }
      if (
        this.migrate.backup_ip &&
        this.migrate.region_name &&
        this.migrate.set_name &&
        this.migrate.password
      ) {
        // if (this.migrate.password != this.migrate.old_password) {
        //   this.migrate.check1 = true;
        //   this.migrate.confirmOk = true;
        // } else {
        //   this.migrate.check1 = false;
        //   this.migrate.confirmOk = false;
        // }
        this.migrate.check1 = false;
        this.migrate.confirmOk = false;
      }
    },
    // 打开弹出框
    setMigrate(row, index) {
      this.dialog.cancelBtnShow = true;
      this.migrate.bid = row.bid;
      this.migrate.comment = row.comment;
      this.migrate.region_name = row.region_name;
      this.migrate.set_name = row.set_name;
      // this.migrate.old_password = row.password;
      this.migrate.total_mem_size = row.total_mem_size;
      this.migrate.shards = row.replicas[0].shards;
      this.migrate.show = true;
      this.dialog.head = "实例搬迁";
      this.dialog.confirmBtn = "搬迁";
      this.migrate.backupList = [];
      this.migrate.password = '';
      this.migrate.confirmOk = true;

// /api/v1/ ckv/cache/{region_name}/{set_name}/{ip}
      let arrList = []; 
      let back = [];
      loadingClose = true
      
      this.$get(`/cache?region_name=${row.region_name}&set_name=${row.set_name}&ip=&state=&page_index=&page_size=`).then(res => {
        if (res!==undefined) {
          let arr1 = res.caches;
          let arr2 = row.replicas[0].shards;
          for(var i=0; i < arr1.length; i++){
              var flag = true; 
              for(var j=0; j < arr2.length; j++){
                  if(arr1[i].ip == arr2[j].cache_ip.split(':')[0]) {
                    flag = false; 
                  }
              }
              if(flag) {
                  arrList.push(arr1[i]);  
              }
          }
          for (var i = 0; i < arrList.length; i++) {
            let names = "";

            if (arrList[i].total_mem_size - arrList.used_mem_size == 0) {
              names = arrList[i].ip + "（无可用容量）";
              if (arrList[i].role == 1) {
                names = arrList[i].ip + "当前节点，（无可用容量）";
              }
            } else {
              names =
                arrList[i].ip +
                "（可用容量" +
                this.unit(
                  arrList[i].total_mem_size - arrList[i].used_mem_size
                ) +
                "）";
              if (arrList[i].role == 1) {
                names =
                  arrList[i].ip +
                  "（当前节点，可用容量" +
                  this.unit(
                    arrList[i].total_mem_size - arrList[i].used_mem_size
                  ) +
                  "）";
              }
            }
            let obj = {
              id: i + 1,
              name: names
            };
            back.push(obj);
            this.migrate.backupList = back;
          }         
        }
        this.migrate.backup_ip = this.migrate.backupList[0].name;
      });
      
      
    },
    /* ----------------------------------销毁实例-弹出框------------------------------- */
    // 确定按钮事件
    confirmDelete() {
      let params = {
        bid: this.deletes.bid,
        region_name: this.deletes.region_name,
        set_name: this.deletes.set_name,
        password: this.deletes.password
      };
      this.$http
        .delete(
          `/bid/${params.region_name}/${params.set_name}/${params.bid}/${
            params.password
          }`,
          params
        )
        .then(res => {
          if (res!==undefined) {
            this.deletes.show = false;
            // this.getDataList();
            this.$router.push({name : 'taskQuery'})
          }
        });
    },
    // 取消按钮事件
    cancelDelete() {
      this.deletes.show = false;
      this.deletes.confirmOk = true;
      this.deletes.password = "";
    },
    // form表单离开事件
    deleteBlur(type) {
      if (!this.deletes.password) {
        this.deletes.confirmOk = true;
        return;
      }
      // if (this.deletes.password != this.deletes.old_password) {
      //   this.deletes.check1 = true;
      //   this.deletes.confirmOk = true;
      // } else {
      //   this.deletes.check1 = false;
      //   this.deletes.confirmOk = false;
      // }
      this.deletes.check1 = false;
      this.deletes.confirmOk = false;
    },
    // 打开弹出框
    setDelete(row, index) {
      this.deletes.password = '';
      this.deletes.confirmOk = true;
      this.dialog.cancelBtnShow = true;
      this.deletes.list = row;
      this.deletes.list.shards = row.replicas[0].shards;
      this.deletes.bid = row.bid;
      this.deletes.comment = row.comment;
      this.deletes.region_name = row.region_name;
      this.deletes.set_name = row.set_name;
      // this.deletes.old_password = row.password;
      this.deletes.show = true;
      this.dialog.head = "销毁实例";
      this.dialog.confirmBtn = "确定";
    },
    /* ----------------------------------连接方式-弹出框------------------------------- */
    // 连接方式
    setConnect() {
      this.dialog.cancelBtnShow = false;
      this.dialog.head = "连接方式";
      this.connect.show = true;
    },
    // 取消按钮事件
    cancelConnect() {
      this.connect.show = false;
    },
    // 备份与恢复
    setBack(item) {
      this.$router.push({
        name: "caseManageDetail",
        params: {
          id: item.bid,
          type: 1,
          message : item
        }
      });
    },
    // 排序
    setSort(num) {
      let by = "";
      let type = "";
      if (num == 1) {
        this.sortMem = !this.sortMem;
        by = "total_mem_size";
        type = this.sortMem ? "desc" : "asc";
      } else if (num == 2) {
        this.sortRate = !this.sortRate;
        by = "total_mem_ratio";
        type = this.sortRate ? "desc" : "asc";
      }
      this.query.order_by = by;
      this.query.order_type = type;
      this.getDataList();
    }
  }
};
</script>
