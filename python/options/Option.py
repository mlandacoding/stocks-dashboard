from datetime import datetime

class Option:
    def __init__(self,option_symbol: str, underlying_asset_symbol:str, option_type: str, strike_price: float, implied_volatility: float,
    last_price: float, last_price_updated_at: datetime, underlying_price: float, years_to_expiry: float, risk_free_rate: float):
        self.option_symbol = option_symbol
        self.underlying_asset_symbol = underlying_asset_symbol
        self.option_type = option_type
        self.strike_price = strike_price
        self.implied_volatility = implied_volatility
        self.last_price = last_price
        self.last_price_updated_at = last_price_updated_at
        self.underlying_price = underlying_price
        self.years_to_expiry = years_to_expiry
        self.risk_free_rate = risk_free_rate
        self.model = None
        self.model_calculated_price = None
        self.in_the_money = self.is_in_the_money()

        self.delta = None
        self.gamma = None
        self.theta = None
        self.rho = None
        self.vega = None

    def set_greeks(self, greeks: dict):
        self.delta = greeks['delta'] if 'delta' in greeks else None
        self.gamma = greeks['gamma'] if 'gamma' in greeks else None
        self.theta = greeks['theta'] if 'theta' in greeks else None
        self.rho = greeks['rho'] if 'rho' in greeks else None
        self.vega = greeks['vega'] if 'vega' in greeks else None

    def to_mysql_row(self):
        return (
            self.option_symbol,
            self.underlying_asset_symbol,
            self.option_type,
            self.strike_price,
            self.implied_volatility,
            self.last_price,
            # self.last_price_updated_at,
            self.model,
            self.in_the_money,
            self.delta,
            self.gamma,
            self.theta,
            self.rho,
            self.vega,
        )

    def is_in_the_money(self) -> bool:
        if self.option_type.lower() == 'call':
            return self.underlying_price > self.strike_price
        return self.underlying_price < self.strike_price
