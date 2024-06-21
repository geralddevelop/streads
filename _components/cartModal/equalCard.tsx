import equalIcon from "data-base64:~_assets/icons/equal.svg"

export const EqualCard = ({
  co2Kg,
  plasticBags
}: {
  co2Kg: number
  plasticBags: number
}) => {
  return (
    <>
      <div className="bg-gray-50 rounded-md p-8 grid grid-cols-3">
        <div className="flex flex-col text-center">
          <p className="font-semibold text-[30px] text-brand-red">
            {co2Kg}
            <span className="font-medium text-md text-gray-400"> kg</span>
          </p>
          <p className="font-medium text-gray-400 text-xs">
            CO2, in production
          </p>
        </div>
        <div className="flex justify-center">
          <img
            src={equalIcon}
            alt="Equal Icon"
            width={"34px"}
            height={"23px"}
            className="self-center text-center"
          />
        </div>
        <div className="flex flex-col text-center">
          <p className="font-semibold text-[30px] text-brand-red">
            {plasticBags.toLocaleString()}
            <span className="font-medium text-md text-gray-400"> pcs</span>
          </p>
          <p className="font-medium text-gray-400 text-xs">Plastic bags</p>
        </div>
      </div>
      <p
        onClick={() =>
          window.open("https://streads-landing-sljp.vercel.app/", "_blank")
        }
        className="underline text-blue-600 hover:text-blue-800 text-right cursor-pointer mt-1">
        What does this mean
      </p>
    </>
  )
}
