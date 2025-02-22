import pandas as pd
import numpy as np

# CCI 计算函数
# CCI 计算函数
def CCI(df, period=14):
    """
    计算商品通道指数（CCI）
    :param df: 包含价格数据的 DataFrame，需包含'最高价', '最低价', '收盘价'
    :param period: 计算周期，默认为14
    :return: CCI 值
    """
    # 初始化结果列表
    cci_values = [None] * len(df)
    tp_values = [None] * len(df)  # 典型价格
    ma_values = [None] * len(df)  # 典型价格的移动平均
    mad_values = [None] * len(df)  # 典型价格与MA的平均偏差

    # 计算典型价格（TP）
    for i in range(len(df)):
        tp_values[i] = (df['最高价'][i] + df['最低价'][i] + df['收盘价'][i]) / 3.0

    # 计算MA（典型价格的N日平均）和MD
    for i in range(period - 1, len(df)):
        # 计算典型价格的移动平均
        ma = sum(tp_values[i - period + 1:i + 1]) / period
        ma_values[i] = ma

        # 计算典型价格与MA的平均偏差（MD）
        abs_deviations = [abs(tp_values[j] - ma) for j in range(i - period + 1, i + 1)]
        mad = sum(abs_deviations) / period
        mad_values[i] = mad

        # 计算CCI
        if mad != 0:
            cci = (tp_values[i] - ma) / (mad * 0.015)
        else:
            cci = 0  # 处理MD为0的情况
        cci_values[i] = cci

    df['CCI'] = cci_values
    return df['CCI']