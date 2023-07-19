

// import updateFile from "./transferToAliOss";
import fs from "fs";
import { Parser } from "json2csv";
import { convertCsvToXlsx } from "@aternus/csv-to-xlsx";

// import * as R from "ramda";
import format from "./format";
import { getDate } from "./getDate";

const http = require('http');



//写入文件
const writeFile = async (url, body) => await fs.writeFileSync(url, body, console.error);

//删除文件
const unlink = async (url) => await fs.unlinkSync(url)





const csvData = data => {

    const fields = [
        {
            label: 'No.',
            value: 'No.'
        },
        {
            label: '日期',
            value: '日期'
        },
        {
            label: '面额',
            value: '面额'
        },
        {
            label: '时间',
            value: '时间'
        },
        {

            label: '总金额',
            value: '总金额'
        },
        {

            label: '剩余',
            value: '剩余'
        }




    ]

    return new Parser({ fields }).parse(data)
}



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
                    console.log('data====>', data);
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




/**
 * @param {*} name 名字
 * @param {*} num 金额
 * @param {*} month 月份
 * @param {*} years 年份
 * @param {*} section 单项金额区间
 */
const init = async (name, num, month, years = 2023, section = [300, 400]) => {

    try {
        let dateList = await getDate(month, years)

        let res = await format(num, dateList, section)
        writeFile('./data.JSON', JSON.stringify(res, null, 2))

        console.log(res)





        if (res.num > 0) {
            throw '数太大整除不了,请调整最大区间'
        }
        let url = `./发票地址/${name}-${years}-${month}`
        let csv = url + `.csv`
        // let xlsx = url + '.xlsx'
        await writeFile(csv, csvData([...res.list, { 总金额: num, 剩余: res.num }]))
        // await unlink(xlsx).catch(() => { })
        // convertCsvToXlsx(csv, xlsx)
        // await unlink(csv).catch(() => { })
        // writeFile('./文件地址.csv', csvData(list))
    } catch (error) {
        console.log('出错了:', error)

    }


}








/**
 * 在这下面修改测试
 * @param {*} name 名字
 * @param {*} num 金额
 * @param {*} month 月份
 * @param {*} years 年份
 * @param {*} section 单项金额区间
 */
  init('郑立峰', 2452, 5, 2023, [250, 300])




 
 