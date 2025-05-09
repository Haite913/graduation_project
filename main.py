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
from backend.BIAS import BIAS  # 从 MACD.py 文件导入 MACD 函数
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

#根据不同的股票类型截取股票代码
#参数：股票代码
#返回:截取后的股票代码
def process_stock_code(stock_code):
    """根据股票代码前缀处理不同市场的代码"""
    # 港股处理（例如 HK:00379 → 00379）
    if stock_code.startswith("HK:"):
        return stock_code[3:]

    # 美股处理（例如 NASDAQ:NVVE → NVVE）
    us_exchanges = ["NASDAQ", "NYSE", "AMEX"]  # 可根据需要添加其他交易所
    for exchange in us_exchanges:
        prefix = f"{exchange}:"
        if stock_code.startswith(prefix):
            return stock_code[len(prefix):]

    # 默认处理（沪深及其他市场）：移除所有冒号（例如 SH::600000 → SH600000）
    return re.sub(r":", "", stock_code)

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
    end_date = datetime.strptime(end_date, '%Y-%m-%d')
    end_date = end_date + timedelta(days=1)
    end_date = end_date.strftime('%Y-%m-%d')

    start_date = datetime.strptime(start_date, '%Y-%m-%d')
    # start_date = start_date - timedelta(days=1)
    start_date = start_date.strftime('%Y-%m-%d')
    start_date_s = convert_date_to_timestamp(start_date);

    stock_code = process_stock_code(stock_code)  # 替换原来的 re.sub 逻辑

    if not stock_code:
        return jsonify({"error": "缺少股票代码参数"}), 400

    headers = {
        'Cookie': 'cookiesu=661734449097288; device_id=d5e0c443eea36ebfa394fe87f641040e; s=as1cbvpcls; xq_a_token=bd02ed0e9fd02694f81b4046cc844be57135cabd; xqat=bd02ed0e9fd02694f81b4046cc844be57135cabd; xq_r_token=cc9035a969fb35fe50c96767218bdb169509dbe2; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOjY4NTgyMDA0ODUsImlzcyI6InVjIiwiZXhwIjoxNzQ3Nzk3OTU1LCJjdG0iOjE3NDU0MDk0ODYzNTMsImNpZCI6ImQ5ZDBuNEFadXAifQ.FM1nJuYvrirNrqZ6nIPO0_WeOSLBwUS9dJAYXBFnvjDTl-oAox1djG9mSiqA_tI_1HppcWo17b8zgFXDBTh5usDoLGHIMFjyrmO69lYcDAwiu0dFdtkYDJfWeValaEW_xrJ9o6MTopEryPOaJ3P2WXz2OcPOwlaVd-tk86_BW9kPHCB2sfcX6ZMMPREtX9dl_j5sl4qKlw45mIjrgT1c9iHvRtvW5YYkP0DDhosoRgKguOk6DuAPTdYY-K8-gkWhyRjNAMF9K7UmYrikfT3kUoPVETJlSRj1WsNmdKr_lAPtn1oDyQSfdcIttYgr1igFzUXgINyyu3C-qGO7Imkm8A; xq_is_login=1; u=6858200485; is_overseas=0; ssxmod_itna=iqRx9DuD0DR0i=3i7G7YXxqiK+8DB0DBP01DpxYK0C8DLxn4qGdYRk+WDyQGECEGoyqrqQGqDsWK4iNDAZ40iDCbnLxsWGuitGWjmmrt4W0rGh+m3049y2qKtKTOCds6Ct=FrYexB3DExGkYQ+5+Diibx0rD0eDPxDYDGRhDneDexDdi8gpi4GWbAhoDlFGb4Daa4i3ifYDRoxD0cnsDQI3TfDDBEGX3Bx4snSpVZfo94D1YCEHi4G1fD0HNY64i3MnaL0IHRjHLzm+mb3DvxDkIDoDoPA6RQOvL34qqCWZ+mPqsYRqoc25Y0DWD4Q0D0r1zDHA0/Av042qzDh3W/0rPxDW+0DwBGlODebewuCEw1UTK+GsQDtQDx/w45o5YBYqgxWixCgI9CNB75ZB4rGD30YNGD57DgD4wiseiDD; ssxmod_itna2=iqRx9DuD0DR0i=3i7G7YXxqiK+8DB0DBP01DpxYK0C8DLxn4qGdYRk+WDyQGECEGoyqrqQY4DWeEBBwANWAD7pQ3IUm25DlaZpn4OpF1it4GpKd34eOa5ZP+nqR4R=PBfu+E/vnKRRY5y7AfP/qU7UTtKQi0MFk0SzY6cnEUe=jtKIeQKshrlAGLD2kDy3PxgtTfYIu6rHLnHz=LUeQfxaG97ceh5AaT2Q0yHmW3lzgn=o/9BAaRTHM6n8KgENIroNIGEW9hAK1Bzw3kKAPxjMzkzpdID=t8eCvS5Gw0AT0=51FTntzGuF56QijBwxRaQSnEK9D+PCK0x5DsfahYFGmF5nc9IBxwH1bux6iWQKPnaWf4Pz+u7KPgqXDEWKo6F+oTTgSbEQI=vE2BA5uhFtqn/T/+b4laZfo7FgrPOru2FAEPYDrFn5iDttoP306/yWf3pGEFaHHh4pYmNUpxneeGGO/ASWLYqPt/H5YE4iEF=qFe2aaGY/MacxNzBP+DxWGr/Ms5xPDjDD',
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
                    date_obj = datetime.fromtimestamp(timestamp_s, tz)
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
    fast = request.args.get('fast', default=None, type=int)
    slow = request.args.get('slow', default=None, type=int)
    signal = request.args.get('signal', default=None, type=int)
    file_path = current_directory+selectedFile
    df = pandas.read_csv(file_path)

    # 确保收盘价是数值类型
    df['收盘价'] = pandas.to_numeric(df['收盘价'], errors='coerce')

    # 计算 MACD
    close_series = df['收盘价']  # 确保删除任何 NaN 值
    dif, dea, macd = MACD(close_series,fast,slow,signal)

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
    period = request.args.get('period', default=None, type=int)
    file_path = current_directory + selectedFile
    df = pandas.read_csv(file_path)

    # 确保收盘价、最高价和最低价是数值类型
    df['收盘价'] = pandas.to_numeric(df['收盘价'], errors='coerce')
    df['最高价'] = pandas.to_numeric(df['最高价'], errors='coerce')
    df['最低价'] = pandas.to_numeric(df['最低价'], errors='coerce')

    # 计算 KDJ
    k, d, j = KDJ(df,period)

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

    period = request.args.get('period', default=None, type=int)

    # 计算 RSI
    rsi = RSI(df, period)  # 默认周期为14

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
    period = request.args.get('period', default=None, type=int)
    file_path = current_directory + selectedFile
    df = pandas.read_csv(file_path)

    # 确保价格列是数值类型
    df['最高价'] = pandas.to_numeric(df['最高价'], errors='coerce')
    df['最低价'] = pandas.to_numeric(df['最低价'], errors='coerce')
    df['收盘价'] = pandas.to_numeric(df['收盘价'], errors='coerce')

    # 计算 CCI
    cci = CCI(df, period)  # 默认周期为 20

    # 将 NaN 值替换为 None
    cci = [None if pandas.isna(x) else x for x in cci]

    # 创建响应数据
    response_data = {
        'CCI': cci,
        'TIME': df['时间'].dropna().tolist()  # 假设时间列也存在 NaN 值
    }

    # 返回 JSON 响应
    return jsonify(response_data)

@app.route('/getDataBIAS', methods=['GET'])
def getDataBIAS():
    # 获取当前工作目录
    current_directory = os.getcwd()
    current_directory = current_directory + "/stock_data/"
    # 从CSV文件中读取数据
    selectedFile = request.args.get('selectedFile', default=None, type=str)
    period = request.args.get('period', default=6, type=int)  # 默认6日BIAS
    file_path = current_directory + selectedFile
    df = pandas.read_csv(file_path)

    # 确保收盘价是数值类型
    df['收盘价'] = pandas.to_numeric(df['收盘价'], errors='coerce')

    # 计算BIAS
    bias = BIAS(df, period)

    # 将NaN值替换为None
    bias = [None if pandas.isna(x) else x for x in bias]

    # 创建响应数据
    response_data = {
        'BIAS': bias,
        'TIME': df['时间'].dropna().tolist()  # 假设时间列也存在NaN值
    }

    # 返回JSON响应
    return jsonify(response_data)

@app.route('/getStockPrice', methods=['GET'])
def get_stock_price():
    # 获取当前工作目录
    current_directory = os.getcwd()
    current_directory = current_directory + "/stock_data/"
    # 从 CSV 文件中读取数据
    selectedFile = request.args.get('selectedFile', default=None, type=str)
    file_path = current_directory + selectedFile
    df = pandas.read_csv(file_path)

    # 确保价格列是数值类型
    df['收盘价'] = pandas.to_numeric(df['收盘价'], errors='coerce')

    # 创建响应数据
    response_data = {
        'closePrices': df['收盘价'].dropna().tolist(),
        'times': df['时间'].dropna().tolist()  # 假设时间列也存在 NaN 值
    }

    # 返回 JSON 响应
    return jsonify(response_data)


@app.route('/deleteCsvFile', methods=['DELETE'])
def delete_csv_file():
    filename = request.args.get('filename')
    current_directory = os.getcwd()
    current_directory = current_directory + "/stock_data/"
    if not filename:
        return jsonify({'error': 'Missing filename'}), 400

    file_path = os.path.join(current_directory, filename)

    try:
        if os.path.exists(file_path):
            os.remove(file_path)
            return jsonify({'message': 'File deleted successfully'})
        else:
            return jsonify({'error': 'File not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# 启动一个本地开发服务器，激活该网页
app.run(host='localhost', port=5000, debug=True)
