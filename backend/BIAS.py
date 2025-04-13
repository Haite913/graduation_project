import pandas as pd
import numpy as np


def BIAS(df, period):
    """
    计算乖离率指标(BIAS)
    :param df: 包含价格数据的 DataFrame，需包含'收盘价'
    :param period: 计算周期，默认为6
    :return: BIAS 值
    """
    # 初始化结果列表
    bias_values = [None] * len(df)
    ma_values = [None] * len(df)  # 收盘价的移动平均

    # 计算移动平均(MA)
    for i in range(period - 1, len(df)):
        # 计算收盘价的移动平均
        ma = sum(df['收盘价'][i - period + 1:i + 1]) / period
        ma_values[i] = ma

        # 计算BIAS
        if ma != 0:
            bias = (df['收盘价'][i] - ma) / ma * 100
        else:
            bias = 0  # 处理MA为0的情况
        bias_values[i] = bias

    df[f'BIAS_{period}'] = bias_values
    return df[f'BIAS_{period}']