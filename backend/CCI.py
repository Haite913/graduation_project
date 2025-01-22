import pandas as pd
import numpy as np

# CCI 计算函数
def CCI(df, period=20):
    """
    计算商品通道指数（CCI）
    :param df: 包含价格数据的 DataFrame
    :param period: 计算周期，默认为 20
    :return: CCI 值
    """
    # 计算典型价格（Typical Price）
    df['TP'] = (df['最高价'] + df['最低价'] + df['收盘价']) / 3.0
    # 计算平均典型价格（SMA of TP）
    df['SMA_TP'] = df['TP'].rolling(window=period).mean()
    # 计算平均绝对偏差（Mean Absolute Deviation）
    df['MAD'] = df['TP'].rolling(window=period).apply(lambda x: np.fabs(x - x.mean()).mean(), raw=False)
    # 计算 CCI
    df['CCI'] = (df['TP'] - df['SMA_TP']) / (0.015 * df['MAD'])
    return df['CCI']
