

import moment from "moment";
moment.locale('zh-cn')
import http from "http";



const API = {
    async get(url = 'http://timor.tech/api/holiday/year/2023') {
        return new Promise((resolve, reason) => {
            http.get(url, (res) => {
                res.setEncoding('utf8');
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve(JSON.parse(data))
                });
            }).on('error', (err) => {
                reason(err)
                console.error(`Error: ${err.message}`);
            })
        }
        )
    }

}



//获取节假日
const getHolidays = async (years = 2023) => {
    let { holiday } = await API.get('http://timor.tech/api/holiday/year/' + years);
    let list = Object.keys(holiday).map(key => `${years}-${key}`.split('-').join('.'));
    return list
}



//随机分秒
const randomMinuteNum = () => Math.ceil(Math.random() * 60);
const randomMinuteNum40 = () => Math.ceil(Math.random() * 30) + 40;

//生成指定规则小时数据
export const getDate = async (date = 5, year = 2023) => {


    Math.floor((Math.random() * 2) + 22)
    let list = []
    let a = new Date();
    a.setFullYear(year); // 设置指定年份
    a.setMonth(date - 1); // 设置指定月份
    let days = new Date(a.getFullYear(), a.getMonth() + 1, 0).getDate(); // 获取本月一共有多少天  new Date()第3个参数默认为1，就是每个月的1号，把它设置为0时， new Date()会返回上一个月的最后一天，然后通过getDate()方法得到天数
    for (let i = 1; i <= days; i++) {
        a.setDate(i) // 设置月份的日期
        let d = a.getDay(); // 获取星期几。 返回0 到 6星期日为 0、星期六为 6。
        if (d > 0 && d < 6) {
            let minutes = randomMinuteNum()
            let seconds = randomMinuteNum()
            let hour = 10
            let res = moment(a)
                // .minutes(minutes)
                .hour(hour)//时
                .minute(minutes)
                .seconds(seconds)
                .format('YYYY.MM.DD HH:mm')
            let res2 = moment(a)
                // .minutes(minutes)
                .hour(hour)//时
                .minute(minutes + randomMinuteNum40())
                .format('-HH:mm')
            list.push(res + res2)
        }
    }

    //获取当年节假日列表
    let holidays = await getHolidays(year)
    //过滤当年节假日
    if (holidays) {
        list = list.filter(item => !holidays.find(key => item.includes(key)))
    }
 
    return list

}

