import functools
import math
from typing import Tuple, List
import numpy as np
from math import comb

# This implementation was inspired by the approach described here:
# https://en.wikipedia.org/wiki/Binomial_options_pricing_model
# https://www.macroption.com/binomial-option-pricing-calculator-jarrow-rudd-model/
# # No LLMS were used to create this
def price_using_jarrow_rud_binomial_model(price_of_underlying_asset: float,
    strike_price: float, years_to_expiry: float, risk_free_interest_rate: float,
    volatility: float, option_type: str, tree_height: int) -> float:
    deltaT = years_to_expiry / tree_height
    up = np.exp(volatility * math.sqrt(deltaT))
    p0 = (up - np.exp(-risk_free_interest_rate * deltaT)) / (up**2 -1)
    p1 = np.exp(-risk_free_interest_rate * deltaT) - p0

    p = [0 for _ in range(tree_height +1)]
    for i in range(0, tree_height):
        if option_type == 'put':
            p[i] = strike_price - price_of_underlying_asset * up**2*i - (tree_height+1)
            p[i] = 0 if p[i] < 0 else p[i]
        if option_type == 'call':
            p[i] = price_of_underlying_asset - strike_price * up ** 2 * i - (tree_height + 1)
            p[i] = 0 if p[i] < 0 else p[i]

    for j in range(tree_height-1, -1, -1):
        for i in range(j):
            p[i] = p0 * p[i+1] + p1 * p[i]
            if option_type == 'put':
                exercise = strike_price - price_of_underlying_asset * up**(2*i - j+1)
                p[i] = exercise if p[i] < exercise else p[i]
            if option_type == 'call':
                exercise = price_of_underlying_asset - strike_price * up ** (2 * i - j + 1)
                p[i] = exercise if p[i] < exercise else p[i]

    return p[0]


# I got this from the book options futures and derivatives by john c hull
# and here : https://www.kaggle.com/code/ahmetgokkaya/pricing-derivatives-with-binomial-tree-model
def price_using_binomial_model(price_of_underlying_asset: float,
    strike_price: float, years_to_expiry: float, risk_free_interest_rate: float,
    volatility: float, option_type: str, tree_height: int) -> Tuple[float, np.ndarray]:
    deltaT = years_to_expiry / tree_height
    up = math.exp(volatility * math.sqrt(deltaT))
    down = 1 / up
    # Assuming q is 0
    a = math.exp(risk_free_interest_rate * deltaT)
    p = (a-down) / (up - down)

    stock_tree = np.zeros((tree_height + 1, tree_height + 1))
    for i in range(tree_height + 1):
        for j in range(i + 1):
            stock_tree[j, i] = price_of_underlying_asset * (up ** (i - j)) * (down ** j)

    option_tree = np.zeros((tree_height + 1, tree_height + 1))
    if option_type == 'put':
        option_tree[:, tree_height] = np.maximum(strike_price - stock_tree[:, tree_height], 0)
    if option_type == 'call':
        option_tree[:, tree_height] = np.maximum(stock_tree[:, tree_height] - strike_price, 0)
    for i in range(tree_height - 1, -1, -1):
        for j in range(i + 1):
            if option_type == 'put':
                exercise_value = strike_price - stock_tree[j, i]
                hold_value = np.exp(-risk_free_interest_rate * deltaT) * (p * option_tree[j, i + 1] + (1 - p) * option_tree[j + 1, i + 1])
                option_tree[j, i] = max(exercise_value, hold_value)
            if option_type == 'call':
                exercise_value = stock_tree[j, i] - strike_price
                hold_value = np.exp(-risk_free_interest_rate * deltaT) * (p * option_tree[j, i + 1] + (1 - p) * option_tree[j + 1, i + 1])
                option_tree[j, i] = max(exercise_value, hold_value)
            # p[i] = price_of_underlying_asset - strike_price * up ** 2 * i - (tree_height + 1)
            # exercise = price_of_underlying_asset - strike_price * up ** (2 * i - j + 1)

    return option_tree[0, 0], option_tree


# I got this from the book options futures and derivatives by john c hull
# and here : https://www.kaggle.com/code/ahmetgokkaya/pricing-derivatives-with-binomial-tree-model
# I did use an LLM to help me correct some calculations, I had wrongly assumed the structure of my option tree
def calculate_greeks_for_binomial_model(price_of_underlying_asset: float,
    strike_price: float, years_to_expiry: float, risk_free_interest_rate: float,
    volatility: float, option_type: str, tree_height: int, options_tree: np.ndarray)->dict:
    deltaT = years_to_expiry / tree_height
    up = math.exp(volatility * math.sqrt(deltaT))
    down = 1 / up
    # Assuming q is 0
    a = math.exp(risk_free_interest_rate * deltaT)
    p = (a - down) / (up - down)

    price_up = price_of_underlying_asset * up
    price_down = price_of_underlying_asset * down
    delta = (options_tree[0,1] - options_tree[1,1]) / (price_up - price_down )

    S_uu = price_of_underlying_asset * up**2
    S_ud = price_of_underlying_asset * up * down
    S_dd = price_of_underlying_asset * down**2

    V_uu = options_tree[0,2]
    V_ud = options_tree[1,2]
    V_dd = options_tree[2,2]

    gamma = ((V_uu - V_ud) / (S_uu - S_ud) - (V_ud - V_dd) / (S_ud - S_dd)) / ((S_uu - S_dd) / 2)

    theta = (options_tree[0, 2] - options_tree[0, 0]) / (2 * deltaT)
    theta /= 365

    return {'delta': delta, 'gamma': gamma, 'theta': theta}


# an LLM helped with the logic
def calculate_vega(price_of_underlying_asset: float,
    strike_price: float, years_to_expiry: float, risk_free_interest_rate: float,
    volatility: float, option_type: str, tree_height: int, bump=1e-4) -> float:
    v_plus, _ = price_using_binomial_model(price_of_underlying_asset,strike_price,years_to_expiry,risk_free_interest_rate,volatility + bump,option_type, tree_height)
    v_minus, _ = price_using_binomial_model(price_of_underlying_asset,strike_price,years_to_expiry,risk_free_interest_rate,volatility - bump,option_type, tree_height)
    return (v_plus - v_minus) / (2 * bump)

# an LLM helped with the logic
def calculate_rho(price_of_underlying_asset: float,
    strike_price: float, years_to_expiry: float, risk_free_interest_rate: float,
    volatility: float, option_type: str, tree_height: int, bump=1e-4) ->float:
    v_plus, _ = price_using_binomial_model(price_of_underlying_asset,strike_price,years_to_expiry,risk_free_interest_rate + bump,volatility,option_type, tree_height)
    v_minus, _ = price_using_binomial_model(price_of_underlying_asset, strike_price, years_to_expiry,
                                           risk_free_interest_rate - bump, volatility, option_type, tree_height)
    return (v_plus - v_minus) / (2 * bump)
