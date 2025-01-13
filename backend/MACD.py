import pandas as pd

#MACD计算公式
def MACD(data):
    # 初始化EMA(12)、EMA(26)、DIF、DEA、MACD列表，初始值均为0
    ema_12 = [0]
    ema_26 = [0]
    dif = [0]
    dea = [0]
    macd = [0]

    # 遍历收盘价数据，从第二个数据开始计算
    for i in range(1, len(data)):
        # 计算EMA(12)
        ema_12.append(2 * data[i] / (12 + 1) + 11 * ema_12[i - 1] / (12 + 1))
        # 计算EMA(26)
        ema_26.append(2 * data[i] / (26 + 1) + 25 * ema_26[i - 1] / (26 + 1))
        # 计算DIF
        dif.append(ema_12[i] - ema_26[i])
        # 计算DEA
        dea.append(2 / (9 + 1) * dif[i] + 8 / (9 + 1) * dea[i - 1])
        # 计算MACD
        macd.append(2 * (dif[i] - dea[i]))

    return dif, dea, macd
