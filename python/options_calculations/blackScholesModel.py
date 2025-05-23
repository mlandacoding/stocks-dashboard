import numpy as np
import scipy.stats as si
import scipy as scipy

from options.Option import Option


# This implementation was inspired by the approach described here:
# https://theaiquant.medium.com/mastering-the-black-scholes-model-with-python-a-comprehensive-guide-to-option-pricing-11af712697b7
# The code here has been independently written and adapted
# No LLMS were used to create this
def price_using_black_sholes(option: Option) -> float:
    price_of_underlying_asset = option.underlying_price
    strike_price = option.strike_price
    years_to_expiry = option.years_to_expiry
    risk_free_interest_rate = option.risk_free_rate
    volatility = option.implied_volatility
    option_type = option.option_type

    def d1():
        return (np.log(price_of_underlying_asset / strike_price) + (risk_free_interest_rate + 0.5 * volatility ** 2) * years_to_expiry) / (volatility * np.sqrt(years_to_expiry))

    def d2():
        return d1() - volatility * np.sqrt(years_to_expiry)

    def price_a_call():
        return price_of_underlying_asset * si.norm.cdf(d1(), 0.0, 1.0) - strike_price * np.exp(-risk_free_interest_rate * years_to_expiry) * si.norm.cdf(d2(),0.0, 1.0)

    def price_a_put():
        return strike_price * np.exp(-risk_free_interest_rate * years_to_expiry) * si.norm.cdf(-d2(), 0.0, 1.0) - price_of_underlying_asset * si.norm.cdf(-d1(), 0.0, 1.0)

    # note to self - basically we are evaluating if we are in the money or not, taking the time to expiration in consideration
    # as well the volatility, and subtracting the cost of the contract, thats how this formula works.

    if option_type == 'call':
        return price_a_call()
    elif option_type == 'put':
        return price_a_put()
    else:
        raise ValueError("option_type must be 'call' or 'put'")

# This implementation was inspired by the approach described here:
# https://www.macroption.com/black-scholes-formula/#greeks
# The code here has been independently written and adapted
# # No LLMS were used to create this
def get_greeks_black_scholes(option: Option, trading_days = 252) -> dict:
    price_of_underlying_asset = option.underlying_price
    strike_price = option.strike_price
    years_to_expiry = option.years_to_expiry
    risk_free_interest_rate = option.risk_free_rate
    volatility = option.implied_volatility
    option_type = option.option_type
    # Theres no exponent for dividend so keep d1 as is ( the stock may have dividends I just dont have the data
    q = 0
    d1 = (np.log(price_of_underlying_asset / strike_price) + (risk_free_interest_rate + 0.5 * volatility ** 2) * years_to_expiry) / (volatility * np.sqrt(years_to_expiry))
    d2 = d1 - volatility * np.sqrt(years_to_expiry)
    delta = si.norm.cdf(d1) if option_type == 'call' else si.norm.cdf(d1) - 1

    gamma = np.exp(-q*years_to_expiry)* si.norm.pdf(d1)/(price_of_underlying_asset*volatility*np.sqrt(years_to_expiry))

    # couldnt figure theta out by looking at the formulas, here is the source:
    # https://www.reddit.com/r/options/comments/17m7bgt/options_greeks_calculations/
    a = price_of_underlying_asset * volatility * np.exp(-q * years_to_expiry) * si.norm.pdf(d1) / (2 * np.sqrt(years_to_expiry))
    b_for_calls = risk_free_interest_rate * strike_price * np.exp(-risk_free_interest_rate * years_to_expiry) * scipy.special.ndtr(d2)
    c_for_calls = q * price_of_underlying_asset * np.exp(-q * years_to_expiry) * si.norm.cdf(d1)

    b_for_puts = risk_free_interest_rate * strike_price * np.exp(-risk_free_interest_rate * years_to_expiry) * si.norm.cdf(-d2)
    c_for_puts = q * price_of_underlying_asset * np.exp(-q * years_to_expiry) * si.norm.cdf(-d1)

    theta = (
        (1 / trading_days) * (-a - b_for_calls + c_for_calls)
        if option_type == 'call'
        else (1 / trading_days) * (-a + b_for_puts - c_for_puts)
    )


    rho_for_calls = strike_price * years_to_expiry * np.exp(-risk_free_interest_rate * years_to_expiry) * si.norm.cdf(d2)
    rho_for_puts = -strike_price * years_to_expiry * np.exp(-risk_free_interest_rate * years_to_expiry) * si.norm.cdf(-d2)

    rho = rho_for_calls if option_type == 'call' else rho_for_puts

    # uses normal probability density, NOT cumulative
    vega = price_of_underlying_asset * np.exp(-q * years_to_expiry) * np.sqrt(years_to_expiry) * si.norm.pdf(d1)

    return {'delta':delta, 'gamma': gamma, 'theta': theta, 'rho': rho, 'vega': vega }
