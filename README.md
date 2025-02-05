# graduation_project
毕业设计——量化投资中的择时策略研究

## 一、技术栈

前端框架:REACT+MUI
后端:FLASK

## 二、开发流程

### 1、搭建前后端框架并进行前后端联调：

- 后端：

安装 Flask

```
pip install flask
```

创建和运行 Flask 应用

可以通过传递参数来改变默认的 IP 和端口：

```python
if __name__ == "__main__":

app.run(host="0.0.0.0", port=8000, debug=True)
```

*host*：绑定的 IP地址    *port*：监听的端口号    *debug*：是否开启调试模式

- 前端：

  React 提供了一个官方工具 Create React App，用于快速搭建 React 项目。

  create-react-app 是来自于 Facebook，通过该命令我们无需配置就能快速构建 React 开发环境。

  create-react-app 自动创建的项目是基于 Webpack + ES6 。

  执行以下命令创建项目：

  ```
  $ cnpm install -g create-react-app
  $ create-react-app my-app
  $ cd my-app/
  $ npm start
  ```

问题1：跨域请求错误

解决方法：

```python
# 为发来的请求设置请求头，防止跨域请求错误
@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response
```

### 2、从雪球网中爬取股票数据并转存为CSV文件：

```python
#根据股票代码，起始日期，结束日期从雪球网获取股票数据
#参数：code(股票代码),start(起始时间),end(结束时间)
#返回: 股票数据
@app.route('/getDayData', methods=['GET'])
def getDayData():
    # 获取用户提供的股票代码
    # 从请求中获取查询参数
    stock_code = request.args.get('code', default=None, type=str)
    start_date = request.args.get('start', default=None, type=str)
    end_date = request.args.get('end', default=None, type=str)
    start_date = datetime.strptime(start_date, '%Y-%m-%d')
    start_date = start_date - timedelta(days=1)
    start_date = start_date.strftime('%Y-%m-%d')
    start_date_s = convert_date_to_timestamp(start_date);

    stock_code = re.sub(r"[::]", "", stock_code)

    if not stock_code:
        return jsonify({"error": "缺少股票代码参数"}), 400

    headers = {
        'Cookie': 'cookiesu=241734160142476; Hm_lvt_1db88642e346389874251b5a1eded6e3=1734160144; HMACCOUNT=F9A8A95BFDD29F91; device_id=f209dddad001c71ee26c2dc5056fad28; s=c517hylvp6; remember=1; xq_a_token=dc4fdfadb4b723d23d9ea7b07aced7a167d0a59d; xqat=dc4fdfadb4b723d23d9ea7b07aced7a167d0a59d; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOjEzMzA2Mzc5NTgsImlzcyI6InVjIiwiZXhwIjoxNzM2NzUyMjQxLCJjdG0iOjE3MzQxNjAyNDE4MzcsImNpZCI6ImQ5ZDBuNEFadXAifQ.WIlg9FHvMYs3o8IO0Y6DaMcGHZxWfPufNAyZCpyH6Ysk1QUGuKRDG49wpSfJ_dYq7aC7BFPRyEL5IchiUGz0Pk0V__qWBM3mAM94vIurKJKS3eitsKm8pDDDHcd6EeEurVcPpaXQ-_ffbBmd2EnfYv8ON50Y3vehBS4sk2nGL5ouPmvIXnRPTwc1QXIDLpPOCfXH5pDflj1IHLLQxBO502W22wlJ9gegpXvzscbdAKtph0K5OREV7ADPxtQPJ7LwkzPBi8GAOJPxANQtLnzFnOCsaNNQ-6imB80d29s9OYz937tD6BoI58fJ7PItiwvU8167esTUs0xiTmQ34Q1w_Q; xq_r_token=6a057c19f15db7195f78a3844b52ed7a45812d50; xq_is_login=1; u=1330637958; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1734184567; ssxmod_itna=YqAx2DBGi=DQqY5e0Lx0pI1Q=GkDuCD7uu44mYpru45DsK6DSxGKidDqxBnm=xbw3p760pwNCF77GdoQwcGGdKiCZEwLGKIDAoDhx7QDox0=DnxAQDj2oYGGnxBYDQxAYDGDDPyDGwX8nDGpMGwtlB4=ulb6MDi3nYqDRiqDgfeD1YnNDXwLxUqDAAeGyKeGfYqGgBq=0DY=DQuan+ltDjfRW11WRDYPH+knrxBQtdqQdnLXViLyo/AxL43AxAAYq/YxYYAhNehDtnUwfk7MoiODFKVw=9RDyvAxU4beteD=; ssxmod_itna2=YqAx2DBGi=DQqY5e0Lx0pI1Q=GkDuCD7uu44mYpru4D1D6cD0Hd07Ps=+hYR=DL7BTvsq8DEYhCMYnui0hPNKCvXsY9PC03A18Db9TjsnR6TNGY/ln0FReFDxRv0HHHIjxBDFqG7=eD=',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36 Edg/131.0.0.0',
    }

    # 构建API请求URL
    url = f'https://stock.xueqiu.com/v5/stock/chart/kline.json?symbol={stock_code}&begin={start_date_s}&period=day&type=before&count=1000000&indicator=kline,pe,pb,ps,pcf,market_capital,agt,ggt,balance&md5__1632=n4%2BxnD0DcD9DRADgGiD%2Fje0%3DGOQIYxDtOQOoae4D'

    try:
        response = requests.get(url=url, headers=headers)
        response.raise_for_status()  # 检查请求是否成功
        json_data = response.json()

        # 解析数据
        if 'data' in json_data and 'item' in json_data['data']:
            kline_data = json_data['data']['item']
            columns = json_data['data']['column']
            content_list = []
            csv_filename = f'{stock_code}.csv'

            file_path = 'stock_data/'+csv_filename

            with open(file_path, mode='w', newline='', encoding='utf-8') as csvfile:
                writer = csv.DictWriter(csvfile, fieldnames=[
                    '时间', '成交量', '开盘价', '最高价', '最低价', '收盘价', '涨跌额', '涨跌幅', '换手率', '成交额',
                    '市盈率', '市净率', '市销率', '市现率', '市值', '资金流向'
                ])
                writer.writeheader()

                for item in kline_data:
                    data_dict = dict(zip(columns, item))
                    current_timestamp = data_dict['timestamp']
                    # 将毫秒级时间戳转换为秒
                    timestamp_s = current_timestamp / 1000.0
                    # 将时间戳转换为 datetime 对象
                    date_obj = datetime.utcfromtimestamp(timestamp_s)
                    # 格式化 datetime 对象为 '年-月-日' 格式
                    formatted_date = date_obj.strftime('%Y-%m-%d')
                    if(formatted_date < end_date):
                        row = {
                            '时间': formatted_date,
                            '成交量': data_dict['volume'],
                            '开盘价': data_dict['open'],
                            '最高价': data_dict['high'],
                            '最低价': data_dict['low'],
                            '收盘价': data_dict['close'],
                            '涨跌额': data_dict['chg'],
                            '涨跌幅': data_dict['percent'],
                            '换手率': data_dict['turnoverrate'],
                            '成交额': data_dict['amount'],
                            '市盈率': data_dict['pe'],
                            '市净率': data_dict['pb'],
                            '市销率': data_dict['ps'],
                            '市现率': data_dict['pcf'],
                            '市值': data_dict['market_capital'],
                            '资金流向': data_dict['balance']
                            }
                        writer.writerow(row)
                        content_list.append(row)
            return jsonify(content_list)
        else:
            return jsonify({"error": "未找到相关数据"}), 404

    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 500
```

问题1：传递起始时间与爬取到数据的起始时间不同

解决方法：如果设置传递的起始时间是周末，而周末又不是交易日，交易日没数据所以爬取数据会有偏差

### 3、获取本地.csv股票数据

```python
#获取本地的以.csv为后缀的文件列表
#参数：无
#返回:.csv文件列表
@app.route('/getCsvFile', methods=['GET'])
def getCsvFile():
    # 获取当前工作目录
    current_directory = os.getcwd()
    current_directory = current_directory+"/stock_data"

    # 列出当前目录中的所有文件和文件夹
    files_and_directories = os.listdir(current_directory)

    # 筛选出所有 .csv 文件
    csv_files = [file for file in files_and_directories if file.endswith('.csv')]

    # 返回 JSON 响应
    return {'csv_files': csv_files}
```

问题1：通过选择文件夹路径，选择股票数据存放地址，浏览器安全限制，不能获取文件夹完整路径

解决方法：固定路径存储，将存储路径写死

### 4、计算MACD指数

```python
import pandas as pd

#MACD计算公式
def MACD(data):
    # 初始化EMA(12)、EMA(26)、DIF、DEA、MACD列表，初始值均为0
    ema_12 = [0]
    ema_26 = [0]
    dif = [0]
    dea = [0]
    macd = [0]

    # 遍历收盘价数据，从第二个数据开始计算
    for i in range(1, len(data)):
        # 计算EMA(12)
        ema_12.append(2 * data[i] / (12 + 1) + 11 * ema_12[i - 1] / (12 + 1))
        # 计算EMA(26)
        ema_26.append(2 * data[i] / (26 + 1) + 25 * ema_26[i - 1] / (26 + 1))
        # 计算DIF
        dif.append(ema_12[i] - ema_26[i])
        # 计算DEA
        dea.append(2 / (9 + 1) * dif[i] + 8 / (9 + 1) * dea[i - 1])
        # 计算MACD
        macd.append(2 * (dif[i] - dea[i]))

    return dif, dea, macd
```

MACD计算公式：

![image-20250125220631357](C:\Users\86189\AppData\Roaming\Typora\typora-user-images\image-20250125220631357.png)

![image-20250125220715402](C:\Users\86189\AppData\Roaming\Typora\typora-user-images\image-20250125220715402.png)

```python
DIF—— 离差值，是快速移动平均线与慢速移动平均线的差

DEA—— 异同平均数，其本质是DIF的移动平均线指。

EMA—— 平滑移动平均线

我们以最常见的参数MACD（12，26，9）为例：

1）快速平滑移动平均线（EMA）是12日的，计算公式为：

EMA(12)=2*今收盘价/(12+1)+11*昨日EMA(12)/(12+1)

2）慢速平滑移动平均线（EMA）是26日的，计算公式为：

EMA(26)=2*今收盘价/(26+1)+25*昨日EMA(26)/(26+1)

3）计算MACD指标

DIF=EMA(12)-EMA(26)

今日DEA(MACD)=2/(9+1)*今日DIF+8/(9+1)*昨日DEA

MACD指标中的柱状线（BAR）的计算公式为：

BAR=2*(DIF-DEA)
```

问题：如果是新股上市首日DIF=0,DEA=0,MACD=0，所以新股上市的一段时间内，MACD指标是毫无意义的。

解决方法：使用时舍弃前两个月指标数据

### 5、计算买入卖出点，并显示MACD数据指标以及买入卖出点

计算买入卖出点：

```python
if(selectedValue1==='MACD'){
setMACDS1(data);
     // 计算买入和卖出点
const buyPoints1 = [];
const sellPoints1 = [];
for (let i = 1; i < data.DIF.length; i++) {
  const prevDIF = data.DIF[i - 1];
  const currDIF = data.DIF[i];
  const prevDEA = data.DEA[i - 1];
  const currDEA = data.DEA[i];

  // 买入条件：DIF 和 DEA 均大于 0，且 DIF 向上突破 DEA
  if (prevDIF < prevDEA && currDIF > currDEA && currDIF > 0 && currDEA > 0) {
     buyPoints1.push({ time: data.TIME[i], type: '买入' });
  }
  // 卖出条件：DIF 和 DEA 均小于 0，且 DIF 向下突破 DEA
  else if (prevDIF > prevDEA && currDIF < currDEA && currDIF < 0 && currDEA < 0) {
    sellPoints1.push({ time: data.TIME[i], type: '卖出' });
  }
  }
  setBuyPoints(buyPoints1);
  setSellPoints(sellPoints1);
  console.log(buyPoints);
  console.log(sellPoints);
}
```

显示指标：

```
{selectedValue1 === 'MACD' && (
<box>
<LineChart
height={400}
open={open1}
series={[
     { data: MACDS1.DEA, label: 'DEA',color:'blue', showMark: false },
     { data: MACDS1.DIF, label: 'DIF',color:'orange', showMark: false },
]}
xAxis={[{ scaleType: 'point', data: MACDS1.TIME }]}
/>
<BarChart
height={400}
open={open1}
series={[
     { data: MACDS1.MACD, label: 'MACD',color:"green"},
]}
xAxis={[{ scaleType: 'band', data: MACDS1.TIME }]}
/>
{/* 添加表格显示买入卖出点 */}
<TableContainer component={Paper} sx={{ mt: 4 }}>
  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
    <TableHead>
      <TableRow>
        <TableCell>时间</TableCell>
        <TableCell align="right">操作类型</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {/* 合并 buyPoints 和 sellPoints，并按时间排序 */}
      {buyPoints.concat(sellPoints)
        .sort((a, b) => new Date(a.time) - new Date(b.time)) // 按时间排序
        .map((point, index) => (
        <TableRow
          key={index}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {point.time}
          </TableCell>
          <TableCell align="right">{point.type}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
</box>
)
}
```

实现效果：

![image-20250125221409978](C:\Users\86189\AppData\Roaming\Typora\typora-user-images\image-20250125221409978.png)

### 6、计算KDJ指标

计算代码：

```python
import pandas as pd
import numpy as np

#MACD计算公式
def KDJ(df, n=9):
    """
    计算KDJ指标
    :param df: 包含股票数据的DataFrame，必须包含'收盘'、'最高'、'最低'列
    :param n: 计算周期，默认为9
    :return: 返回K、D、J三个列表
    """
    # 初始化K、D、J列表
    K = []
    D = []
    J = []

    # 初始化前一日K值和D值
    k_prev = 50
    d_prev = 50

    # 遍历DataFrame计算KDJ值
    for i in range(len(df)):
        if i < n - 1:
            # 如果数据不足n天，无法计算RSV，返回NaN
            K.append(np.nan)
            D.append(np.nan)
            J.append(np.nan)
        else:
            # 计算RSV值
            Cn = df['收盘价'].iloc[i]
            Ln = df['最低价'].iloc[i - n + 1:i + 1].min()
            Hn = df['最高价'].iloc[i - n + 1:i + 1].max()
            if Hn == Ln:  # 防止分母为0
                rsv = 100
            else:
                rsv = (Cn - Ln) / (Hn - Ln) * 100

            # 计算K值
            k = (2 / 3) * k_prev + (1 / 3) * rsv
            K.append(k)

            # 计算D值
            d = (2 / 3) * d_prev + (1 / 3) * k
            D.append(d)

            # 计算J值
            j = 3 * k - 2 * d
            J.append(j)

            # 更新前一日K值和D值
            k_prev = k
            d_prev = d

    return K, D, J
```

计算公式：
指标KDJ的计算并不复杂，首先要计算周期（n日、n周等）的RSV值，即未成熟随机指标值，然后再计算K值、D值、J值等。以日KDJ数值的计算为例，其计算公式为(以9日为周期举例):

n日RSV=（Cn－Ln）÷（Hn－Ln）×100

说明: 公式中，Cn为第n日收盘价；Ln为n日内的最低价；Hn为n日内的最高价。RSV值始终在1—100间波动。

计算K值与D值：

当日K值=2/3×前一日K值＋1/3×当日RSV

当日D值=2/3×前一日D值＋1/3×当日K值

若无前一日K 值与D值，则可分别用50来代替。(当数据足够多的时候,用50代替,到后面不会对指标造成误差)

J指标的计算公式为：

J=3D - 2K

显示代码：

```python
{selectedValue1 === 'KDJ' && (
   <box>
<LineChart
height={400}
open={open1}
series={[
     { data: KDJS1.K, label: 'K',color:'#f6ae42', showMark: false },
     { data: KDJS1.D, label: 'D',color:'#4788c4', showMark: false },
     { data: KDJS1.J, label: 'J',color:'#d25cb3', showMark: false },
]}
    xAxis={[{ scaleType: 'point', data: KDJS1.TIME }]}
/>
   </box>
)
}
```

![image-20250125230002229](C:\Users\86189\AppData\Roaming\Typora\typora-user-images\image-20250125230002229.png)

### 7、计算RSI指标

计算代码：

```python
import pandas as pd
import numpy as np

#RSI计算公式
def RSI(df, period=14):
    """
    计算 RSI 指标
    :param df: 包含股票数据的 DataFrame，必须包含 '收盘价' 列
    :param period: 计算周期，默认为 14
    :return: 返回 RSI 值的列表
    """
    # 计算每日涨跌差值
    delta = df['收盘价'].diff()

    # 计算涨幅和跌幅
    gain = delta.where(delta > 0, 0)  # 涨幅
    loss = -delta.where(delta < 0, 0)  # 跌幅

    # 计算平均涨幅和平均跌幅
    avg_gain = gain.rolling(window=period).mean()
    avg_loss = loss.rolling(window=period).mean()

    # 计算相对强弱 RS
    rs = avg_gain / avg_loss

    # 计算 RSI
    rsi = 100 - (100 / (1 + rs))

    return rsi

```

计算公式：
![image-20250125231758311](C:\Users\86189\AppData\Roaming\Typora\typora-user-images\image-20250125231758311.png)

显示代码：

```python
{selectedValue1 === 'RSI' && (
       <box>
    <LineChart
    height={400}
    open={open1}
    series={[
         { data: RSIS1.RSI, label: 'RSI',color:'#f6ae42', showMark: false },
    ]}
        xAxis={[{ scaleType: 'point', data: RSIS1.TIME }]}
    />
       </box>
    )
    }
```

![image-20250125231901270](C:\Users\86189\AppData\Roaming\Typora\typora-user-images\image-20250125231901270.png)

### 7、计算CCI指标

计算代码：

```python
import pandas as pd
import numpy as np

#RSI计算公式
def RSI(df, period=14):
    """
    计算 RSI 指标
    :param df: 包含股票数据的 DataFrame，必须包含 '收盘价' 列
    :param period: 计算周期，默认为 14
    :return: 返回 RSI 值的列表
    """
    # 计算每日涨跌差值
    delta = df['收盘价'].diff()

    # 计算涨幅和跌幅
    gain = delta.where(delta > 0, 0)  # 涨幅
    loss = -delta.where(delta < 0, 0)  # 跌幅

    # 计算平均涨幅和平均跌幅
    avg_gain = gain.rolling(window=period).mean()
    avg_loss = loss.rolling(window=period).mean()

    # 计算相对强弱 RS
    rs = avg_gain / avg_loss

    # 计算 RSI
    rsi = 100 - (100 / (1 + rs))

    return rsi

```

计算公式：

CCI(n)＝（TP－MA(TP, n)）/（MD＊0.015）

1. n：CCI参数；
2. TP：[典型价格](https://zhida.zhihu.com/search?content_id=236568394&content_type=Article&match_order=1&q=典型价格&zhida_source=entity)；
3. MA(TP, n)：TP的n日简单平均；
4. MD：TP与MA(TP, n)绝对偏差的平均值。

上面的公式很容易查得到，但是很多朋友无论怎么算都无法跟软件上的CCI指标一致。

下面我们以CCI参数n=14演示计算CCI值的详细过程：

1. 计算典型价格（TP）

TP = (今日最高价 + 今日最低价 + 今日收盘价) / 3

2. 计算MD值

![img](https://pic1.zhimg.com/v2-22cef33eeadef51b3140b612023d5948_1440w.jpg)

MD = (|第i-13日TP - 今日的MA(TP,14)| + |第i-12日TP - 今日MA(TP,14)| + ...... + |第i-1日TP - 今日MA(TP,14)| + |第i日TP - 今日MA(TP,14)|) / 14；其中i >= 14。

3.计算CCI

所有的中间值都算出来后，只需要最后一步，计算CCI值：

CCI = (今日TP - 今日MA(TP,14))/今日MD/0.015

显示代码：

```python
{selectedValue1 === 'RSI' && (
       <box>
    <LineChart
    height={400}
    open={open1}
    series={[
         { data: RSIS1.RSI, label: 'RSI',color:'#f6ae42', showMark: false },
    ]}
        xAxis={[{ scaleType: 'point', data: RSIS1.TIME }]}
    />
       </box>
    )
    }
```

![image-20250125232427702](C:\Users\86189\AppData\Roaming\Typora\typora-user-images\image-20250125232427702.png)