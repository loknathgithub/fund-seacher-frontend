'use client';

export default function FundCard({ fund, onClick }) {
  return (
    <div
      className="p-4 transition border rounded-lg cursor-pointer bg-card hover:bg-accent"
      onClick={onClick}
      tabIndex={0}
      role="button"
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
    >
      <div className="font-semibold">{fund.schemeName}</div>
      <div className="text-sm text-muted-foreground">Code: {fund.schemeCode}</div>
    </div>
  );
}