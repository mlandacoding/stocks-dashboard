import QuantLib as ql
from datetime import datetime

def ql_montecarlo_american_engine(
    price_of_underlying_asset: float, strike_price: float, expiration_date: str,
    risk_free_interest_rate: float, volatility: float, option_type: str):
    today = ql.Date().todaysDate()
    ql.Settings.instance().evaluationDate = today

    # Option parameters
    spot_price = price_of_underlying_asset
    strike_price = strike_price
    expiration_date = datetime.strptime(expiration_date, "%Y-%m-%d").date()
    # maturity_date = ql.Date(21, 5, 2026)  # DD, MM, YYYY
    maturity_date = ql.Date(expiration_date.day, expiration_date.month, expiration_date.year)
    option_type = ql.Option.Put if option_type == 'put' else ql.Option.Call

    # Market parameters
    risk_free_rate = risk_free_interest_rate
    dividend_yield = 0.00
    volatility = volatility

    # Construct yield/dividend/vol curves
    day_count = ql.Actual365Fixed()
    calendar = ql.NullCalendar()

    spot_handle = ql.QuoteHandle(ql.SimpleQuote(spot_price))
    flat_ts = ql.YieldTermStructureHandle(ql.FlatForward(today, risk_free_rate, day_count))
    dividend_ts = ql.YieldTermStructureHandle(ql.FlatForward(today, dividend_yield, day_count))
    vol_ts = ql.BlackVolTermStructureHandle(ql.BlackConstantVol(today, calendar, volatility, day_count))

    # Create Black-Scholes-Merton process
    bsm_process = ql.BlackScholesMertonProcess(spot_handle, dividend_ts, flat_ts, vol_ts)

    # Create American option
    payoff = ql.PlainVanillaPayoff(option_type, strike_price)
    exercise = ql.AmericanExercise(today, maturity_date)
    american_option = ql.VanillaOption(payoff, exercise)

    # Set up Monte Carlo engine
    steps = 200
    num_paths = 100000
    rng = "pseudorandom"  # or "lowdiscrepancy"

    mc_engine = ql.MCAmericanEngine(bsm_process, rng, steps, requiredSamples=num_paths)

    american_option.setPricingEngine(mc_engine)

    # Get the option price
    npv = american_option.NPV()
    return npv


# this function (FDBS) creates a gird with time and asset price
# each point in the grid is an algebraic equation
# it then calculates the price within a boundary defined by the library, this is because
# pricing gets hard as you approach the extremes either 0 or a very high value
# it then checks if at any point exercising the option is better than holding it for american options
def ql_fd_black_scholes(price_of_underlying_asset: float, strike_price: float, expiration_date: datetime,
    risk_free_interest_rate: float, volatility: float, option_type: str):
    today = ql.Date().todaysDate()
    ql.Settings.instance().evaluationDate = today

    expiration_date = datetime.strptime(expiration_date, "%Y-%m-%d").date()
    maturity_date = ql.Date(expiration_date.day, expiration_date.month, expiration_date.year)
    option_type = ql.Option.Put if option_type.lower() == 'put' else ql.Option.Call

    day_count = ql.Actual365Fixed()
    calendar = ql.NullCalendar()

    dividend_yield = 0.89
    spot_handle = ql.QuoteHandle(ql.SimpleQuote(price_of_underlying_asset))
    flat_ts = ql.YieldTermStructureHandle(ql.FlatForward(today, risk_free_interest_rate, day_count))
    dividend_ts = ql.YieldTermStructureHandle(ql.FlatForward(today, dividend_yield, day_count))
    vol_ts = ql.BlackVolTermStructureHandle(ql.BlackConstantVol(today, calendar, volatility, day_count))

    bsm_process = ql.BlackScholesMertonProcess(spot_handle, dividend_ts, flat_ts, vol_ts)

    payoff = ql.PlainVanillaPayoff(option_type, strike_price)
    exercise = ql.AmericanExercise(today, maturity_date)
    option = ql.VanillaOption(payoff, exercise)

    tGrid, xGrid = 2000, 200
    engine = ql.FdBlackScholesVanillaEngine(bsm_process, tGrid, xGrid)
    option.setPricingEngine(engine)

    result = {
        "NPV": option.NPV(),
        "delta": option.delta(),
        "gamma": option.gamma(),
        # "vega": option.vega(),
        "theta": option.theta(),
        # "rho": option.rho()
    }

    return result
