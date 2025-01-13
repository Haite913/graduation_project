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