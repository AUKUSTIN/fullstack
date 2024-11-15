import React from 'react';
import { Layout, Card, Col, Row, Progress } from 'antd'; // Ant Design for layout and progress
import { LineChart, Line, PieChart, Pie, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area, BarChart, Bar, Tooltip, LabelList, XAxis, YAxis, CartesianGrid,Legend } from 'recharts'; // Recharts for charts
import './Dashboard.css'; // Custom CSS for additional styling
import { WalletOutlined, DownOutlined, UpOutlined,UpOutlinedOutlined } from '@ant-design/icons';

const { Content } = Layout;

// Data definitions
const multipleAreaChartData = [
  { name: '0', series1: 10, series2: 40, series3: 20 },
  { name: '20', series1: 50, series2: 30, series3: 20 },
  { name: '40', series1: 20, series2: 70, series3: 40 },
  { name: '60', series1: 80, series2: 20, series3: 50 },
  { name: '80', series1: 40, series2: 60, series3: 10 },
  { name: '100', series1: 70, series2: 10, series3: 90 },
  { name: '120', series1: 30, series2: 80, series3: 40 },
  { name: '140', series1: 90, series2: 50, series3: 60 },
  { name: '160', series1: 50, series2: 20, series3: 50 },
];


const stackedBarChartData = [
  { name: 'Jan', series1: 30, series2: 20, series3: 10 }, // Total: 60
  { name: 'Feb', series1: 50, series2: 30, series3: 20 }, // Total: 100
  { name: 'Mar', series1: 40, series2: 35, series3: 25 }, // Total: 100
  { name: 'Apr', series1: 20, series2: 40, series3: 25 }, // Total: 85
  { name: 'May', series1: 50, series2: 30, series3: 20 }, // Total: 100
  { name: 'Jun', series1: 35, series2: 30, series3: 20 }, // Total: 85
  { name: 'Jul', series1: 30, series2: 40, series3: 20 }, // Total: 90
  { name: 'Aug', series1: 45, series2: 30, series3: 25 }, // Total: 100
  { name: 'Sep', series1: 30, series2: 30, series3: 20 }, // Total: 80
  { name: 'Oct', series1: 50, series2: 35, series3: 15 }, // Total: 100
  { name: 'Nov', series1: 40, series2: 30, series3: 20 }, // Total: 90
  { name: 'Dec', series1: 50, series2: 3, series3: 20 }, // Total: 100
];

const lineChartData = [
  { name: 'Jan', value: 10 },
  { name: 'Feb', value: 28 },
  { name: 'Mar', value: 60 },
  { name: 'Apr', value: 70 },
  { name: 'May', value: 65 },
  { name: 'Jun', value: 85 },
];


const pieChartData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const radarChartData = [
  { subject: '0%', A: 120, B: 110 },
  { subject: '25%', A: 98, B: 130 },
  { subject: '50%', A: 86, B: 130 },
  { subject: '75%', A: 99, B: 100 },
  { subject: '100%', A: 85, B: 90 },
];

const singleValueBarChartData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 45 },
  { name: 'Mar', value: 65 },
  { name: 'Apr', value: 80 },
  { name: 'May', value: 90 },
];

const Groupbarchart = [
  { quarter: 'jan', ProductA: 40, ProductB: 30, ProductC: 30 },  // Total: 100
  { quarter: 'feb', ProductA: 35, ProductB: 30, ProductC: 35 },  // Total: 100
  { quarter: 'mar', ProductA: 25, ProductB: 35, ProductC: 40 },  // Total: 100
];

const histogramData = [
  { name: 'Range 0-20', value: 5 },
  { name: 'Range 21-40', value: 10 },
  { name: 'Range 41-60', value: 8 },
  { name: 'Range 61-80', value: 6 },
  { name: 'Range 81-100', value: 4 },
];

const Dashboard = () => {
  return (
    <Layout style={{ marginLeft: '220px', marginTop: '16px'}}>
      
        <Content style={{ padding: '0 20px', minHeight: 200 }}>
            <Row gutter={8}>

                <Col span={18}>
                  <Card>
                    <Row gutter={18} align="middle">
                      {/* Progress Bar */}
                      <Col span={6} style={{ marginLeft: '50px' }} className="progress-col">
                        <Progress
                          type="dashboard"
                          percent={86}
                          strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                          }}
                          strokeWidth={15}
                          trailColor="#f0f0f0"
                          format={percent => `${percent}%`}
                          width={190}
                        />
                      </Col>

                      {/* Bar Chart */}
                      <Col span={6} style={{ marginLeft: '20px' }}>
                        <BarChart width={250} height={250} data={Groupbarchart} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <XAxis dataKey="quarter" axisLine={{ strokeWidth: 0 }} tickLine={false} />
                          <Tooltip />
                          <Bar dataKey="ProductA" fill="#57d683" barSize={10}/>
                          <Bar dataKey="ProductB" fill="#2cc5d6" barSize={10}/>
                          <Bar dataKey="ProductC" fill="#5393fb" barSize={10}/>
                        </BarChart>
                      </Col>

                      <Col span={6} style={{ marginLeft: '60px' }}>
                     
                          <Progress
                            type="line"
                            percent={70}
                            strokeColor="#5393fb"
                            strokeWidth={15}
                            trailColor="#f0f0f0"
                            format={percent => `${percent}%`}
                          />
                            <Progress
                              type="line"
                              percent={85}
                              strokeColor="#57d683"
                              strokeWidth={15}
                              trailColor="#f0f0f0"
                              format={percent => `${percent}%`}
                            />
                            <Progress
                              type="line"
                              percent={90}
                              strokeColor="#2cc5d6"
                              strokeWidth={15}
                              trailColor="#f0f0f0"
                              format={percent => `${percent}%`}
                            />
                      </Col>
                    </Row>
                  </Card>
              </Col>

                {/* Line Chart */}
                <Col span={6}>
                  <Row gutter={6}>
                  <Card style={{ height: '120px',width:'350px',padding: '20px' }}>
                      <h2 style={{ marginBottom: '10px',fontWeight: 'bold',textAlign: 'center' }}><WalletOutlined style={{ fontSize: '24px'}} />  Wallet</h2>
                      <p style={{ fontSize: '24px', fontWeight: 'bold',textAlign: 'center'  }}>${2650567234}</p>
                  </Card>

                  </Row>
                  <Row gutter={6}>
                  <Card style={{ height: '55px',width:'350px',padding: '10px'  }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold',textAlign: 'center'  }}>Losses<DownOutlined style={{ color: 'red', fontSize: '16px' }} />  ${567234}</h3>
                   
                    </Card>
                  </Row>
                  <Row gutter={6}>
                    <Card  style={{ height: '55px',width:'350px',padding: '10px'  }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold',textAlign: 'center'  }}>Income<UpOutlined style={{ color: 'green', fontSize: '16px' }} />  ${1567234}</h3>
                    </Card>
                  </Row>
                  </Col>
             </Row>



         <Row gutter={8}>
            {/* Area Chart (Multiple Series) */}
            <Col span={12}>
              <Card>
                <AreaChart width={650} height={200} data={multipleAreaChartData}>
                  {/* X-Axis: Display ticks 0, 20, 40, ..., 160 */}
                  <CartesianGrid 
                    horizontal={false} 
                    vertical={true} 
                    strokeDasharray="3 3" 
                    stroke="#ddd" 
                  />
                  <XAxis
                        dataKey="name"  // Ensure this matches the key in your dataset
                        axisLine={{ strokeWidth: 0 }}
                        tickLine={false}
                        ticks={['0', '20', '40', '60', '80', '100', '120', '140', '160']}  // Match tick values to the `name` field in your data
                  />

                  {/* Y-Axis: Format ticks to display 0%, 50%, 100% */}
                  <YAxis
                    axisLine={{ strokeWidth: 0 }}
                    tickLine={false}
                    tickFormatter={(tick) => `${tick}%`}  // Format ticks as percentage
                    domain={[0, 100]}  // Limit y-axis range from 0 to 100
                    ticks={[0, 50, 100]}  // Specify percentage ticks
                  />
                  <Area type="monotone" dataKey="series1" stroke="#57d683" fill="#57d683" />
                  <Area type="monotone" dataKey="series2" stroke="#2cc5d6" fill="#2cc5d6" />
                  <Area type="monotone" dataKey="series3" stroke="#5393fb" fill="#5393fb" />
                  <Tooltip />
                </AreaChart>
              </Card>
            </Col>

             {/* Radar Chart */}
             <Col span={6}>
              <Card >
                <RadarChart outerRadius={80} width={300} height={200} data={radarChartData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} />
                  <Radar name="A" dataKey="A" stroke="#91f2bc" fill="#57d683" fillOpacity={0.6} />
                  <Radar name="B" dataKey="B" stroke="#75a7fe" fill="#2cc5d6" fillOpacity={0.6} />
                  <Tooltip />
                  </RadarChart>
                    </Card>
                  </Col>

              {/*stackedBarChartData*/}
              <Col span={6}>
                <Card >
                        <BarChart width={250} height={200} data={Groupbarchart} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <XAxis dataKey="quarter" axisLine={{ strokeWidth: 0 }} tickLine={false} />
                          <Tooltip />
                          <Bar dataKey="ProductA" fill="#57d683" barSize={10}/>
                          <Bar dataKey="ProductB" fill="#2cc5d6" barSize={10}/>
                          <Bar dataKey="ProductC" fill="#5393fb" barSize={10}/>
                        </BarChart>
                </Card>
             </Col>
          </Row>


          {/*stackedBarChartData*/}
          <Row gutter={8}>
            <Col span={24}>
              <Card>
                <Row>
                <BarChart width={1000} height={200} data={stackedBarChartData}>
                <CartesianGrid 
                    horizontal={true} 
                    vertical={false} 
                    strokeDasharray="3 3" 
                    stroke="#ddd" 
                  />
                  {/* X-Axis Configuration */}
                  <XAxis 
                    dataKey="name" 
                    axisLine={{ strokeWidth: 0 }} 
                    tickLine={false} 
                  />
                  {/* Y-Axis Configuration */}
                  <YAxis 
                    axisLine={{ strokeWidth: 0 }} 
                    tickLine={false} 
                    ticks={[0, 25, 50, 75, 100]}   // Custom Y-axis ticks
                    domain={[0, 100]}              // Limit Y-axis range from 0 to 100
                    interval={0}                   // Show all ticks explicitly
                  />
                  
                  <Tooltip />
                  <Bar dataKey="series1" stackId="a" fill="#57d683" barSize={20} />  {/* Adjust barSize here */}
                  <Bar dataKey="series2" stackId="a" fill="#2cc5d6" barSize={20} />  {/* Adjust barSize here */}
                  <Bar dataKey="series3" stackId="a" fill="#5393fb" barSize={20} />  {/* Adjust barSize here */}
                  </BarChart>
                

                
                        <BarChart width={300} height={200} data={Groupbarchart} margin={{ top: 20, right: 30, left: 80, bottom: 5 }}>
                          <XAxis dataKey="quarter" axisLine={{ strokeWidth: 0 }} tickLine={false} />
                          <Tooltip />
                          <Bar dataKey="ProductA" fill="#57d683" barSize={10}/>
                          <Bar dataKey="ProductB" fill="#2cc5d6" barSize={10}/>
                          <Bar dataKey="ProductC" fill="#5393fb" barSize={10}/>
                        </BarChart>

                  </Row>
              </Card>
            </Col>
          </Row>

        </Content>
     
    </Layout>
  );
};

export default Dashboard;
