export const HighlightedNumberText = ({ num }: { num: number }) => {
    return (
      <div className="bg-brand-green rounded-md py-1 px-4">
        <p className="text-sm text-white font-bold">{num}</p>
      </div>
    )
  }
  