import sys
import json
import numpy as np
import cvxpy as cp

# Mean-variance portfolio optimization in Python, based on Modern Portfolio Theory (MPT),
# aims to construct a portfolio of assets that maximizes expected return for a given level of risk

def main():
    # Read input JSON from stdin
    input_text = sys.stdin.read()
    data = json.loads(input_text)

    symbols = data['symbols']
    candles = data['candles']

    # Extract closing prices per symbol into a 2D numpy array (days x assets)
    price_matrix = []
    for symbol in symbols:
        daily_closes = [candle['c'] for candle in candles[symbol] if candle is not None]
        price_matrix.append(daily_closes)

    price_matrix = np.array(price_matrix).T  # shape: (days, assets)

    # Calculate daily returns
    returns = np.diff(price_matrix, axis=0) / price_matrix[:-1]

    # Calculate covariance matrix of returns
    # It’s a square matrix that summarizes the covariances between pairs of assets in your portfolio.
    # Covariance measures how two assets move together:
    # A positive covariance means the assets tend to move in the same direction.
    # A negative covariance means they tend to move in opposite directions.
    # A covariance near zero means the assets move independently.
    cov_matrix = np.cov(returns, rowvar=False)

    n = len(symbols)

    # Define optimization variables (portfolio weights)
    w = cp.Variable(n)

    # Define the objective: minimize portfolio variance
    portfolio_variance = cp.quad_form(w, cov_matrix)
    objective = cp.Minimize(portfolio_variance)

    # Constraints: weights sum to 1, weights >= 0 (long only)
    constraints = [
        cp.sum(w) == 1,
        w >= 0
    ]

    # Problem setup and solve
    prob = cp.Problem(objective, constraints)
    prob.solve()

    weights = w.value

    # Prepare output dict with symbol: weight
    portfolio = {symbol: round(float(weights[i]),4) for i, symbol in enumerate(symbols)}

    # Output JSON to stdout
    print(json.dumps(portfolio))

if __name__ == "__main__":
    main()
