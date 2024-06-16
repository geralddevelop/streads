import React from "react"

export const AlternativeInfoCard = () => {
  return (
    <div className="bg-green-50 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">
        Sustainable brands may cost more, but they offer great advantages.
      </h2>
      <ul className="space-y-2">
        <li className="flex items-center font-semibold text-lg">
          <span role="img" aria-label="check" className="mr-2">
            😊
          </span>
          <span>Cheaper in long term</span>
        </li>
        <li className="flex items-center font-semibold text-lg">
          <span role="img" aria-label="check" className="mr-2">
            😊
          </span>
          <span>More durable</span>
        </li>
        <li className="flex items-center font-semibold text-lg">
          <span role="img" aria-label="check" className="mr-2">
            😊
          </span>
          <span>Higher quality</span>
        </li>
        <li className="flex items-center font-semibold text-lg">
          <span role="img" aria-label="check" className="mr-2">
            😊
          </span>
          <span>Design clothes with timeless appeal</span>
        </li>
      </ul>
    </div>
  )
}
