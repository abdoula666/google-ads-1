import styled from 'styled-components'
import ReactCountryFlag from 'react-country-flag'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import BillingInformation from './BillingInformation'

const AnalyticsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 20px;
`

const AnalyticsSection = styled.div`
  margin-bottom: 40px;
  &:last-child {
    margin-bottom: 0;
  }
`

const SectionTitle = styled.h2`
  color: #1d2327;
  font-size: 1.5em;
  margin: 0 0 1em;
  padding: 0;
  font-weight: 400;
`

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #f6f7f7;
  border: 1px solid #c3c4c7;
  margin-bottom: -1px;

  &:first-of-type {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  &:last-of-type {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`

const CountryInfo = styled.span`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #50575e;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
    gap: 8px;
  }
`

const Value = styled.span`
  font-weight: 500;
  color: #2271b1;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`

const ChartContainer = styled.div`
  height: 450px;
  margin-top: 20px;
  padding: 32px;
  background: white;
  border: 1px solid #c3c4c7;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);

  @media (max-width: 768px) {
    height: 350px;
    padding: 20px;
  }
`

const GrowthDescription = styled.p`
  color: #50575e;
  font-size: 15px;
  margin: 0 0 20px;
  line-height: 1.5;
`

interface DailyClickData {
  date: string;
  totalVisitors: number;
  countryClicks: {
    [key: string]: number;
  };
}

interface AnalyticsData {
  totalVisitors: number;
  clicksByCountry: { [key: string]: number };
  countryFlags: { [key: string]: string };
  trackingDate: string;
  visitorHistory: DailyClickData[];
  budget?: {
    total: number;
    spent: number;
    remaining: number;
    dailySpend: number;
  };
}

interface Props {
  domain: string;
  data: AnalyticsData;
}

const BudgetStatItem = styled(StatItem)`
  font-size: 16px;
  padding: 20px 24px;
  
  span:first-child {
    font-size: 18px;
  }
`

const CustomTooltip = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`

const TooltipTitle = styled.div`
  font-weight: 500;
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
  color: #1d2327;
`

const TooltipRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  gap: 24px;
  font-size: 13px;

  span:last-child {
    font-weight: 500;
    color: #2271b1;
  }
`

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: DailyClickData;
  }>;
  label?: string;
}

const CustomizedTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <CustomTooltip>
        <TooltipTitle>
          {new Date(label!).toLocaleDateString(undefined, { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </TooltipTitle>
        <TooltipRow>
          <span>Total Clicks:</span>
          <span>{data.totalVisitors.toLocaleString()}</span>
        </TooltipRow>
        {Object.entries(data.countryClicks)
          .sort(([, a], [, b]) => Number(b) - Number(a))
          .map(([country, clicks]) => (
            <TooltipRow key={country}>
              <span>{country}:</span>
              <span>{Number(clicks).toLocaleString()}</span>
            </TooltipRow>
          ))}
      </CustomTooltip>
    );
  }
  return null;
};

const AnalyticsDisplay = ({ domain, data }: Props) => {
  const defaultCard = {
    organizationName: 'pphouse',
    fullName: 'Mouhamadou abdoulaye illiassou nouhou',
    address: '47 W 13th St, New York, NY 10011, USA',
    cardNumber: '4084******64',
    expireDate: '10/25'
  };

  const sortedCountries = Object.entries(data.clicksByCountry)
    .sort(([countryA, clicksA], [countryB, clicksB]) => {
      // Always put 'Others' last
      if (countryA === 'Others') return 1;
      if (countryB === 'Others') return -1;
      // Sort by click count
      return clicksB - clicksA;
    });

  const showBudget = domain === 'panelplayhouse.com' && data.budget;

  return (
    <AnalyticsContainer>
      {showBudget && data.budget && (
        <AnalyticsSection>
          <SectionTitle>Budget Overview</SectionTitle>
          <BudgetStatItem>
            <CountryInfo>💰 Total Google Ads Budget</CountryInfo>
            <Value>${data.budget.total.toLocaleString()}</Value>
          </BudgetStatItem>
          <BudgetStatItem>
            <CountryInfo>💸 Amount Spent</CountryInfo>
            <Value>${data.budget.spent.toLocaleString()}</Value>
          </BudgetStatItem>
          <BudgetStatItem>
            <CountryInfo>🏦 Amount Remaining</CountryInfo>
            <Value>${data.budget.remaining.toLocaleString()}</Value>
          </BudgetStatItem>
          <BudgetStatItem>
            <CountryInfo>🔁 Daily Default Spend</CountryInfo>
            <Value>${data.budget.dailySpend.toLocaleString()}</Value>
          </BudgetStatItem>
          {domain === 'panelplayhouse.com' && (
            <BillingInformation defaultCard={defaultCard} />
          )}
        </AnalyticsSection>
      )}

      <AnalyticsSection>
        <SectionTitle>Visitor Overview</SectionTitle>
        <StatItem>
          <CountryInfo>Total Visitors</CountryInfo>
          <Value>{data.totalVisitors.toLocaleString()}</Value>
        </StatItem>
      </AnalyticsSection>

      <AnalyticsSection>
        <SectionTitle>Clicks by Country</SectionTitle>
        {sortedCountries.map(([country, clicks]) => (
          <StatItem key={country}>
            <CountryInfo>
              {country !== 'Others' && data.countryFlags[country] && (
                <ReactCountryFlag
                  countryCode={data.countryFlags[country]}
                  svg
                  style={{
                    width: '1.5em',
                    height: '1.5em',
                    borderRadius: '2px',
                    marginRight: '4px'
                  }}
                />
              )}
              {country}
            </CountryInfo>
            <Value>{clicks.toLocaleString()}</Value>
          </StatItem>
        ))}
      </AnalyticsSection>

      {data.visitorHistory && (
        <AnalyticsSection>
          <SectionTitle>Find out how your audience is growing</SectionTitle>
          <GrowthDescription>
            Track your daily visitor growth and identify trends in user engagement across different locations.
          </GrowthDescription>
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data.visitorHistory}
                margin={{
                  top: 20,
                  right: 30,
                  left: 40,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => new Date(date).toLocaleDateString(undefined, { 
                    month: 'short',
                    day: 'numeric'
                  })}
                  stroke="#6b7280"
                  tick={{ fill: '#6b7280' }}
                  tickLine={{ stroke: '#6b7280' }}
                  axisLine={{ stroke: '#d1d5db' }}
                />
                <YAxis 
                  domain={[0, dataMax => Math.ceil(dataMax * 1.1)]}
                  stroke="#6b7280"
                  tick={{ fill: '#6b7280' }}
                  tickLine={{ stroke: '#6b7280' }}
                  axisLine={{ stroke: '#d1d5db' }}
                  width={60}
                />
                <Tooltip content={<CustomizedTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="totalVisitors" 
                  name="Total Clicks"
                  stroke="#2271b1" 
                  strokeWidth={3}
                  dot={{ fill: '#2271b1', r: 5, strokeWidth: 2, stroke: 'white' }}
                  activeDot={{ r: 7, fill: '#135e96', strokeWidth: 2, stroke: 'white' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </AnalyticsSection>
      )}
    </AnalyticsContainer>
  );
};

export default AnalyticsDisplay;