
import * as http from "../utils/http";
import iconv from "iconv-lite";

//根据QQ号查询
export async function queryByQQNum (qqNum) {
    let response = await http.get(`/api/qq/${ qqNum }`);
    if (response.status == 200) {
        return response.data;
    }
    else {
        return null;
    }
}

//根据群号查询
export async function queryByGroupNum (groupNum) {
    let response = await http.get(`/api/group/${ groupNum }`);
    if (response.status == 200) {
        return response.data;
    }
    else {
        return null;
    }   
}

//根据QQ号进行二层拓展查询
export async function queryByQQNumExt (qqNum) {
    let response = await http.get(`/api/qqext/${ qqNum }`);
    if (response.status == 200) {
        return response.data;
    }
    else {
        return null;
    }
}

//根据url获取外部图像
export function getExternalImage (url, timeout = 8000) {
    return new Promise((resolve, reject) => {
        try {
            let imgObj = new Image();
            imgObj.crossOrigin = "";
            imgObj.src = url;

            let timerId = setTimeout(() => {
                reject();
            }, timeout);

            imgObj.onload = () => {
                clearTimeout(timerId);
                resolve(imgObj);
            };

            imgObj.onerror = () => {
                clearTimeout(timerId);
                reject();
            };
        }
        catch (e) {
            reject();
        }
    });
}

//获取QQ用户的头像图片
export async function getQQImg (qqNum) {
    let img = await this.getExternalImage(`/qqlogo/headimg_dl?dst_uin=${ qqNum }&spec=640`);
    console.log(qqNum + ` QQ头像 达成 ${ img.width } ${ img.height }`);
    return img;
}

//获取QQ群的头像图片
export async function getGroupImg (groupNum) {
    let img = await this.getExternalImage(`/grouplogo/gh/${ groupNum }/${ groupNum }/640/`);
    console.log(groupNum + " 群图片 达成");
    return img;          
}

//获取QQ账户最新信息
export async function getQQInfo (qqNum) {
    let response = await http.get(`/qqinfo/fcg-bin/cgi_get_portrait.fcg?uins=${ qqNum }`);
    if (response.status == 200) {
        console.log(response.data);
        // console.log(response.data);
        // let str = response.data.substring(109, 114);
        // console.log(str);
        // let buf = Buffer.from(str);
        // console.log(buf);
        // let str = iconv.decode(buf, "utf8");
        // console.log(str);
    }
}