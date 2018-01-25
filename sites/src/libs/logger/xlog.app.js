/**
 * Created by Ravy on 24.03.2017.
 * Вывод в консоль необходимой инфы для отладки. На проде этой информации видно не будет
 * xlog('same text', vm.data)
 */
var xlog = function(text, data) {
    if (window.location.host.indexOf('local') !== -1) {
        /*var list = '';
        for (var i=0; i < arguments.length; i++) {
            list = list + arguments[i] + ' ';
        }*/
        console.warn(text || '', data || '');
    }
};

