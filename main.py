import csv
from io import BytesIO
from flask import request, jsonify

import pandas
import requests
from flask import Flask, jsonify
from datetime import datetime, timezone, timedelta
import pytz
from flask import request, make_response



# 用当前脚本名称实例化Flask对象，方便flask从该脚本文件中获取需要的内容
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False  # 明确设置JSON编码时不将非ASCII字符转义，等同于json.dumps的ensure_ascii=False效果
app.config['JSONIFY_MIMETYPE'] = 'application/json; charset=utf-8'  # 设置返回JSON数据的MIME类型及编码为UTF-8
@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

def convert_date_to_timestamp(date_str, date_format='%Y-%m-%d'):
    # 将日期字符串解析为 datetime 对象
    date_obj = datetime.strptime(date_str, date_format)

    # 将 datetime 对象转换为 UTC 时间（如果需要）
    # date_obj = date_obj.replace(tzinfo=timezone.utc)

    # 将 datetime 对象转换为毫秒级时间戳
    timestamp = int(date_obj.timestamp() * 1000)

    return timestamp



@app.route('/getDayData', methods=['GET'])
def getDayData():
    # 获取用户提供的股票代码
    # 从请求中获取查询参数
    stock_code = request.args.get('code', default='VNCE', type=str)
    start_date = request.args.get('start', default=None, type=str)
    start_date = convert_date_to_timestamp(start_date);

    print(stock_code)
    print(start_date)

    if not stock_code:
        return jsonify({"error": "缺少股票代码参数"}), 400

    headers = {
        'Cookie': 'cookiesu=241734160142476; Hm_lvt_1db88642e346389874251b5a1eded6e3=1734160144; HMACCOUNT=F9A8A95BFDD29F91; device_id=f209dddad001c71ee26c2dc5056fad28; s=c517hylvp6; remember=1; xq_a_token=dc4fdfadb4b723d23d9ea7b07aced7a167d0a59d; xqat=dc4fdfadb4b723d23d9ea7b07aced7a167d0a59d; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOjEzMzA2Mzc5NTgsImlzcyI6InVjIiwiZXhwIjoxNzM2NzUyMjQxLCJjdG0iOjE3MzQxNjAyNDE4MzcsImNpZCI6ImQ5ZDBuNEFadXAifQ.WIlg9FHvMYs3o8IO0Y6DaMcGHZxWfPufNAyZCpyH6Ysk1QUGuKRDG49wpSfJ_dYq7aC7BFPRyEL5IchiUGz0Pk0V__qWBM3mAM94vIurKJKS3eitsKm8pDDDHcd6EeEurVcPpaXQ-_ffbBmd2EnfYv8ON50Y3vehBS4sk2nGL5ouPmvIXnRPTwc1QXIDLpPOCfXH5pDflj1IHLLQxBO502W22wlJ9gegpXvzscbdAKtph0K5OREV7ADPxtQPJ7LwkzPBi8GAOJPxANQtLnzFnOCsaNNQ-6imB80d29s9OYz937tD6BoI58fJ7PItiwvU8167esTUs0xiTmQ34Q1w_Q; xq_r_token=6a057c19f15db7195f78a3844b52ed7a45812d50; xq_is_login=1; u=1330637958; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1734184567; ssxmod_itna=YqAx2DBGi=DQqY5e0Lx0pI1Q=GkDuCD7uu44mYpru45DsK6DSxGKidDqxBnm=xbw3p760pwNCF77GdoQwcGGdKiCZEwLGKIDAoDhx7QDox0=DnxAQDj2oYGGnxBYDQxAYDGDDPyDGwX8nDGpMGwtlB4=ulb6MDi3nYqDRiqDgfeD1YnNDXwLxUqDAAeGyKeGfYqGgBq=0DY=DQuan+ltDjfRW11WRDYPH+knrxBQtdqQdnLXViLyo/AxL43AxAAYq/YxYYAhNehDtnUwfk7MoiODFKVw=9RDyvAxU4beteD=; ssxmod_itna2=YqAx2DBGi=DQqY5e0Lx0pI1Q=GkDuCD7uu44mYpru4D1D6cD0Hd07Ps=+hYR=DL7BTvsq8DEYhCMYnui0hPNKCvXsY9PC03A18Db9TjsnR6TNGY/ln0FReFDxRv0HHHIjxBDFqG7=eD=',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36 Edg/131.0.0.0',
    }

    # 构建API请求URL
    url = f'https://stock.xueqiu.com/v5/stock/chart/kline.json?symbol={stock_code}&begin={start_date}&period=day&type=before&count=-284&indicator=kline,pe,pb,ps,pcf,market_capital,agt,ggt,balance&md5__1632=n4%2BxnD0DcD9DRADgGiD%2Fje0%3DGOQIYxDtOQOoae4D'

    try:
        response = requests.get(url=url, headers=headers)
        response.raise_for_status()  # 检查请求是否成功
        json_data = response.json()

        print(json_data)

        # 解析数据
        if 'data' in json_data and 'item' in json_data['data']:
            kline_data = json_data['data']['item']
            columns = json_data['data']['column']
            content_list = []
            csv_filename = f'{stock_code}_daily_data.csv'

            with open(csv_filename, mode='w', newline='', encoding='utf-8') as csvfile:
                writer = csv.DictWriter(csvfile, fieldnames=[
                    '时间', '成交量', '开盘价', '最高价', '最低价', '收盘价', '涨跌额', '涨跌幅', '换手率', '成交额',
                    '市盈率', '市净率', '市销率', '市现率', '市值', '资金流向'
                ])
                writer.writeheader()

                for item in kline_data:
                    data_dict = dict(zip(columns, item))

                    row = {
                        '时间': data_dict['timestamp'],
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

# 启动一个本地开发服务器，激活该网页
app.run(host='localhost', port=5000, debug=True)
