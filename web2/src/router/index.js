import Vue from 'vue'
import VueRouter from 'vue-router'

import home from '../views/home/index.vue'

Vue.use(VueRouter)

export default new VueRouter({
    // mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        { path: '', redirect: { name: 'caseManage' } },
        {
            path: '/home',
            component: home,
            name: 'home',
            children: [
                // redis实例管理
                { path: 'caseManage', component: (resolve) => require(['../views/caseManage/index.vue'], resolve), name: 'caseManage' }, ,
                // redis实例管理-详情
                { path: 'caseManageDetail/:id/:type', component: (resolve) => require(['../views/caseManageDetail/index.vue'], resolve), name: 'caseManageDetail' },
                // 任务查询
                { path: 'taskQuery', component: (resolve) => require(['../views/taskQuery/index.vue'], resolve), name: 'taskQuery' }
            ]
        },
        { path: '/pageNotFond', component: (resolve) => require(['../components/404.vue'], resolve), name: 'pageNotFond' },
        // { path: '/deny', component: (resolve) => require(['../components/deny.vue'], resolve), name: 'Deny' }
    ]
})