import { classNames } from "@utils/constants"
import grading1 from "data-base64:~_assets/grading/1.png"
import grading2 from "data-base64:~_assets/grading/2.png"
import grading3 from "data-base64:~_assets/grading/3.png"
import grading4 from "data-base64:~_assets/grading/4.png"
import grading5 from "data-base64:~_assets/grading/5.png"

export const HeaderCountCard = ({
  grading,
  itemCount,
  children
}: {
  grading: number
  itemCount: number
  children: React.ReactNode
}) => {
  return (
    <div
      className={classNames(
        grading === 1
          ? "bg-brand-light-red"
          : grading === 2
            ? "bg-brand-light-orange"
            : grading === 3
              ? "bg-brand-light-yellow"
              : grading === 4
                ? "bg-brand-light-grass-green"
                : grading === 5
                  ? "bg-brand-light-green"
                  : "bg-gray-100",
        "flex flex-col pb-0"
      )}>
      <div className="flex justify-between items-start">
        <img
          src={
            grading === 1
              ? grading1
              : grading === 2
                ? grading2
                : grading === 3
                  ? grading3
                  : grading === 4
                    ? grading4
                    : grading === 5
                      ? grading5
                      : ""
          }
          width={106}
          height={106}
          className="-ml-4 opacity-45"
          alt="rating"
        />
        {children}
      </div>
      <div className="flex justify-between m-4 mt-2 items-end">
        <p
          className={classNames(
            grading === 1
              ? "text-brand-red"
              : grading === 2
                ? "text-brand-orange"
                : grading === 3
                  ? "text-brand-yellow"
                  : grading === 4
                    ? "text-brand-grass-green"
                    : grading === 5
                      ? "text-brand-green"
                      : "text-gray-800",
            "font-bold text-lg text-left whitespace-pre-line"
          )}>
          {grading === 1
            ? "Your cart is \nnot looking good"
            : grading === 2
              ? "Your cart could use a \nsustainability boost"
              : grading === 3
                ? "Your cart is on its way \nbeing sustainable"
                : grading === 4
                  ? "Your cart is looking good \nwith sustainable choices"
                  : grading === 5
                    ? "Your cart is trendsetting \nsustainability"
                    : "Your cart has no item"}
        </p>
        <div className="flex flex-col items-end text-right">
          <p className="font-semibold text-[32px]">{itemCount} pieces</p>
          <p className="font-medium text-[12px]">of item(s) in cart</p>
        </div>
      </div>
    </div>
  )
}
