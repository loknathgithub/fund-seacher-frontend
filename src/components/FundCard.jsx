'use client';

export default function FundCard({ fund, onClick }) {
  return (
    <div
      className="p-4 transition border rounded-lg cursor-pointer bg-card hover:bg-accent"
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${fund.schemeName}`}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
    >
      <div className="font-semibold">{fund.schemeName ?? 'null'}</div>
      <div className="text-sm text-muted-foreground">
        Code: {fund.schemeCode ?? 'null'}
      </div>
      <div className="text-xs text-muted-foreground">
        ISIN Growth: {fund.isinGrowth ?? 'null'}
      </div>
      <div className="text-xs text-muted-foreground">
        ISIN Div Reinvestment: {fund.isinDivReinvestment ?? 'null'}
      </div>
    </div>
  );
}
