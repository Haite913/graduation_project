import pandas as pd

#EMA计算公式
def EMA(data, window):
    return data.ewm(span=window, min_periods=window, adjust=False).mean()

#MACD计算公式
def MACD(close, short=12, long=26, mid=9):
    dif = EMA(close, short) - EMA(close, long)
    dea = EMA(dif, mid)
    macd = (dif - dea) * 2
    return dif, dea, macd
