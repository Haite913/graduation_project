# graduation_project
毕业设计——量化投资中的择时策略研究

前端:REACT+MUI
后端:flask

问题1:通过选择文件夹路径，选择股票数据存放地址，浏览器安全限制，不能获取文件夹完整路径
问题2:传递起始时间与爬取到数据的起始时间不同

MACD计算方式1：

```python
#EMA计算公式
def EMA(data, window):
    return data.ewm(span=window, min_periods=window, adjust=False).mean()

#MACD计算公式
def MACD(close, short=12, long=26, mid=9):
    dif = EMA(close, short) - EMA(close, long)
    dea = EMA(dif, mid)
    macd = (dif - dea) * 2
    return dif, dea, macd
```

问题：将近前30个交易日的数据为0

MACD计算方式2：

```
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