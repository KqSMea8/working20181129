

var time_format = function(time){
    return time < 10 ? '0'+ time : time;
}

const filter_time = function(time){           
    var date = new Date(time),
    Y = date.getFullYear(),
    M = time_format(date.getMonth() + 1),
    D = time_format(date.getDate()),
    H = time_format(date.getHours()),
    m = time_format(date.getMinutes()),
    s = time_format(date.getSeconds());    
    
    return Y + '-' + M + '-' + D + ' '+ H +':'+ m +':'+ s
}

function install(Vue) {
    Vue.filter('filter_time', filter_time);
}
 
module.exports = install;