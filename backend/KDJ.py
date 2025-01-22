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
