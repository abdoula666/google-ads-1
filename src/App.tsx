import { useState } from 'react'
import styled from 'styled-components'
import AnalyticsDisplay from './components/AnalyticsDisplay'

// Styled Components
const DashboardContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
  color: #1d2327;
  background: #f0f0f1;
  overflow-x: hidden;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 40px;
  background: white;
  border-bottom: 1px solid #c3c4c7;
  box-shadow: 0 2px 4px rgba(0,0,0,.03);
  position: sticky;
  top: 0;
  z-index: 100;
  
  h1 {
    font-size: 23px;
    font-weight: 400;
    margin: 0;
    padding: 0;
    color: #1d2327;
    display: flex;
    align-items: center;
    gap: 12px;
  }
`

const HeaderLogo = styled.img`
  height: 36px;
  width: auto;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.9;
  }
`

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 69px);
`

const SearchContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  width: 100%;
`

const SearchBox = styled.div`
  background: white;
  padding: 48px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,.08);
  width: 100%;
  max-width: 800px;
  text-align: center;

  h2 {
    font-size: 24px;
    font-weight: 400;
    margin: 0 0 32px;
    color: #1d2327;
  }
`

const SearchForm = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`

const SearchBar = styled.div`
  flex: 1;
  input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #8c8f94;
    border-radius: 4px;
    font-size: 16px;
    &:focus {
      border-color: #2271b1;
      box-shadow: 0 0 0 1px #2271b1;
      outline: none;
    }
  }
`

const TrackButton = styled.button`
  background: #2271b1;
  color: white;
  border: 1px solid #2271b1;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: #135e96;
    border-color: #135e96;
  }
  &:disabled {
    background: #a7aaad;
    border-color: #a7aaad;
    cursor: not-allowed;
  }
`

const ErrorMessage = styled.div`
  color: #d63638;
  padding: 12px;
  background: #fcf0f1;
  border-left: 4px solid #d63638;
  margin-top: 10px;
  text-align: left;
`

const Analytics = styled.div`
  background: white;
  margin: 0;
  padding: 20px 40px 40px;
  min-height: calc(100vh - 70px);
  width: 100%;
`

const BackButton = styled.button`
  background: #f0f0f1;
  border: 1px solid #c3c4c7;
  border-radius: 3px;
  color: #50575e;
  padding: 4px 12px;
  font-size: 13px;
  line-height: 2;
  min-height: 30px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin: 0 0 20px 0;
  transition: all 0.1s ease;

  &:hover {
    background: #f6f7f7;
    border-color: #8c8f94;
    color: #1d2327;
  }

  &:focus {
    border-color: #2271b1;
    box-shadow: 0 0 0 1px #2271b1;
    outline: none;
  }

  &::before {
    content: "\u2190";
    font-size: 16px;
    line-height: 1;
  }
`

type AuthorizedDomain = 'panelplayhouse.com' | 'boroomtech.com';

function isDomainAuthorized(domain: string): domain is AuthorizedDomain {
  return ['panelplayhouse.com', 'boroomtech.com'].includes(domain);
}

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

type DomainAnalytics = {
  [K in AuthorizedDomain]: AnalyticsData;
}

function App() {
  const [searchDomain, setSearchDomain] = useState('')
  const [error, setError] = useState('')
  const [showResults, setShowResults] = useState(false)

  const mockAnalytics: DomainAnalytics = {
    'panelplayhouse.com': {
      totalVisitors: 3000,
      clicksByCountry: {
        'Australia': 1200,
        'Chile': 700,
        'United States': 699,
        'Others': 401
      },
      countryFlags: {
        'Australia': 'AU',
        'Chile': 'CL',
        'United States': 'US'
      },
      trackingDate: '2025-07-26',
      visitorHistory: [
        { 
          date: '2025-06-28',
          totalVisitors: 1500,
          countryClicks: { 'Australia': 800, 'Chile': 300, 'United States': 100, 'Others': 300 }
        },
        { 
          date: '2025-07-01',
          totalVisitors: 1600,
          countryClicks: { 'Australia': 850, 'Chile': 320, 'United States': 110, 'Others': 320 }
        },
        { 
          date: '2025-07-05',
          totalVisitors: 1700,
          countryClicks: { 'Australia': 900, 'Chile': 340, 'United States': 120, 'Others': 340 }
        },
        { 
          date: '2025-07-10',
          totalVisitors: 1800,
          countryClicks: { 'Australia': 950, 'Chile': 360, 'United States': 130, 'Others': 360 }
        },
        { 
          date: '2025-07-15',
          totalVisitors: 1900,
          countryClicks: { 'Australia': 1000, 'Chile': 380, 'United States': 140, 'Others': 380 }
        },
        { 
          date: '2025-08-20',
          totalVisitors: 2100,
          countryClicks: { 'Australia': 1100, 'Chile': 390, 'United States': 245, 'Others': 365 }
        },
        { 
          date: '2025-09-26',
          totalVisitors: 2300,
          countryClicks: { 'Australia': 1200, 'Chile': 400, 'United States': 350, 'Others': 350 }
        },
         { 
          date: '2025-10-28',
          totalVisitors: 3000,
          countryClicks: { 'Australia': 1200, 'Chile': 700, 'United States': 699, 'Others': 401 }
        }
      ],
      budget: {
        total: 600,
        spent: 600,
        remaining: 0,
        dailySpend: 19.64
      }
    },
    'boroomtech.com': {
      totalVisitors: 1300,
      clicksByCountry: {
        'United States': 400,
        'United Kingdom': 200,
        'Canada': 180,
        'China': 130,
        'Singapore': 90,
        'Others': 300
      },
      countryFlags: {
        'United States': 'US',
        'United Kingdom': 'GB',
        'Canada': 'CA',
        'China': 'CN',
        'Singapore': 'SG'
      },
      trackingDate: '2025-07-26',
      visitorHistory: [
        { 
          date: '2025-06-28',
          totalVisitors: 800,
          countryClicks: { 'United States': 250, 'United Kingdom': 150, 'Canada': 120, 'China': 80, 'Singapore': 50, 'Others': 150 }
        },
        { 
          date: '2025-07-01',
          totalVisitors: 900,
          countryClicks: { 'United States': 280, 'United Kingdom': 160, 'Canada': 130, 'China': 90, 'Singapore': 60, 'Others': 180 }
        },
        { 
          date: '2025-07-05',
          totalVisitors: 1000,
          countryClicks: { 'United States': 310, 'United Kingdom': 170, 'Canada': 140, 'China': 100, 'Singapore': 70, 'Others': 210 }
        },
        { 
          date: '2025-07-10',
          totalVisitors: 1100,
          countryClicks: { 'United States': 340, 'United Kingdom': 180, 'Canada': 150, 'China': 110, 'Singapore': 75, 'Others': 245 }
        },
        { 
          date: '2025-07-15',
          totalVisitors: 1150,
          countryClicks: { 'United States': 360, 'United Kingdom': 185, 'Canada': 160, 'China': 115, 'Singapore': 80, 'Others': 250 }
        },
        { 
          date: '2025-07-20',
          totalVisitors: 1200,
          countryClicks: { 'United States': 380, 'United Kingdom': 190, 'Canada': 170, 'China': 120, 'Singapore': 85, 'Others': 255 }
        },
        { 
          date: '2025-07-26',
          totalVisitors: 1300,
          countryClicks: { 'United States': 400, 'United Kingdom': 200, 'Canada': 180, 'China': 130, 'Singapore': 90, 'Others': 300 }
        }
      ]
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isDomainAuthorized(searchDomain)) {
      setError(`You are not allowed this URL: ${searchDomain}`)
      setShowResults(false)
      return
    }
    setError('')
    setShowResults(true)
  }

  const handleBack = () => {
    setShowResults(false);
    setError('');
  };

  const currentAnalytics = isDomainAuthorized(searchDomain) ? mockAnalytics[searchDomain] : null;

  return (
    <DashboardContainer>
      <Header>
        <h1>Google Ads Analytics</h1>
        <HeaderLogo 
          src="https://www.gstatic.com/images/branding/product/2x/google_ads_64dp.png" 
          alt="Google Ads"
        />
      </Header>

      <MainContent>
        {!showResults ? (
          <SearchContainer>
            <SearchBox>
              <h2>Track Domain Analytics</h2>
              <SearchForm onSubmit={handleSubmit}>
                <SearchBar>
                  <input
                    type="text"
                    placeholder="Enter your domain (e.g., example.com)"
                    value={searchDomain}
                    onChange={(e) => {
                      setSearchDomain(e.target.value)
                      setError('')
                      setShowResults(false)
                    }}
                  />
                </SearchBar>
                <TrackButton type="submit" disabled={!searchDomain}>
                  Track
                </TrackButton>
              </SearchForm>
              {error && <ErrorMessage>{error}</ErrorMessage>}
            </SearchBox>
          </SearchContainer>
        ) : (
          currentAnalytics && (
            <Analytics>
              <BackButton onClick={handleBack}>
                Back to Search
              </BackButton>
              <AnalyticsDisplay 
                domain={searchDomain} 
                data={currentAnalytics}
              />
            </Analytics>
          )
        )}
      </MainContent>
    </DashboardContainer>
  )
}

export default App
