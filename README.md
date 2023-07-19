### node 脚本 该脚本用于 自动生成报销了 发票表

环境 node 16  以上

使用方法

1. 安装node 16 以上版本

2. 进入根目录

3. 执行 yarn    安装依赖 若无先安装 npm i  yarn -g 

4. 打开index.js 文件 拉到最后一行修改以下参数

   ```js 
    
   /**
    * 在这下面修改测试
    * @param {*} name 名字
    * @param {*} num 金额
    * @param {*} month 月份
    * @param {*} years 年份
    * @param {*} section 单项金额区间
    */
     init('郑立峰', 2452, 5, 2023, [250, 300])
   
   
   ```

5. 执行 npm run start

6. 就可以在 发票地址 文件夹中找到  名称-年-月的文件