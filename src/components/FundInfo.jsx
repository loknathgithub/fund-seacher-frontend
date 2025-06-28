'use client';

export default function FundInfo({ fund, nav, actions, onClick }) {
  return (
    <div
      className="p-4 transition border rounded-lg shadow-lg cursor-pointer bg-card hover:bg-accent"
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      onKeyDown={onClick ? (e => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }) : undefined}
    >
      <div className="pb-1 text-2xl font-semibold">{fund.scheme_name || fund.schemeName}</div>
      <div className="pb-1 text-lg text-muted-foreground">Code: {fund.scheme_code || fund.schemeCode}</div>
      <div className="text-lg">Fund House: {fund.fund_house}</div>
      <div className="text-lg">Type: {fund.scheme_type}</div>
      <div className="text-lg">Category: {fund.scheme_category}</div>
      {fund.scheme_start_date && (
        <div className="text-lg">Start Date: {fund.scheme_start_date}</div>
      )}
      {fund.scheme_plan && (
        <div className="text-lg">Plan: {fund.scheme_plan}</div>
      )}
      {fund.scheme_asset_type && (
        <div className="text-lg">Asset Type: {fund.scheme_asset_type}</div>
      )}
      {nav && (
        <div className="mt-2 text-sm">
          <div className="font-semibold">Latest NAV</div>
          <div>Date: {nav.date}</div>
          <div>NAV: {nav.nav}</div>
        </div>
      )}
      {actions && <div className="mt-4">{actions}</div>}
    </div>
  );
}
