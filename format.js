 
/**
* 
* @param num 金额
* @param list  时间列表
* @param section [min,max] 单笔面额区间
*/
const format = (num, list, section = [300, 400]) => {
    console.log('list=>',list)
    const random = ([min, max]) => Math.floor((Math.random() * (max - min)) + min)
    let res = list.map((item, i) => {
        let [years, time] = item.split(' ')
        let amount = random(section) 
        if (num == 0) return null 
        if (num - amount < 0) {
            amount = num
        }
        num = num - amount
        return {
            ['No.']: i + 1,
            '日期': years,
            '面额': amount,
            '时间': time,
            'amount': amount,
        }
    })
   
    return {
        list: res.filter(Boolean),
        num: num,
    }

}

export default format

