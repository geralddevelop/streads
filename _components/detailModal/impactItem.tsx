// import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid"
import greenWorld from "data-base64:~_assets/icons/green-world.svg"
import link from "data-base64:~_assets/icons/link.svg"
import { useState } from "react"

export const ImpactItem = ({
  title,
  description
}: {
  title: string
  description?: string
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2 py-2">
        <div className="flex items-start gap-2">
          <div className="bg-brand-light-green rounded-full p-1">
            <img src={greenWorld} alt="impact icon" width={24} height={24} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-md font-semibold">{title} </p>
            <p className="text-sm font-normal">{description} </p>
          </div>
        </div>

        {isOpen ? (
          <button
            type="button"
            className="rounded-full p-2 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}>
            <ChevronUpIcon className="h-6 w-6 text-gray-600" />
          </button>
        ) : (
          <button
            type="button"
            className="rounded-full p-2 hover:bg-gray-100"
            onClick={() => setIsOpen(true)}>
            <ChevronDownIcon className="h-6 w-6 text-gray-600" />
          </button>
        )}
      </div>
      {isOpen && (
        <div className="flex flex-col gap-8 mx-8">
          <FactItem
            title="T-shirt can use up to 120L"
            description="Dyeing a t-shirt adds 0.001kg CO2 to the environment per wear"
            src=""
          />
          <FactItem
            title="T-shirt can use up to 120L"
            description="Dyeing a t-shirt adds 0.001kg CO2 to the environment per wear"
            src=""
          />
        </div>
      )}
    </div>
  )
}

const FactItem = ({
  title,
  description,
  src
}: {
  title: string
  description: string
  src: string
}) => {
  return (
    <div className="border-l-4 border-brand-green bg-brand-lighter-green p-4 flex flex-col gap-2 items-start">
      <h2 className="text-sm font-bold">T-shirt can use up to 120L</h2>
      <p className="text-sm font-normal">
        Dyeing a t-shirt adds 0.001kg CO2 to the environment per wear
      </p>

      <div className="flex gap-2">
        <img src={link} alt="link icon" width={24} height={24} />
        <a
          href={src}
          target="_blank"
          className="text-blue-600 hover:text-blue-800 mt-2 underline">
          Read more
        </a>
      </div>
    </div>
  )

  // <div className="bg-brand-light-green">

  // </div>
}
