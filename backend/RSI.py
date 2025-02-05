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
