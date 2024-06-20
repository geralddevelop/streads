import { classNames } from "@utils/constants"
import grading1 from "data-base64:~_assets/grading/1.png"
import grading2 from "data-base64:~_assets/grading/2.png"
import grading3 from "data-base64:~_assets/grading/3.png"
import grading4 from "data-base64:~_assets/grading/4.png"
import grading5 from "data-base64:~_assets/grading/5.png"

export const ImpactInfoCard = ({ grading }: { grading: number }) => {
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
        "flex gap-4 justify-between py-2 px-8 rounded-md items-center"
      )}>
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
          "font-semibold text-sm"
        )}>
        {grading === 1
          ? "This item has room for improvement in sustainability."
          : grading === 2
            ? "This item shows some sustainable features."
            : grading === 3
              ? "A balanced choice with decent sustainability."
              : grading === 4
                ? "A good choice with strong sustainability."
                : grading === 5
                  ? "An excellent choice with top-notch sustainability!"
                  : "Can't tell"}
      </p>
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
                    : grading5
        }
        alt="grading"
        width={24}
        height={24}
      />
    </div>
  )
}
