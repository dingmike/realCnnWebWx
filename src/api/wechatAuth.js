import request from '../utils/request'

/**
 * 登录接口请求token与userinfo
 * @param data
 * 入参  code:"021gj0OV1om5PU0k9VNV1VMQNV1gj0OK"
 * 返回  {
 *          accessToken:'xxx',
 *          refreshToken:'xxx',
 *          userInfo:{}
 *       }
 */
export function loginByCode (data) {
    return request({
        url: '/common/authWechat',
        method: 'get',
        params: data,
    })
}

export function wxJsapi (data) {
    return request({
        url: '/common/jsapi',
        method: 'get',
        params: data,
    })
}

export function createOrder(data) {
    return request({
        url: '/apiv1/order/createOrder',
        method: 'post',
        data: data,
    })
}
export function createArticleOrder(data) {
    return request({
        url: '/apiv1/order/createArticleOrder',
        method: 'post',
        data: data,
    })
}
export function orderDoPay(data) {
    return request({
        url: '/apiv1/order/doPay',
        method: 'post',
        data: data,
    })
}
export function articleDoPay(data) {
    return request({
        url: '/apiv1/order/articleDoPay',
        method: 'post',
        data: data,
    })
}
