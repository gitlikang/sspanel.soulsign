// ==UserScript==
// @name              sspanel
// @namespace         https://soulsign.inu1255.cn/scripts/208
// @version           1.2.6
// @author            Miao-Mico
// @loginURL          https://xixicats.pw
// @updateURL         https://soulsign.inu1255.cn/script/Miao-Mico/sspanel.dev
// @grant             require
// @expire            2000000
// @domain            sspanel
// @domain            ssr
// @domain            v2ray
// @domain            *
// @param             domain 域名,([http://]i.cat),([https://]i.dog)
// ==/UserScript==

let sspanel = {
    core: "https://soulsign.inu1255.cn/script/Miao-Mico/mmc.js", // 地址
    domain: ["xixicats.pw", "suying999.net", "cloud.nima.ma"], // 域名
    path: {
        log_in: ["auth/login"], // 登录网址主机的
        sign_in: ["user/checkin"], // 签到网址主机的
    }, // 路径
    keyword: {
        positive: ["我的", "节点"], // 应该有的
        negative: ["忘记密码"], // 不应该有的
    }, // 检查是否在线时的关键词
    hook: false, // 钩子
};

let mmc;

exports.run = async function (param) {
    mmc = await require(sspanel.core);
    mmc = await mmc(sspanel, param);

    /* 返回签到信息 */
    return await mmc.sign_in(true);
};

exports.check = async function (param) {
    mmc = await require(sspanel.core);
    mmc = await mmc(sspanel, param);

    /* 返回是否在线 */
    return await mmc.check_online();
};