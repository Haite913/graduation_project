import * as React from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { LineChart } from '@mui/x-charts/LineChart';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import CountIcon from './images/count.png';

// 股票数据
const stockData = [
      { code: 'SH:000300', name: '沪深300' },
      { code: 'SH:600519', name: '贵州茅台' },
      { code: 'SH:688256', name: '寒武纪' },
      { code: 'SZ:002371', name: '北方华创' },
      { code: 'SH:688692', name: '武汉达梦' },
      { code: 'SZ:002594', name: '比亚迪' },
      { code: 'SH:688617', name: '惠泰医疗' },
      { code: 'SH:688608', name: '恒玄科技' },
      { code: 'SH:688111', name: '金山办公' },
      { code: 'SZ:300033', name: '同花顺' },
      { code: 'SH:688279', name: '峰岹科技' },
      { code: 'SZ:300750', name: '宁德时代' },
      { code: 'SH:601318', name: '中国平安' },
      { code: 'SH:600036', name: '招商银行' },
      { code: 'SH:601012', name: '隆基绿能' },
      { code: 'SZ:000858', name: '五粮液' },
      { code: 'SH:600104', name: '上汽集团' },
      { code: 'SH:688629', name: '华丰科技' },
      { code: 'SZ:301165', name: '锐捷网络' },
      { code: 'SZ:301202', name: '朗威股份' },
      { code: 'SZ:300214', name: '日科化学' },
      { code: 'SZ:300068', name: '南都电源' },
      { code: 'SZ:301510', name: '固高科技' },
      { code: 'SZ:300817', name: '双飞集团' },
      { code: 'SZ:300442', name: '润泽科技' },
      { code: 'SH:601888', name: '中国中免' },
      { code: 'SH:600048', name: '保利发展' },
      { code: 'SH:688016', name: '心脉医疗' },
      { code: 'SH:688012', name: '中微公司' },
      { code: 'SH:688002', name: '睿创微纳' },
      { code: 'SH:688003', name: '天准科技' },
      { code: 'SH:688008', name: '澜起科技' },
      { code: 'SH:688010', name: '博瑞医药' },
      { code: 'SH:688011', name: '新光光电' },
      { code: 'SH:688013', name: '天臣医疗' },
      { code: 'SH:688015', name: '道通科技' },
      { code: 'SH:688020', name: '方邦股份' },
      { code: 'SH:688021', name: '奥福环保' },
      { code: 'SH:688022', name: '瀚川智能' },
      { code: 'SH:688023', name: '安恒信息' },
      { code: 'SH:688024', name: '杭可科技' },
      { code: 'SH:688025', name: '杰普特' },
      { code: 'SH:688026', name: '洁特生物' },
      { code: 'SH:688027', name: '国盾量子' },
      { code: 'SH:688028', name: '沃尔德' },
      { code: 'SH:688029', name: '南微医学' },
      { code: 'SH:688030', name: '山石网科' },
      { code: 'SH:688032', name: '海尔生物' },
      { code: 'SH:688033', name: '航天宏图' },
      { code: 'SH:688035', name: '威胜信息' },
      { code: 'SH:688038', name: '清溢光电' },
      { code: 'SH:688039', name: '传音控股' },
      { code: 'SH:688040', name: '金科环境' },
      { code: 'SH:688041', name: '安路科技' },
      { code: 'SH:688043', name: '华兴源创' },
      { code: 'SH:688045', name: '当虹科技' },
      { code: 'SH:688046', name: '晶丰明源' },
      { code: 'SH:688047', name: '龙腾光电' },
      { code: 'SH:688048', name: '长阳科技' },
      { code: 'SH:688052', name: '容百科技' },
      { code: 'SH:688053', name: '思特威' },
      { code: 'SH:688055', name: '德林海' },
      { code: 'SH:688056', name: '芯原股份' },
      { code: 'SH:600865', name: '百大集团' },
      { code: 'SH:601933', name: '永辉超市' },
      { code: 'SZ:300547', name: '川环科技' },
      { code: '00379', name: '恒嘉融资租赁' },
      { code: '.IXIC', name: '纳斯达克综合指数' },
    ];

function SimpleDealPage() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [priceData, setPriceData] = useState(null);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 获取CSV文件列表
  const handleGetCsvFiles = async () => {
    try {
      const response = await fetch('http://localhost:5000/getCsvFile');
      const data = await response.json();
      setFiles(data.csv_files);
    } catch (error) {
      console.error('请求失败:', error);
    }
  };

  // 处理股票代码
  const processStockCode = (code) => {
    if (code.startsWith("HK:")) return code.slice(3);
    if (code.startsWith("NASDAQ:") || code.startsWith("NYSE:") || code.startsWith("AMEX:")) {
      return code.replace(':', '.');
    }
    return code.replace(/:/g, "");
  };

  // 删除股票
  const handleDeleteStock = async (filename) => {
    try {
      const response = await fetch(`http://localhost:5000/deleteCsvFile?filename=${filename}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setFiles(prev => prev.filter(file => file !== filename));
        if (selectedFile === filename) {
          setSelectedFile('');
          setPriceData(null);
          setResult(null);
        }
      }
    } catch (error) {
      console.error('删除失败:', error);
    }
  };

  // 选择文件
  const handleFileChange = (value) => {
    setSelectedFile(value);
    setPriceData(null);
    setResult(null);
  };

  // 计算长期持有收益
  const calculateHoldReturn = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    try {
      // 获取价格数据
      const priceUrl = `http://localhost:5000/getStockPrice?selectedFile=${selectedFile}`;
      const priceResponse = await fetch(priceUrl);
      const priceData = await priceResponse.json();

      if (!priceData.closePrices || !priceData.times || priceData.closePrices.length === 0) {
        throw new Error('价格数据无效');
      }

      setPriceData(priceData);

      // 计算收益
      const initialPrice = priceData.closePrices[0];
      const finalPrice = priceData.closePrices[priceData.closePrices.length - 1];
      const totalReturn = ((finalPrice - initialPrice) / initialPrice) * 100;

      // 计算年化收益率
      const startDate = new Date(priceData.times[0]);
      const endDate = new Date(priceData.times[priceData.times.length - 1]);
      const years = (endDate - startDate) / (1000 * 60 * 60 * 24 * 365.25);
      const annualizedReturn = (Math.pow(1 + totalReturn/100, 1/years) - 1);

      setResult({
        initialPrice,
        finalPrice,
        totalReturn,
        annualizedReturn: annualizedReturn * 100,
        startDate: priceData.times[0],
        endDate: priceData.times[priceData.times.length - 1],
        daysHeld: priceData.times.length
      });

    } catch (error) {
      console.error('计算失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetCsvFiles();
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} style={{ width: "100%", padding: "10px 20px" }}>
        <Box style={{ padding: "10px 20px", display: "flex", flexDirection: "column" }}>
          <FormControl>
            <h1>股票长期持有收益分析</h1>
            <h2>自选股列表</h2>
            <FormControl fullWidth>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  maxHeight: 400,
                  overflow: 'auto',
                  border: '1px solid #e0e0e0',
                  borderRadius: 2,
                  backgroundColor: '#fafafa'
                }}
              >
                <RadioGroup
                  aria-label="stock-select"
                  value={selectedFile}
                  onChange={(e) => handleFileChange(e.target.value)}
                >
                  {files.map((file) => {
                    const codeFromFile = file.split('.')[0];
                    const processedStockCodes = stockData.map(s => ({
                      ...s,
                      processedCode: processStockCode(s.code)
                    }));
                    const stock = processedStockCodes.find(s => s.processedCode === codeFromFile);

                    return (
                      <Paper
                        key={file}
                        elevation={0}
                        sx={{
                          mb: 1,
                          p: 1.5,
                          borderRadius: 1,
                          transition: 'all 0.2s',
                          '&:hover': {
                            backgroundColor: '#f5f5f5'
                          },
                          backgroundColor: selectedFile === file ? '#e3f2fd' : 'transparent',
                          border: '1px solid',
                          borderColor: selectedFile === file ? '#2196f3' : 'transparent',
                          position: 'relative'
                        }}
                      >
                        <Box sx={{
                          position: 'absolute',
                          right: 8,
                          top: 15,
                          display: 'flex',
                          gap: 1
                        }}>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteStock(file);
                            }}
                            sx={{
                              minWidth: 60,
                              fontSize: '0.75rem',
                              padding: '2px 8px',
                            }}
                          >
                            删除
                          </Button>
                        </Box>
                        <FormControlLabel
                          value={file}
                          control={<Radio color="primary" />}
                          label={
                            stock ? (
                              <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                                alignItems: 'center'
                              }}>
                                <Typography variant="subtitle1">{stock.name}</Typography>
                              </Box>
                            ) : (
                              <Typography
                                variant="body1"
                                sx={{
                                  color: 'text.disabled',
                                  fontStyle: 'italic'
                                }}
                              >
                                {file}
                              </Typography>
                            )
                          }
                          sx={{
                            width: '100%',
                            m: 0,
                            '& .MuiFormControlLabel-label': {
                              width: '100%'
                            }
                          }}
                        />
                      </Paper>
                    );
                  })}
                </RadioGroup>
              </Paper>
            </FormControl>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 4,
              }}
            >
              <Button
                variant="contained"
                size="small"
                endIcon={<img src={CountIcon} alt="date" style={{ width: '24px', height: '24px' }} />}
                onClick={calculateHoldReturn}
                disabled={!selectedFile || isLoading}
                sx={{
                  width: '200px',
                  height: '40px',
                  fontSize: '0.875rem',
                }}
              >
                {isLoading ? '计算中...' : '计算持有收益'}
              </Button>
            </Box>

            {result && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                  持有期收益分析
                </Typography>
                <TableContainer component={Paper} sx={{ mb: 3 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>指标</TableCell>
                        <TableCell align="right">数值</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>持有开始日期</TableCell>
                        <TableCell align="right">{result.startDate}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>持有结束日期</TableCell>
                        <TableCell align="right">{result.endDate}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>持有天数</TableCell>
                        <TableCell align="right">{result.daysHeld}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>买入价格</TableCell>
                        <TableCell align="right">{result.initialPrice.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>卖出价格</TableCell>
                        <TableCell align="right">{result.finalPrice.toFixed(2)}</TableCell>
                      </TableRow>
                      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell><strong>总收益率</strong></TableCell>
                        <TableCell align="right">
                          <strong>{result.totalReturn.toFixed(2)}%</strong>
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell><strong>年化收益率</strong></TableCell>
                        <TableCell align="right">
                          <strong>{result.annualizedReturn.toFixed(2)}%</strong>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {priceData && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                  股价走势图
                </Typography>
                <LineChart
                  height={400}
                  series={[
                    {
                      data: priceData.closePrices,
                      label: '收盘价',
                      color: '#1976d2',
                      showMark: false,
                      area: true,
                    }
                  ]}
                  xAxis={[{
                    scaleType: 'point',
                    data: priceData.times,
                    tickLabelStyle: {
                      angle: 45,
                      textAnchor: 'start',
                      fontSize: 12
                    }
                  }]}
                  margin={{ left: 70, right: 30, top: 30, bottom: 100 }}
                  grid={{ vertical: true, horizontal: true }}
                  sx={{
                    '.MuiLineElement-root': {
                      strokeWidth: 2,
                    },
                  }}
                />
              </Box>
            )}
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SimpleDealPage;