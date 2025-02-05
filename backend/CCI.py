import pandas as pd
import numpy as np

# CCI 计算函数
# CCI 计算函数
def CCI(df, period=14):
    """
    计算商品通道指数（CCI）
    :param df: 包含价格数据的 DataFrame
    :param period: 计算周期，默认为 14
    :return: CCI 值
    """
    # 初始化结果列表
    cci_values = [None] * len(df)  # CCI值
    tp_values = [None] * len(df)  # 典型价格
    sma_tp_values = [None] * len(df)  # TP的简单平均值
    mad_values = [None] * len(df)  # 平均绝对偏差

    # 计算典型价格（TP）
    for i in range(len(df)):
        tp_values[i] = (df['最高价'][i] + df['最低价'][i] + df['收盘价'][i]) / 3.0

    # 计算MA(TP, n)和MD
    for i in range(period - 1, len(df)):
        # 计算MA(TP, n)
        sma_tp = sum(tp_values[i - period + 1:i + 1]) / period
        sma_tp_values[i] = sma_tp

        # 计算MD
        abs_deviations = [abs(tp_values[j] - sma_tp) for j in range(i - period + 1, i + 1)]
        mad = sum(abs_deviations) / period
        mad_values[i] = mad

        # 计算CCI
        if mad != 0:  # 防止除以零
            cci = (tp_values[i] - sma_tp) / (mad * 0.015)
        else:
            cci = 0  # 如果MD为0，CCI无意义，可以设为0或其他默认值
        cci_values[i] = cci

    # 将结果添加到DataFrame中
    df['CCI'] = cci_values

    return df['CCI']

# 示例使用
# 假设我们有一个包含股票价格数据的 DataFrame `df`
# df = pd.read_csv('stock_prices.csv')  # 读取股票价格数据
# cci_values = CCI(df, period=14)  # 计算 CCI
# print(cci_values)  # 输出 CCI 值