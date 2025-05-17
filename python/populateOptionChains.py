from polygon import RESTClient
import pandas as pd
from polygon.rest.models import OptionContractSnapshot

client = RESTClient("redacted")

options_chain = []
for o in client.list_snapshot_options_chain(
    "EVRI",
    params={
        "order": "asc",
        "limit": 10,
        "sort": "ticker",
    },
):
    options_chain.append(o)

df = pd.DataFrame([OptionContractSnapshot.__dict__ for option in options_chain])

print(options_chain)
