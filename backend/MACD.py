import pandas as pd

#MACD计算公式
def MACD(data, fast, slow, signal):
    """
    计算MACD指标
    :param data: 收盘价数据列表
    :param short_window: 短期EMA周期，默认12
    :param long_window: 长期EMA周期，默认26
    :param dea_window: DEA周期，默认9
    :return: DIF, DEA, MACD 三个列表
    """
    # 初始化EMA(short_window)、EMA(long_window)、DIF、DEA、MACD列表，初始值均为0
    ema_short = [0]
    ema_long = [0]
    dif = [0]
    dea = [0]
    macd = [0]

    # 遍历收盘价数据，从第二个数据开始计算
    for i in range(1, len(data)):
        # 计算短期EMA
        ema_short.append(2 * data[i] / (fast + 1) + (fast - 1) * ema_short[i - 1] / (fast + 1))
        # 计算长期EMA
        ema_long.append(2 * data[i] / (slow + 1) + (slow - 1) * ema_long[i - 1] / (slow + 1))
        # 计算DIF
        dif.append(ema_short[i] - ema_long[i])
        # 计算DEA
        dea.append(2 / (signal + 1) * dif[i] + (signal - 1) / (signal + 1) * dea[i - 1])
        # 计算MACD
        macd.append(2 * (dif[i] - dea[i]))

    return dif, dea, macd