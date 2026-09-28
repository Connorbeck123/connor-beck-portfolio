import { cn } from "@/lib/cn";
import { hyperliquidInter } from "./shared";

const NAV = [
  { group: "Overview", items: ["Dashboard"] },
  { group: "Account", items: ["Portfolio", "Wallet", "Watchlist"] },
  { group: "Activity", items: ["Trade", "Transactions"] },
  { group: "Others", items: ["Insights", "Analytics", "Market Trends"] },
  { group: "General", items: ["Support", "Settings"] },
];

const TICKER = [
  "BTC/USDT",
  "ETH/USDT",
  "BNB/USDT",
  "XRP/USDT",
  "SOL/USDT",
  "TRX/USDT",
  "HYPE/USDT",
];

const CARDS = [
  { pair: "BTC/USDT", name: "Bitcoin", price: "$109,687.23", delta: "+2.53%" },
  { pair: "ETH/USDT", name: "Ethereum", price: "$2,256.04", delta: "+0.93%" },
  { pair: "HYPE/USDT", name: "Hyperliquid", price: "$63.51", delta: "+3.88%" },
];

const FILTERS = ["All", "Trends", "Favourites", "Top Gainers", "Top Losers"];

const ROWS = [
  { no: "#1", name: "Bitcoin", ticker: "BTC", price: "$109,687.23" },
  { no: "#2", name: "Ethereum", ticker: "ETH", price: "$2,256.04" },
  { no: "#3", name: "BNB", ticker: "BNB", price: "$708.28" },
  { no: "#4", name: "XRP", ticker: "XRP", price: "$0.9961" },
  { no: "#5", name: "Solana", ticker: "SOL", price: "$83.81" },
  { no: "#6", name: "TRON", ticker: "TRX", price: "$0.4283" },
  { no: "#7", name: "Hyperliquid", ticker: "HYPE", price: "$63.51" },
  { no: "#8", name: "Dogecoin", ticker: "DOGE", price: "$0.1824" },
];

function Icon({ className }: { className?: string }) {
  return <span className={cn("inline-block h-3.5 w-3.5 shrink-0 rounded-[2px] border border-current", className)} />;
}

function Spark() {
  return (
    <svg viewBox="0 0 120 36" className="mt-3 h-8 w-full" fill="none">
      <path d="M0 26 C16 24 24 10 40 14 C56 18 64 28 80 16 C96 4 108 8 120 6" stroke="#6e6e6a" strokeWidth="1.25" />
    </svg>
  );
}

export function HyperliquidWireframe() {
  return (
    <div className="@container overflow-hidden bg-[#111111] text-[#c8c8c4] [container-type:inline-size]">
      <div className={cn(hyperliquidInter.className, "hyperliquid-wireframe-scale")}>
        <div className="grid w-full min-w-0 grid-cols-[13rem_minmax(0,1fr)_16.5rem] grid-rows-[auto_auto_1fr] max-lg:w-[1100px]">
        <aside className="row-span-3 flex flex-col border-r border-[#2e2e2c] px-3 py-4">
          <div className="flex items-center gap-2 px-2">
            <span className="relative h-3.5 w-6 shrink-0">
              <span className="absolute top-0 left-0 h-3.5 w-3.5 rounded-full border border-[#6e6e6a]" />
              <span className="absolute top-0 right-0 h-3.5 w-3.5 rounded-full border border-[#6e6e6a]" />
            </span>
            <span className="text-[13px] font-medium tracking-[-0.03em] text-[#f2f2ef]">Hyperliquid</span>
            <span className="ml-auto text-[11px] text-[#6e6e6a]">‹</span>
          </div>

          <div className="mt-7 px-2">
            <p className="text-[15px] font-medium tracking-[-0.03em] text-[#f2f2ef]">Welcome Back,</p>
            <p className="text-[15px] font-medium tracking-[-0.03em] text-[#f2f2ef]">Marcus Sains</p>
            <p className="mt-1 text-[10px] tracking-[0.04em] text-[#6e6e6a]">Last login: 10 hours ago</p>
          </div>

          <nav className="mt-6 flex flex-1 flex-col gap-3.5">
            {NAV.map((section) => (
              <div key={section.group}>
                <p className="mb-1.5 px-2 text-[10px] tracking-[0.04em] text-[#6e6e6a]">{section.group}</p>
                <ul>
                  {section.items.map((item) => {
                    const current = item === "Dashboard";

                    return (
                      <li
                        key={item}
                        className={cn(
                          "flex h-[34px] items-center gap-2.5 rounded-[10px] border px-2.5 text-[12px]",
                          current
                            ? "border-[#6e6e6a] font-medium text-[#f2f2ef]"
                            : "border-transparent text-[#9a9a95]",
                        )}
                      >
                        <Icon />
                        <span className="flex-1">{item}</span>
                        {current ? <span className="h-3.5 w-px bg-[#6e6e6a]" /> : null}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <span className="mt-4 flex h-[34px] items-center gap-2.5 px-2.5 text-[12px] text-[#9a9a95]">
            <Icon />
            Log out
          </span>
        </aside>

        <header className="col-span-2 flex items-center gap-3 border-b border-[#2e2e2c] px-4 py-2.5">
          <span className="flex shrink-0 items-center gap-2 text-[11px] text-[#9a9a95]">
            <Icon className="h-3 w-3" />
            Overview / Dashboard
          </span>
          <div className="mx-auto flex h-7 w-full max-w-sm items-center rounded-[8px] border border-[#2e2e2c] px-2.5 text-[11px] text-[#6e6e6a]">
            Search
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <span className="h-7 w-7 rounded-[8px] border border-[#2e2e2c]" />
            <span className="h-7 w-7 rounded-[8px] border border-[#2e2e2c]" />
            <div className="flex items-center gap-2 rounded-[8px] border border-[#2e2e2c] py-1 pr-2.5 pl-1">
              <span className="grid h-5 w-5 place-items-center rounded-full border border-[#6e6e6a] text-[8px]">
                MS
              </span>
              <div className="leading-tight">
                <p className="text-[10px] font-medium text-[#f2f2ef]">Your Wallet</p>
                <p className="text-[8px] text-[#6e6e6a]">Ow9BeSas...C32</p>
              </div>
            </div>
          </div>
        </header>

        <div className="col-span-2 flex items-center gap-4 overflow-hidden border-b border-[#2e2e2c] px-4 py-2 text-[10px]">
          {TICKER.map((pair) => (
            <div key={pair} className="flex shrink-0 items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6e6e6a]" />
              <span className="text-[#6e6e6a]">{pair}</span>
              <span className="text-[#c8c8c4]">—</span>
            </div>
          ))}
        </div>

        <div className="min-w-0 p-4">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] text-[#6e6e6a]">Live Updates</p>
              <h3 className="mt-1 text-[18px] font-medium tracking-[-0.03em] text-[#f2f2ef]">Live Crypto Updates</h3>
            </div>
            <div className="flex gap-1.5 text-[10px] text-[#9a9a95]">
              {["USDT", "Top Gainers", "7D"].map((item) => (
                <span key={item} className="rounded-[6px] border border-[#2e2e2c] px-2 py-1">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {CARDS.map((card) => (
              <article key={card.pair} className="rounded-[10px] border border-[#2e2e2c] bg-[#1a1a1a] p-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full border border-[#2e2e2c]" />
                    <div className="leading-tight">
                      <p className="text-[11px] font-medium text-[#f2f2ef]">{card.pair}</p>
                      <p className="text-[10px] text-[#6e6e6a]">{card.name}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#6e6e6a]">···</span>
                </div>
                <p className="mt-3 text-[10px] text-[#6e6e6a]">Price</p>
                <p className="text-[18px] font-medium tracking-[-0.03em] text-[#f2f2ef]">{card.price}</p>
                <p className="mt-0.5 text-[11px] text-[#9a9a95]">{card.delta}</p>
                <Spark />
              </article>
            ))}
          </div>

          <div className="mt-5">
            <p className="text-[10px] text-[#6e6e6a]">Live Updates</p>
            <h3 className="mt-1 text-[15px] font-medium tracking-[-0.03em] text-[#f2f2ef]">Market Overview</h3>
            <div className="mt-2 mb-2 flex flex-wrap items-center gap-1">
              {FILTERS.map((item) => (
                <span
                  key={item}
                  className={cn(
                    "inline-flex h-6 items-center rounded-[6px] px-2 text-[10px]",
                    item === "Favourites"
                      ? "border border-[#6e6e6a] text-[#f2f2ef]"
                      : "text-[#9a9a95]",
                  )}
                >
                  {item}
                </span>
              ))}
              <span className="pl-1 text-[10px] text-[#6e6e6a]">See all →</span>
            </div>

            <div className="overflow-hidden rounded-[10px] border border-[#2e2e2c] bg-[#1a1a1a]">
              <table className="w-full text-left text-[10px]">
                <thead className="text-[#6e6e6a]">
                  <tr className="border-b border-[#2e2e2c]">
                    {["No", "Coin Name", "Price", "1H", "24H", "7D", "Market Cap", "Volume", "Chart"].map((col) => (
                      <th key={col} className="px-2.5 py-2 font-normal whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr key={row.ticker} className="border-b border-[#2e2e2c] last:border-0">
                      <td className="px-2.5 py-2 text-[#6e6e6a]">{row.no}</td>
                      <td className="px-2.5 py-2">
                        <span className="flex items-center gap-1.5">
                          <span className="h-3 w-3 rounded-full border border-[#2e2e2c]" />
                          <span className="font-medium whitespace-nowrap text-[#f2f2ef]">{row.name}</span>
                          <span className="text-[#6e6e6a]">{row.ticker}</span>
                        </span>
                      </td>
                      <td className="px-2.5 py-2 whitespace-nowrap">{row.price}</td>
                      <td className="px-2.5 py-2 text-[#9a9a95]">—</td>
                      <td className="px-2.5 py-2 text-[#9a9a95]">—</td>
                      <td className="px-2.5 py-2 text-[#9a9a95]">—</td>
                      <td className="px-2.5 py-2 text-[#9a9a95]">—</td>
                      <td className="px-2.5 py-2 text-[#9a9a95]">—</td>
                      <td className="px-2.5 py-2">
                        <svg viewBox="0 0 36 12" className="h-3 w-9" fill="none">
                          <path d="M0 8 C8 7 12 3 18 4 C24 5 28 9 36 3" stroke="#6e6e6a" strokeWidth="1" />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 py-4 pr-4">
          <section className="rounded-[10px] border border-[#2e2e2c] bg-[#1a1a1a] p-3">
            <div className="mb-3 flex items-center justify-between text-[10px] text-[#9a9a95]">
              <span className="rounded-full border border-[#2e2e2c] px-2 py-0.5">Get 5% off fees</span>
              <span>16:09:46</span>
            </div>
            <h3 className="text-[15px] font-medium tracking-[-0.03em] text-[#f2f2ef]">Exchange</h3>
            <p className="text-[10px] text-[#6e6e6a]">Advanced trading tool</p>

            <div className="mt-3 flex h-8 rounded-[8px] border border-[#2e2e2c] p-0.5 text-[11px]">
              <span className="flex flex-1 items-center justify-center rounded-[6px] border border-[#6e6e6a] text-[#f2f2ef]">
                Buy
              </span>
              <span className="flex flex-1 items-center justify-center text-[#6e6e6a]">Sell</span>
              <span className="flex flex-1 items-center justify-center text-[#6e6e6a]">Swap</span>
            </div>

            <div className="mt-3 flex items-center justify-between rounded-[8px] border border-[#2e2e2c] px-2.5 py-2 text-[11px]">
              <span className="text-[#6e6e6a]">Wallet balance</span>
              <span className="text-[#f2f2ef]">128.255 USDT</span>
            </div>

            <p className="mt-2.5 text-[10px] text-[#6e6e6a]">Spend</p>
            <div className="mt-1 flex items-center justify-between rounded-[8px] border border-[#2e2e2c] px-2.5 py-2 text-[12px]">
              <span>83,023.43</span>
              <span className="text-[10px] text-[#9a9a95]">USDT</span>
            </div>

            <div className="my-1.5 grid place-items-center">
              <span className="grid h-6 w-6 place-items-center rounded-full border border-[#2e2e2c] text-[10px] text-[#6e6e6a]">
                ↓
              </span>
            </div>

            <p className="text-[10px] text-[#6e6e6a]">Receive</p>
            <div className="mt-1 flex items-center justify-between rounded-[8px] border border-[#2e2e2c] px-2.5 py-2 text-[12px]">
              <span>0.00</span>
              <span className="text-[10px] text-[#9a9a95]">BTC</span>
            </div>

            <p className="mt-2 text-[10px] text-[#6e6e6a]">1 USDT = 0.00042 ETH</p>
            <div className="mt-2 h-1 rounded-full bg-[#2e2e2c]">
              <div className="h-1 w-[64%] rounded-full bg-[#6e6e6a]" />
            </div>
            <p className="mt-1 text-right text-[10px] text-[#6e6e6a]">64%</p>

            <div className="mt-2 flex items-center justify-between text-[10px] text-[#6e6e6a]">
              <span>Gas fee</span>
              <span>155.00 USD</span>
            </div>

            <div className="mt-3 flex h-9 items-center justify-center rounded-[8px] bg-[#2e2e2c] text-[12px] font-medium text-[#f2f2ef]">
              Buy BTC →
            </div>
          </section>

          <section className="rounded-[10px] border border-[#2e2e2c] bg-[#1a1a1a] p-3">
            <p className="text-[10px] text-[#6e6e6a]">Total Transaction</p>
            <p className="mt-1 text-[16px] font-medium tracking-[-0.03em] text-[#f2f2ef]">$8,263.50 USD</p>
            <p className="mt-1 text-[10px] text-[#9a9a95]">-8% From Previous Month</p>
            <div className="mt-3 flex h-12 items-end gap-1">
              {Array.from({ length: 16 }).map((_, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-sm bg-[#2e2e2c]"
                  style={{ height: `${28 + ((i * 19) % 52)}%` }}
                />
              ))}
            </div>
          </section>
        </div>
        </div>
      </div>
    </div>
  );
}
