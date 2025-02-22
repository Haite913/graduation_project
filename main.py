# 调入元素
import csv
import pandas
import requests
import os
from flask import Flask
from datetime import datetime, timedelta
from flask import request, jsonify
from backend.MACD import MACD  # 从 MACD.py 文件导入 MACD 函数
from backend.KDJ import KDJ  # 从 MACD.py 文件导入 MACD 函数
from backend.RSI import RSI  # 从 MACD.py 文件导入 MACD 函数
from backend.CCI import CCI  # 从 MACD.py 文件导入 MACD 函数
from datetime import datetime, timezone, timedelta
import re
import tushare as ts

# 用当前脚本名称实例化Flask对象，方便flask从该脚本文件中获取需要的内容
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False  # 明确设置JSON编码时不将非ASCII字符转义，等同于json.dumps的ensure_ascii=False效果
app.config['JSONIFY_MIMETYPE'] = 'application/json; charset=utf-8'  # 设置返回JSON数据的MIME类型及编码为UTF-8

# 为发来的请求设置请求头，防止跨域请求错误
@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

#时间格式转换，将%Y-%m-%d转换成毫秒级时间戳格式
def convert_date_to_timestamp(date_str, date_format='%Y-%m-%d'):
    # 将日期字符串解析为 datetime 对象
    date_obj = datetime.strptime(date_str, date_format)

    # 将 datetime 对象转换为毫秒级时间戳
    timestamp = int(date_obj.timestamp() * 1000)

    return timestamp

#获取本地的以.csv为后缀的文件列表
#参数：无
#返回:.csv文件列表
@app.route('/getCsvFile', methods=['GET'])
def getCsvFile():
    # 获取当前工作目录
    current_directory = os.getcwd()
    current_directory = current_directory+"/stock_data"

    # 列出当前目录中的所有文件和文件夹
    files_and_directories = os.listdir(current_directory)

    # 筛选出所有 .csv 文件
    csv_files = [file for file in files_and_directories if file.endswith('.csv')]

    # 返回 JSON 响应
    return {'csv_files': csv_files}

#根据股票代码，起始日期，结束日期从雪球网获取股票数据
#参数：code(股票代码),start(起始时间),end(结束时间)
#返回: 股票数据
@app.route('/getDayData', methods=['GET'])
def getDayData():
    # 获取用户提供的股票代码
    # 从请求中获取查询参数
    stock_code = request.args.get('code', default=None, type=str)
    start_date = request.args.get('start', default=None, type=str)
    end_date = request.args.get('end', default=None, type=str)
    start_date = datetime.strptime(start_date, '%Y-%m-%d')
    start_date = start_date - timedelta(days=1)
    start_date = start_date.strftime('%Y-%m-%d')
    start_date_s = convert_date_to_timestamp(start_date);

    stock_code = re.sub(r"[::]", "", stock_code)

    if not stock_code:
        return jsonify({"error": "缺少股票代码参数"}), 400

    headers = {
        'Cookie': 'cookiesu=661734449097288; device_id=d5e0c443eea36ebfa394fe87f641040e; s=as1cbvpcls; xq_is_login=1; u=6858200485; xq_a_token=ebd287477080ef7f38a2f48557cd9f7383674046; xqat=ebd287477080ef7f38a2f48557cd9f7383674046; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOjY4NTgyMDA0ODUsImlzcyI6InVjIiwiZXhwIjoxNzQxNTY5MTU2LCJjdG0iOjE3Mzg5NzcxNTY5NjIsImNpZCI6ImQ5ZDBuNEFadXAifQ.EpIJojXQks6EhwvRn0CZUxth_JjT61XQDJrYj7QGJtT9JOw5h9Tcm6cSfVPWSd13chKq0i4vVPrjROIDT5FCl1YUWXYp8ikR-015ZMEIGklyo474qi2IhcbRXfqThiXqaxzXDsXGgRznE31NP0vU9dtCGodG3zLuR1ry-X7vlDmbwffqllIm4e34NfGqRPAvcIRBBaooZ_K6dt_1MNyy7-HBNTbLEQerLLUmDkVfKekCMXawVTF0oD_OofLksl92bSNH-RDSTaInomc4nIKOqEH2WF1jkYZEgTmgqL-sOvIvKax5U_6sP8UoNopbf0hOKVx4Sg1ihPdt5eFT0JrmWg; xq_r_token=60450ee73183b954f5c20c698672b87ea25cc209; is_overseas=0; ssxmod_itna=iqfOBKYKiKDIQxl8xCErH2nOlDgGB6mDQuGFqhKDsofDSxGKidDqxBWnlDDt=T=FiYPhaqoErWwF=l68xDkKjRqnpuKx1cje+tAo4GLDmKDyYpoxnYD4SKGwD0eG+DD4DW7qAoDexGpS9wXSDi3D4qDRDAQDzLjMDG3ZDYpSzqDgQeDB+OQDKqGg0LxD0LhTsD3bBEb/KMbPZeDSYhNYfqDMDPGXY7yKfTTzZ6xDgLFYICpy7mrDtqD9WjtDbfQNEDNxvC+EFBmsFGvY3fmeBxmKYrfYYgDbKRPBcAGqeReAbd+sB5DAl7CLox4D; ssxmod_itna2=iqfOBKYKiKDIQxl8xCErH2nOlDgGB6mDQuGFqxikfkqzDl6D7qo03m=DB7MKqnR+z9Yi4Fik=0=MB6edhZWgIP5vOTHwxevEMinm9ArDjbbap+u7S4GVpA2449lnY9WUF61DHwwkvweI/2oCfbohFAqO4wGfeS6ZbG2YogLvfCGRjOKR0kx1tnI6KiTp9SQ7tPvXFpewQqvosbYxa=QYYqRei1R1X3vksqanjg6DZTEylANybY0O=IhIaKtcAegw0WYBYMv6QTuXqdcsIL9f+eZc0EOhRzdIo2yzf=gzBO/kHBIG=MEGxiM6XzxIemXo=P+1LeCpPDeUcNVeoLEN4cw4+m3t2kYXnZmlOmYxjMYK+0UvWGdhLq4wkQp+jECgbE=31jo4ewnjxVjp3Oes90r=NXcXLErOE6hlfVnUPhW1QAehq2pK+SQ+B5YcXfQvdfXkGmWgTnowOj6SgxY3eW2rzn9I0vjPeg9jp2oMz0rpH/lN61PuQrIo9NK98=EwOj/h7Y7j8obR+XeA4DQ9xRo8iexApH9qIw469CNG0F3rIPqxU4eBPrlDT8jCU+t79QerWinxBxAz4Ct0xiq6R67nxXk0xD08DijKYD==',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36 Edg/131.0.0.0',
    }

    # 构建API请求URL
    url = f'https://stock.xueqiu.com/v5/stock/chart/kline.json?symbol={stock_code}&begin={start_date_s}&period=day&type=before&count=1000000&indicator=kline,pe,pb,ps,pcf,market_capital,agt,ggt,balance&md5__1632=n4mxuiiti%3DDQ0%3D6KGN3YIvxGwKiq0INLIe6Xodx'

    try:
        response = requests.get(url=url, headers=headers)
        response.raise_for_status()  # 检查请求是否成功
        json_data = response.json()

        # 解析数据
        if 'data' in json_data and 'item' in json_data['data']:
            kline_data = json_data['data']['item']
            columns = json_data['data']['column']
            content_list = []
            csv_filename = f'{stock_code}.csv'

            file_path = 'stock_data/'+csv_filename

            with open(file_path, mode='w', newline='', encoding='utf-8') as csvfile:
                writer = csv.DictWriter(csvfile, fieldnames=[
                    '时间', '成交量', '开盘价', '最高价', '最低价', '收盘价', '涨跌额', '涨跌幅', '换手率', '成交额',
                    '市盈率', '市净率', '市销率', '市现率', '市值', '资金流向'
                ])
                writer.writeheader()
                # 设置东八区时区
                tz = timezone(timedelta(hours=8))

                for item in kline_data:
                    data_dict = dict(zip(columns, item))
                    current_timestamp = data_dict['timestamp']
                    # 将毫秒级时间戳转换为秒
                    timestamp_s = current_timestamp / 1000.0
                    # 将时间戳转换为 datetime 对象
                    date_obj = datetime.fromtimestamp(timestamp_s, tz) + timedelta(days=1)
                    # 格式化 datetime 对象为 '年-月-日' 格式
                    formatted_date = date_obj.strftime('%Y-%m-%d')
                    if(formatted_date < end_date):
                        row = {
                            '时间': formatted_date,
                            '成交量': data_dict['volume'],
                            '开盘价': data_dict['open'],
                            '最高价': data_dict['high'],
                            '最低价': data_dict['low'],
                            '收盘价': data_dict['close'],
                            '涨跌额': data_dict['chg'],
                            '涨跌幅': data_dict['percent'],
                            '换手率': data_dict['turnoverrate'],
                            '成交额': data_dict['amount'],
                            '市盈率': data_dict['pe'],
                            '市净率': data_dict['pb'],
                            '市销率': data_dict['ps'],
                            '市现率': data_dict['pcf'],
                            '市值': data_dict['market_capital'],
                            '资金流向': data_dict['balance']
                            }
                        writer.writerow(row)
                        content_list.append(row)
            return jsonify(content_list)
        else:
            return jsonify({"error": "未找到相关数据"}), 404

    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 500

#根据股票代码，起始日期，结束日期从雪球网获取股票数据
#参数：selectedFile(选择文件)
#返回: MACD三个指标
@app.route('/getDataMACD', methods=['GET'])
def getDataMACD():
    # 获取当前工作目录
    current_directory = os.getcwd()
    current_directory = current_directory+"/stock_data/"
    # 从 CSV 文件中读取数据
    selectedFile = request.args.get('selectedFile', default=None, type=str)
    file_path = current_directory+selectedFile
    df = pandas.read_csv(file_path)

    # 确保收盘价是数值类型
    df['收盘价'] = pandas.to_numeric(df['收盘价'], errors='coerce')

    # 计算 MACD
    close_series = df['收盘价']  # 确保删除任何 NaN 值
    dif, dea, macd = MACD(close_series)

    # 将 NaN 值替换为 None
    dif = [0 if pandas.isna(x) or x != x else x for x in dif]  # x != x 是检查 NaN 的一种方式
    dea = [0 if pandas.isna(x) or x != x else x for x in dea]
    macd = [0 if pandas.isna(x) or x != x else x for x in macd]

     # 创建响应数据
    response_data = {
        'DIF': dif,
        'DEA': dea,
        'MACD': macd,
        'TIME': df['时间'].dropna().tolist()  # 假设时间列也存在 NaN 值
    }

    # 返回 JSON 响应
    return jsonify(response_data)

@app.route('/getDataKDJ', methods=['GET'])
def getDataKDJ():
    # 获取当前工作目录
    current_directory = os.getcwd()
    current_directory = current_directory + "/stock_data/"
    # 从 CSV 文件中读取数据
    selectedFile = request.args.get('selectedFile', default=None, type=str)
    file_path = current_directory + selectedFile
    df = pandas.read_csv(file_path)

    # 确保收盘价、最高价和最低价是数值类型
    df['收盘价'] = pandas.to_numeric(df['收盘价'], errors='coerce')
    df['最高价'] = pandas.to_numeric(df['最高价'], errors='coerce')
    df['最低价'] = pandas.to_numeric(df['最低价'], errors='coerce')

    # 计算 KDJ
    k, d, j = KDJ(df)

    # 将 NaN 值替换为 None
    k = [None if pandas.isna(x) else x for x in k]
    d = [None if pandas.isna(x) else x for x in d]
    j = [None if pandas.isna(x) else x for x in j]

    # 创建响应数据
    response_data = {
        'K': k,
        'D': d,
        'J': j,
        'TIME': df['时间'].dropna().tolist()  # 假设时间列也存在 NaN 值
    }

    # 返回 JSON 响应
    return jsonify(response_data)
# RSI = （近期涨幅平均值 /  近期跌幅平均值）× 100
@app.route('/getDataRSI', methods=['GET'])
def getDataRSI():
    # 获取当前工作目录
    current_directory = os.getcwd()
    current_directory = current_directory + "/stock_data/"
    # 从 CSV 文件中读取数据
    selectedFile = request.args.get('selectedFile', default=None, type=str)
    file_path = current_directory + selectedFile
    df = pandas.read_csv(file_path)

    # 确保收盘价是数值类型
    df['收盘价'] = pandas.to_numeric(df['收盘价'], errors='coerce')

    # 计算 RSI
    rsi = RSI(df, period=14)  # 默认周期为14

    # 将 NaN 值替换为 None
    rsi = [None if pandas.isna(x) else x for x in rsi]

    # 创建响应数据
    response_data = {
        'RSI': rsi,
        'TIME': df['时间'].dropna().tolist()  # 假设时间列也存在 NaN 值
    }

    # 返回 JSON 响应
    return jsonify(response_data)

@app.route('/getDataCCI', methods=['GET'])
def getDataCCI():
    # 获取当前工作目录
    current_directory = os.getcwd()
    current_directory = current_directory + "/stock_data/"
    # 从 CSV 文件中读取数据
    selectedFile = request.args.get('selectedFile', default=None, type=str)
    file_path = current_directory + selectedFile
    df = pandas.read_csv(file_path)

    # 确保价格列是数值类型
    df['最高价'] = pandas.to_numeric(df['最高价'], errors='coerce')
    df['最低价'] = pandas.to_numeric(df['最低价'], errors='coerce')
    df['收盘价'] = pandas.to_numeric(df['收盘价'], errors='coerce')

    # 计算 CCI
    cci = CCI(df, period=14)  # 默认周期为 20

    # 将 NaN 值替换为 None
    cci = [None if pandas.isna(x) else x for x in cci]

    # 创建响应数据
    response_data = {
        'CCI': cci,
        'TIME': df['时间'].dropna().tolist()  # 假设时间列也存在 NaN 值
    }

    # 返回 JSON 响应
    return jsonify(response_data)

# 启动一个本地开发服务器，激活该网页
app.run(host='localhost', port=5000, debug=True)
