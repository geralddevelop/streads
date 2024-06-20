import grading1_gray from "data-base64:~_assets/grading/1-gray.png"
import grading1 from "data-base64:~_assets/grading/1.png"
import grading2_gray from "data-base64:~_assets/grading/2-gray.png"
import grading2 from "data-base64:~_assets/grading/2.png"
import grading3_gray from "data-base64:~_assets/grading/3-gray.png"
import grading3 from "data-base64:~_assets/grading/3.png"
import grading4_gray from "data-base64:~_assets/grading/4-gray.png"
import grading4 from "data-base64:~_assets/grading/4.png"
import grading5_gray from "data-base64:~_assets/grading/5-gray.png"
import grading5 from "data-base64:~_assets/grading/5.png"

export const SustainableChart = ({ score }: { score?: number }) => {
  return (
    <div className="flex gap-4">
      <img
        src={score === 1 ? grading1 : grading1_gray}
        alt="avoid grading"
        width={24}
        height={24}
      />
      <img
        src={score === 2 ? grading2 : grading2_gray}
        alt="progessing grading"
        width={24}
        height={24}
      />
      <img
        src={score === 3 ? grading3 : grading3_gray}
        alt="moderate grading"
        width={24}
        height={24}
      />
      <img
        src={score === 4 ? grading4 : grading4_gray}
        alt="strong grading"
        width={24}
        height={24}
      />
      <img
        src={score === 5 ? grading5 : grading5_gray}
        alt="leading grading"
        width={24}
        height={24}
      />
    </div>
  )
}
