// ==UserScript==
// @name              nexusphp
// @namespace         https://soulsign.inu1255.cn/scripts/226
// @version           1.2.10
// @author            Mayu-Melville
// @author            Miao-Mico
// @updateURL         https://soulsign.inu1255.cn/script/Miao-Mico/nexusphp
// @grant             require
// @expire            2000000
// @domain            NexusPHP
// @domain            PT
// @domain            *.*
// @domain            *.*.*
// @domain            *.*.*.*
// @param             domain 域名,([http://]i.cat),([https://]i.dog)
// ==/UserScript==

let nexusphp = {
    core: "https://soulsign.inu1255.cn/script/Miao-Mico/mmc.dev.js", // 核心地址
    domain: [], // 域名
    path: {
        log_in: ["index.php"], // 登录网址主机的
        sign_in: ["attendance.php"], // 签到网址主机的
    }, // 网址主机的目录
    keyword: {
        online: ["欢迎"], // 在线的
        signed: ["您今天已经签到过了"], // 已经签到的
    }, // 检查是否在线时的关键词
    hook: {
        get_log_in: async function (site, param) {
            /* 获取登录信息 */
            return { code: 0, data: await axios.get(site.url.get) };
        }, // 获取网址登录信息
        post_sign_in: async function (site, param) {
            /* 推送签到信息 */
            let data_psi = await axios.post(site.url.post);

            /* 返回信息 */
            if (/签到成功/.test(data)) {
                return { code: 0, data: data_psi.data.msg };
            }

            return { code: 1, data: "签到失败" };
        }, // 推送网址签到信息
    }, // 钩子
};

let mmc;

exports.run = async function (param) {
    mmc = await require(nexusphp.core);
    mmc = await mmc(nexusphp, param);

    /* 返回签到信息 */
    return await mmc.sign_in(true);
};

exports.check = async function (param) {
    mmc = await require(nexusphp.core);
    mmc = await mmc(nexusphp, param);

    /* 返回是否在线 */
    return await mmc.check_online();
};
