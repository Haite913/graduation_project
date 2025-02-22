import pandas as pd
import numpy as np

# #RSI计算公式
# def RSI(df, period=14):
#     """
#     计算 RSI 指标
#     :param df: 包含股票数据的 DataFrame，必须包含 '收盘价' 列
#     :param period: 计算周期，默认为 14
#     :return: 返回 RSI 值的列表
#     """
#     # 计算每日涨跌差值
#     delta = df['收盘价'].diff()
#
#     # 计算涨幅和跌幅
#     gain = delta.where(delta > 0, 0)  # 涨幅
#     loss = -delta.where(delta < 0, 0)  # 跌幅
#
#     # 计算平均涨幅和平均跌幅
#     avg_gain = gain.rolling(window=period).mean()
#     avg_loss = loss.rolling(window=period).mean()
#
#     # 计算相对强弱 RS
#     rs = avg_gain / avg_loss
#
#     # 计算 RSI
#     rsi = 100 - (100 / (1 + rs))
#
#     return rsi
#
#
# import pandas as pd
# import numpy as np


def RSI(df, period=14):
    delta = df['收盘价'].diff()
    gain = delta.where(delta > 0, 0.0)
    loss = -delta.where(delta < 0, 0.0)

    # 初始平均值
    avg_gain = gain.rolling(window=period, min_periods=period).mean()
    avg_loss = loss.rolling(window=period, min_periods=period).mean()

    # Wilder平滑法
    for i in range(period, len(df)):
        avg_gain[i] = (avg_gain[i - 1] * (period - 1) + gain[i]) / period
        avg_loss[i] = (avg_loss[i - 1] * (period - 1) + loss[i]) / period

    rs = avg_gain / avg_loss
    rsi = 100 - (100 / (1 + rs))
    return rsi